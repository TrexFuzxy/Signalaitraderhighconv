"use client"

import { Shield, Calculator, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface RiskManagementProps {
  data: any
}

export default function RiskManagement({ data }: RiskManagementProps) {
  const [accountSize, setAccountSize] = useState("10000")
  const [riskPercent, setRiskPercent] = useState("2")

  const calculatePositionSize = () => {
    const account = Number.parseFloat(accountSize)
    const risk = Number.parseFloat(riskPercent) / 100
    const stopDistance = Math.abs(data.entry - data.sl)
    const riskAmount = account * risk
    const positionSize = riskAmount / stopDistance
    return positionSize
  }

  const positionSize = calculatePositionSize()
  const riskAmount = (Number.parseFloat(accountSize) * Number.parseFloat(riskPercent)) / 100

  const getMetricColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-400"
      case "red":
        return "text-red-400"
      case "green":
        return "text-green-400"
      case "purple":
        return "text-purple-400"
      default:
        return "text-slate-400"
    }
  }

  const riskMetrics = [
    {
      label: "Position Size",
      value: positionSize.toFixed(0),
      unit: "units",
      color: "blue",
    },
    {
      label: "Risk Amount",
      value: riskAmount.toFixed(2),
      unit: "$",
      color: "red",
    },
    {
      label: "Potential Profit (TP1)",
      value: ((data.tp[0] - data.entry) * positionSize).toFixed(2),
      unit: "$",
      color: "green",
    },
    {
      label: "Risk/Reward Ratio",
      value: data.rrr,
      unit: ":1",
      color: "purple",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Position Calculator */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Position Size Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="account-size" className="text-slate-300">
                  Account Size ($)
                </Label>
                <Input
                  id="account-size"
                  value={accountSize}
                  onChange={(e) => setAccountSize(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="risk-percent" className="text-slate-300">
                  Risk Per Trade (%)
                </Label>
                <Input
                  id="risk-percent"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white mt-1"
                />
              </div>
              <Button className="w-full">Recalculate Position</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {riskMetrics.map((metric) => (
                <div key={metric.label} className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-slate-300 text-sm mb-1">{metric.label}</h4>
                  <p className={`text-xl font-bold ${getMetricColorClass(metric.color)}`}>
                    {metric.unit === "$" ? "$" : ""}
                    {metric.value}
                    {metric.unit !== "$" ? metric.unit : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-slate-300 text-sm mb-2">Stop Loss Strategy</h4>
                <p className="text-white font-semibold">ATR-Based</p>
                <p className="text-slate-400 text-sm mt-1">
                  Stop placed 1.5x ATR below entry for optimal risk management
                </p>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-slate-300 text-sm mb-2">Maximum Drawdown</h4>
                <p className="text-red-400 font-semibold">{riskPercent}%</p>
                <p className="text-slate-400 text-sm mt-1">Conservative risk per trade maintains account safety</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-slate-300 text-sm mb-2">Win Rate Required</h4>
                <p className="text-green-400 font-semibold">{(100 / (1 + data.rrr)).toFixed(1)}%</p>
                <p className="text-slate-400 text-sm mt-1">Minimum win rate needed for profitability</p>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-slate-300 text-sm mb-2">Expected Value</h4>
                <p className="text-blue-400 font-semibold">${((data.rrr * 0.6 - 0.4) * riskAmount).toFixed(2)}</p>
                <p className="text-slate-400 text-sm mt-1">Assuming 60% win rate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Take Profit Strategy */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Take Profit Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.tp.map((level: number, index: number) => {
              const profit = (level - data.entry) * positionSize
              const percentage = ((level - data.entry) / data.entry) * 100

              return (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      TP{index + 1}
                    </Badge>
                    <div>
                      <p className="text-white font-semibold">{level}</p>
                      <p className="text-slate-400 text-sm">33% position close</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">${profit.toFixed(2)}</p>
                    <p className="text-slate-400 text-sm">+{percentage.toFixed(2)}%</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">Scaling Strategy</h4>
            <p className="text-slate-300 text-sm">
              Close 33% at each TP level, move stop to breakeven after TP1, trail stop loss for remaining position using
              ATR or structure.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Warnings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Risk Warnings & Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">High Risk Factors</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• News events can cause sudden volatility spikes</li>
                <li>• Weekend gaps may affect stop loss execution</li>
                <li>• Low liquidity periods increase slippage risk</li>
              </ul>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Best Practices</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Never risk more than 2% per trade</li>
                <li>• Use proper position sizing calculations</li>
                <li>• Always set stop losses before entering</li>
                <li>• Monitor correlation with other positions</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Disclaimer</h4>
              <p className="text-slate-300 text-sm">
                This analysis is for educational purposes only. Trading involves substantial risk and may not be
                suitable for all investors. Past performance does not guarantee future results. Always conduct your own
                research and consider seeking advice from a qualified financial advisor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
