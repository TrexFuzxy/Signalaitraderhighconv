import crypto from "crypto"

// Security configuration
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex")
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString("hex")
const PAYMENT_SALT = process.env.PAYMENT_SALT || crypto.randomBytes(16).toString("hex")

// Encrypt sensitive data
export function encryptData(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher("aes-256-cbc", ENCRYPTION_KEY)
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")
  return iv.toString("hex") + ":" + encrypted
}

// Decrypt sensitive data
export function decryptData(encryptedText: string): string {
  const textParts = encryptedText.split(":")
  const iv = Buffer.from(textParts.shift()!, "hex")
  const encryptedData = textParts.join(":")
  const decipher = crypto.createDecipher("aes-256-cbc", ENCRYPTION_KEY)
  let decrypted = decipher.update(encryptedData, "hex", "utf8")
  decrypted += decipher.final("utf8")
  return decrypted
}

// Generate secure payment token
export function generatePaymentToken(userId: string, paymentId: string, timestamp: number): string {
  const payload = {
    userId,
    paymentId,
    timestamp,
    salt: PAYMENT_SALT,
  }

  const dataString = JSON.stringify(payload)
  const hash = crypto.createHmac("sha256", JWT_SECRET).update(dataString).digest("hex")

  return Buffer.from(JSON.stringify({ ...payload, hash })).toString("base64")
}

// Verify payment token
export function verifyPaymentToken(token: string): { valid: boolean; data?: any } {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"))
    const { hash, ...payload } = decoded

    const dataString = JSON.stringify(payload)
    const expectedHash = crypto.createHmac("sha256", JWT_SECRET).update(dataString).digest("hex")

    if (hash !== expectedHash) {
      return { valid: false }
    }

    // Check if token is not too old (24 hours max)
    const now = Date.now()
    if (now - payload.timestamp > 24 * 60 * 60 * 1000) {
      return { valid: false }
    }

    return { valid: true, data: payload }
  } catch (error) {
    return { valid: false }
  }
}

// Generate secure session token
export function generateSessionToken(userId: string, paymentVerified: boolean): string {
  const payload = {
    userId,
    paymentVerified,
    timestamp: Date.now(),
    sessionId: crypto.randomBytes(32).toString("hex"),
    checksum: crypto.createHash("sha256").update(`${userId}:${paymentVerified}:${PAYMENT_SALT}`).digest("hex"),
  }

  return encryptData(JSON.stringify(payload))
}

// Verify session token
export function verifySessionToken(token: string): { valid: boolean; data?: any } {
  try {
    const decrypted = decryptData(token)
    const payload = JSON.parse(decrypted)

    // Verify checksum
    const expectedChecksum = crypto
      .createHash("sha256")
      .update(`${payload.userId}:${payload.paymentVerified}:${PAYMENT_SALT}`)
      .digest("hex")
    if (payload.checksum !== expectedChecksum) {
      return { valid: false }
    }

    // Check if session is not too old (7 days max)
    const now = Date.now()
    if (now - payload.timestamp > 7 * 24 * 60 * 60 * 1000) {
      return { valid: false }
    }

    return { valid: true, data: payload }
  } catch (error) {
    return { valid: false }
  }
}

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting function
export function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const key = identifier

  const current = rateLimitStore.get(key)

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (current.count >= maxRequests) {
    return false
  }

  current.count++
  return true
}

// Validate payment signature from Razorpay
export function validateRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  const body = orderId + "|" + paymentId
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

  return expectedSignature === signature
}
