import { TrendingUp, TrendingDown, Target, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface TradingSignalProps {
  data: any
}

export default function TradingSignal({ data }: TradingSignalProps) {
  const isBuy = data.order === "BUY"

  return (
    <div className="space-y-6">
      {/* Main Signal Card */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isBuy ? (
                <TrendingUp className="w-8 h-8 text-green-400" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-400" />
              )}
              <div>
                <CardTitle className="text-white text-2xl">{data.order} Signal</CardTitle>
                <CardDescription>High-probability trade setup identified</CardDescription>
              </div>
            </div>
            <Badge variant={isBuy ? "default" : "destructive"} className="text-lg px-4 py-2">
              {data.confidence}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Entry Price</p>
              <p className="text-2xl font-bold text-white">{data.entry}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Stop Loss</p>
              <p className="text-xl font-semibold text-red-400">{data.sl}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Take Profit</p>
              <p className="text-xl font-semibold text-green-400">{data.tp[0]}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Risk/Reward</p>
              <p className="text-xl font-semibold text-blue-400">{data.rrr}:1</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Timeframe Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Multi-Timeframe Confluence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(data.timeframes).map(([timeframe, analysis]) => (
              <div key={timeframe} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {timeframe}
                  </Badge>
                  <span className="text-white">{analysis}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Bullish</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Take Profit Levels */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Take Profit Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.tp.map((level: number, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    TP{index + 1}
                  </Badge>
                  <span className="text-white font-semibold">{level}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 text-sm">
                    +{(((level - data.entry) / data.entry) * 100).toFixed(2)}%
                  </span>
                  <Progress value={33.33 * (index + 1)} className="w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Money Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Smart Money Concepts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-slate-300 mb-2">Fair Value Gap</h4>
              <p className="text-white">{data.smc.fvg ? "Present" : "None"}</p>
              <p className="text-xs text-slate-500 mt-1">Institutional imbalance detected</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-slate-300 mb-2">Order Block</h4>
              <p className="text-white">{data.smc.order_block}</p>
              <p className="text-xs text-slate-500 mt-1">Key institutional level</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-slate-300 mb-2">Liquidity</h4>
              <p className="text-white">{data.smc.liquidity_sweep}</p>
              <p className="text-xs text-slate-500 mt-1">Stop hunt completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Explanation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Trade Rationale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{data.explanation}</p>

          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">Risk Warning</h4>
            <p className="text-slate-300 text-sm">
              This analysis is for educational purposes only. Always conduct your own research and consider your risk
              tolerance before trading. Past performance does not guarantee future results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
