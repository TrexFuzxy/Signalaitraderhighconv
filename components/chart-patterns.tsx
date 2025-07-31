import { Eye, Triangle, TrendingUp, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ChartPatternsProps {
  data: any
}

export default function ChartPatterns({ data }: ChartPatternsProps) {
  const detectedPatterns = [
    {
      name: "Bullish Engulfing",
      confidence: 92,
      timeframe: "1H",
      status: "Confirmed",
      description: "Strong reversal pattern at key support level",
    },
    {
      name: "Order Block Retest",
      confidence: 89,
      timeframe: "4H",
      status: "Active",
      description: "Price retesting institutional order block",
    },
    {
      name: "Fair Value Gap",
      confidence: 85,
      timeframe: "15m",
      status: "Filled",
      description: "Imbalance filled, continuation expected",
    },
    {
      name: "Break of Structure",
      confidence: 78,
      timeframe: "1H",
      status: "Confirmed",
      description: "Higher high confirmed, trend continuation",
    },
  ]

  const candlestickPatterns = [
    { name: "Bullish Engulfing", strength: "Strong", reliability: 85 },
    { name: "Hammer", strength: "Moderate", reliability: 72 },
    { name: "Morning Star", strength: "Weak", reliability: 45 },
    { name: "Doji", strength: "Neutral", reliability: 60 },
  ]

  const supportResistance = [
    { level: "1.1050", type: "Resistance", strength: "Strong", touches: 3 },
    { level: "1.1025", type: "Support", strength: "Moderate", touches: 2 },
    { level: "1.0995", type: "Support", strength: "Strong", touches: 4 },
    { level: "1.0970", type: "Support", strength: "Weak", touches: 1 },
  ]

  return (
    <div className="space-y-6">
      {/* Detected Patterns */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Detected Chart Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detectedPatterns.map((pattern, index) => (
              <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-white font-semibold">{pattern.name}</h4>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      {pattern.timeframe}
                    </Badge>
                  </div>
                  <Badge variant={pattern.status === "Confirmed" ? "default" : "secondary"}>{pattern.status}</Badge>
                </div>
                <p className="text-slate-300 text-sm mb-3">{pattern.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 text-sm">Confidence:</span>
                  <Progress value={pattern.confidence} className="flex-1" />
                  <span className="text-white font-semibold">{pattern.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Candlestick Patterns */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Triangle className="w-5 h-5 mr-2" />
            Candlestick Pattern Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candlestickPatterns.map((pattern, index) => (
              <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{pattern.name}</h4>
                  <Badge
                    variant={
                      pattern.strength === "Strong"
                        ? "default"
                        : pattern.strength === "Moderate"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {pattern.strength}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 text-sm">Reliability:</span>
                  <Progress value={pattern.reliability} className="flex-1" />
                  <span className="text-white text-sm">{pattern.reliability}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support & Resistance */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Support & Resistance Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supportResistance.map((level, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={level.type === "Resistance" ? "destructive" : "default"}
                    className="w-20 justify-center"
                  >
                    {level.type}
                  </Badge>
                  <span className="text-white font-semibold text-lg">{level.level}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-slate-300 text-sm">{level.strength}</p>
                    <p className="text-slate-500 text-xs">{level.touches} touches</p>
                  </div>
                  <div className="w-16">
                    <Progress value={level.strength === "Strong" ? 85 : level.strength === "Moderate" ? 60 : 35} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pattern Confluence */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Pattern Confluence Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">High Confluence Zone</h4>
              <p className="text-slate-300 text-sm mb-3">
                Multiple bullish patterns converging at 1.1020-1.1025 level:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Bullish Engulfing pattern completion</li>
                <li>• Order Block retest and hold</li>
                <li>• Fair Value Gap fill and reaction</li>
                <li>• Break of Structure confirmation</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                <h4 className="text-slate-300 text-sm mb-2">Pattern Score</h4>
                <p className="text-3xl font-bold text-green-400">8.7/10</p>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                <h4 className="text-slate-300 text-sm mb-2">Confluence Rating</h4>
                <p className="text-3xl font-bold text-blue-400">High</p>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                <h4 className="text-slate-300 text-sm mb-2">Success Rate</h4>
                <p className="text-3xl font-bold text-purple-400">78%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
