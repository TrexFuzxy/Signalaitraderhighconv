// Mock trading analysis function - in production, this would call your FastAPI backend
export async function analyzeTradingData(file: File) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Mock analysis result based on the file type
  const isChart = file.type.startsWith("image/")

  return {
    order: "BUY",
    entry: 1.1023,
    sl: 1.098,
    tp: [1.105, 1.1075, 1.11],
    rrr: 2.7,
    confidence: "88%",
    order_type: "Limit",
    timeframes: {
      "5m": "Doji + Liquidity Grab",
      "1H": "Bullish BOS + FVG + MA crossover",
      "4H": "Uptrend with Order Block retest",
    },
    indicators: {
      RSI: "46 (neutral)",
      MACD: "Bullish crossover",
      ATR: "0.0018",
    },
    smc: {
      fvg: "Yes",
      order_block: "Retesting Bullish OB",
      liquidity_sweep: "Sell-side taken",
    },
    explanation:
      "The pair formed a bullish engulfing pattern after a liquidity sweep below the 1H OB. HTF structure is bullish. Entry is above mitigation candle. TP targets recent highs.",
    patterns: {
      bullish_engulfing: true,
      order_block_retest: true,
      fair_value_gap: true,
      break_of_structure: true,
    },
    ml_predictions: {
      lstm_price_change: 2.3,
      xgboost_trend_score: 0.78,
      pattern_classification: "Bullish Engulfing + Order Block Retest",
      cnn_confidence: 89.2,
    },
  }
}

// Technical Analysis Functions
export function calculateRSI(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 50

  let gains = 0
  let losses = 0

  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1]
    if (change > 0) gains += change
    else losses -= change
  }

  const avgGain = gains / period
  const avgLoss = losses / period
  const rs = avgGain / avgLoss

  return 100 - 100 / (1 + rs)
}

export function calculateMACD(prices: number[], fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  const ema12 = calculateEMA(prices, fastPeriod)
  const ema26 = calculateEMA(prices, slowPeriod)
  const macdLine = ema12 - ema26

  // In a real implementation, you'd calculate the signal line and histogram
  return {
    macd: macdLine,
    signal: macdLine * 0.9, // Simplified
    histogram: macdLine * 0.1,
  }
}

export function calculateEMA(prices: number[], period: number): number {
  if (prices.length === 0) return 0

  const multiplier = 2 / (period + 1)
  let ema = prices[0]

  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * multiplier + ema * (1 - multiplier)
  }

  return ema
}

export function calculateBollingerBands(prices: number[], period = 20, stdDev = 2) {
  const sma = prices.slice(-period).reduce((a, b) => a + b) / period
  const variance = prices.slice(-period).reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period
  const standardDeviation = Math.sqrt(variance)

  return {
    upper: sma + standardDeviation * stdDev,
    middle: sma,
    lower: sma - standardDeviation * stdDev,
  }
}

export function detectCandlestickPatterns(ohlc: any[]) {
  // Simplified pattern detection - in production, use more sophisticated algorithms
  const patterns = []

  if (ohlc.length < 2) return patterns

  const current = ohlc[ohlc.length - 1]
  const previous = ohlc[ohlc.length - 2]

  // Bullish Engulfing
  if (
    previous.close < previous.open && // Previous red candle
    current.close > current.open && // Current green candle
    current.open < previous.close && // Current opens below previous close
    current.close > previous.open
  ) {
    // Current closes above previous open
    patterns.push({
      name: "Bullish Engulfing",
      confidence: 85,
      type: "bullish",
    })
  }

  // Doji
  const bodySize = Math.abs(current.close - current.open)
  const candleRange = current.high - current.low
  if (bodySize / candleRange < 0.1) {
    patterns.push({
      name: "Doji",
      confidence: 70,
      type: "neutral",
    })
  }

  return patterns
}

export function calculateATR(ohlc: any[], period = 14): number {
  if (ohlc.length < period + 1) return 0

  const trueRanges = []

  for (let i = 1; i < ohlc.length; i++) {
    const high = ohlc[i].high
    const low = ohlc[i].low
    const prevClose = ohlc[i - 1].close

    const tr = Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose))

    trueRanges.push(tr)
  }

  return trueRanges.slice(-period).reduce((a, b) => a + b) / period
}
