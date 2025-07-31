import { Activity, TrendingUp, BarChart3, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface TechnicalAnalysisProps {
  data: any
}

export default function TechnicalAnalysis({ data }: TechnicalAnalysisProps) {
  const indicators = [
    { name: "RSI", value: "46", status: "Neutral", color: "yellow" },
    { name: "MACD", value: "Bullish Crossover", status: "Bullish", color: "green" },
    { name: "Bollinger Bands", value: "Squeeze", status: "Breakout Pending", color: "blue" },
    { name: "Stochastic", value: "34", status: "Oversold", color: "green" },
    { name: "ADX", value: "28", status: "Trending", color: "green" },
    { name: "ATR", value: data.indicators.ATR, status: "Normal Volatility", color: "blue" },
  ]

  const movingAverages = [
    { period: "SMA 20", value: "1.1015", position: "Above", trend: "Bullish" },
    { period: "EMA 50", value: "1.0998", position: "Above", trend: "Bullish" },
    { period: "SMA 200", value: "1.0945", position: "Above", trend: "Bullish" },
  ]

  const getIndicatorBadgeClass = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-400 border-green-400"
      case "red":
        return "text-red-400 border-red-400"
      case "blue":
        return "text-blue-400 border-blue-400"
      case "yellow":
        return "text-yellow-400 border-yellow-400"
      default:
        return "text-slate-400 border-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Oscillators */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Technical Oscillators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indicators.map((indicator) => (
              <div key={indicator.name} className="bg-slate-700/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-slate-300">{indicator.name}</h4>
                  <Badge variant="outline" className={getIndicatorBadgeClass(indicator.color)}>
                    {indicator.status}
                  </Badge>
                </div>
                <p className="text-lg font-semibold text-white">{indicator.value}</p>
                <Progress value={indicator.name === "RSI" ? Number.parseInt(indicator.value) : 65} className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Moving Averages */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Moving Averages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {movingAverages.map((ma) => (
              <div key={ma.period} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {ma.period}
                  </Badge>
                  <span className="text-white font-semibold">{ma.value}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-slate-400">Price {ma.position}</span>
                  <Badge variant={ma.trend === "Bullish" ? "default" : "destructive"}>{ma.trend}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Volume Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Volume Profile Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-2">Volume Spike</h4>
                <p className="text-2xl font-bold text-green-400">+187%</p>
                <p className="text-xs text-slate-500">Above 20-period average</p>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-2">POC (Point of Control)</h4>
                <p className="text-lg font-semibold text-white">1.1018</p>
                <p className="text-xs text-slate-500">Highest volume node</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-2">HVN Zone</h4>
                <p className="text-lg font-semibold text-white">1.1015 - 1.1025</p>
                <p className="text-xs text-slate-500">High Volume Node support</p>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-2">LVN Zone</h4>
                <p className="text-lg font-semibold text-white">1.1035 - 1.1045</p>
                <p className="text-xs text-slate-500">Low Volume Node resistance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Momentum Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Momentum & Divergence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-2">MACD Histogram</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span className="text-white">Increasing</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Bullish momentum building</p>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-2">RSI Divergence</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span className="text-white">None Detected</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Price and RSI aligned</p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Technical Summary</h4>
              <p className="text-slate-300 text-sm">
                Multiple bullish confirmations across timeframes. MACD crossover with increasing histogram, price above
                key moving averages, and volume spike supporting the breakout. RSI in neutral territory provides room
                for upward movement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
