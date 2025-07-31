"use client"

import { Calendar, TrendingUp, BarChart3, Target, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useState } from "react"

interface BacktestingProps {
  data: any
}

export default function Backtesting({ data }: BacktestingProps) {
  const [timeframe, setTimeframe] = useState("1y")
  const [isRunning, setIsRunning] = useState(false)

  const backtestResults = {
    totalTrades: 247,
    winRate: 68.4,
    avgRR: 2.3,
    maxDrawdown: 12.7,
    sharpeRatio: 1.84,
    totalReturn: 34.2,
    profitFactor: 1.67,
    avgWin: 156.8,
    avgLoss: -68.2,
    largestWin: 420.5,
    largestLoss: -185.3,
    consecutiveWins: 8,
    consecutiveLosses: 4,
  }

  const equityCurve = [
    { month: "Jan", equity: 10000, drawdown: 0 },
    { month: "Feb", equity: 10850, drawdown: -2.1 },
    { month: "Mar", equity: 11200, drawdown: -1.5 },
    { month: "Apr", equity: 10950, drawdown: -4.8 },
    { month: "May", equity: 11650, drawdown: -2.2 },
    { month: "Jun", equity: 12100, drawdown: -3.1 },
    { month: "Jul", equity: 11800, drawdown: -6.7 },
    { month: "Aug", equity: 12450, drawdown: -1.8 },
    { month: "Sep", equity: 12800, drawdown: -4.2 },
    { month: "Oct", equity: 13200, drawdown: -2.9 },
    { month: "Nov", equity: 13650, drawdown: -1.2 },
    { month: "Dec", equity: 13420, drawdown: -5.1 },
  ]

  const monthlyReturns = [
    { month: "Jan", returns: 8.5 },
    { month: "Feb", returns: 3.5 },
    { month: "Mar", returns: -2.2 },
    { month: "Apr", returns: 6.4 },
    { month: "May", returns: 3.7 },
    { month: "Jun", returns: -1.5 },
    { month: "Jul", returns: 5.5 },
    { month: "Aug", returns: 2.8 },
    { month: "Sep", returns: 3.1 },
    { month: "Oct", returns: 4.2 },
    { month: "Nov", returns: -1.7 },
    { month: "Dec", returns: 3.4 },
  ]

  const tradeAnalysis = [
    { pattern: "Bullish Engulfing", trades: 45, winRate: 73.3, avgRR: 2.8, profit: 2850 },
    { pattern: "Order Block Retest", trades: 38, winRate: 68.4, avgRR: 2.1, profit: 2340 },
    { pattern: "FVG Fill", trades: 32, winRate: 71.9, avgRR: 2.4, profit: 2120 },
    { pattern: "BOS Confirmation", trades: 28, winRate: 64.3, avgRR: 2.6, profit: 1890 },
    { pattern: "Support/Resistance", trades: 34, winRate: 61.8, avgRR: 1.9, profit: 1650 },
  ]

  const runBacktest = () => {
    setIsRunning(true)
    // Simulate backtesting process
    setTimeout(() => {
      setIsRunning(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Backtest Controls */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Backtesting Engine
          </CardTitle>
          <CardDescription>Test your strategy against historical data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="2y">2 Years</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="eurusd">
              <SelectTrigger className="bg-slate-700/50 border-slate-600">
                <SelectValue placeholder="Pair" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eurusd">EUR/USD</SelectItem>
                <SelectItem value="gbpusd">GBP/USD</SelectItem>
                <SelectItem value="usdjpy">USD/JPY</SelectItem>
                <SelectItem value="btcusd">BTC/USD</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="1h">
              <SelectTrigger className="bg-slate-700/50 border-slate-600">
                <SelectValue placeholder="Chart TF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Minute</SelectItem>
                <SelectItem value="5m">5 Minutes</SelectItem>
                <SelectItem value="15m">15 Minutes</SelectItem>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="4h">4 Hours</SelectItem>
                <SelectItem value="1d">1 Day</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={runBacktest}
              disabled={isRunning}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Running...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Run Backtest
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">Total Return</p>
                <p className="text-2xl font-bold text-white">{backtestResults.totalReturn}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Win Rate</p>
                <p className="text-2xl font-bold text-white">{backtestResults.winRate}%</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-white">{backtestResults.sharpeRatio}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm">Max Drawdown</p>
                <p className="text-2xl font-bold text-white">{backtestResults.maxDrawdown}%</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equity Curve */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Equity Curve & Drawdown</CardTitle>
          <CardDescription>Account balance and drawdown over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="equity" stroke="#10B981" strokeWidth={3} name="Account Equity" />
                <Line type="monotone" dataKey="drawdown" stroke="#EF4444" strokeWidth={2} name="Drawdown %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Returns */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Monthly Returns</CardTitle>
          <CardDescription>Monthly performance breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="returns" fill="#06B6D4" name="Monthly Return %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Trade Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Total Trades</p>
                  <p className="text-xl font-bold text-white">{backtestResults.totalTrades}</p>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Avg R:R</p>
                  <p className="text-xl font-bold text-white">{backtestResults.avgRR}:1</p>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Profit Factor</p>
                  <p className="text-xl font-bold text-white">{backtestResults.profitFactor}</p>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Avg Win</p>
                  <p className="text-xl font-bold text-green-400">${backtestResults.avgWin}</p>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Avg Loss</p>
                  <p className="text-xl font-bold text-red-400">${backtestResults.avgLoss}</p>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Largest Win</p>
                  <p className="text-xl font-bold text-green-400">${backtestResults.largestWin}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Pattern Performance</CardTitle>
            <CardDescription>Results by trading pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tradeAnalysis.map((pattern, index) => (
                <div key={index} className="bg-slate-700/30 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{pattern.pattern}</h4>
                      <p className="text-slate-400 text-sm">{pattern.trades} trades</p>
                    </div>
                    <Badge variant={pattern.winRate > 70 ? "default" : pattern.winRate > 60 ? "secondary" : "outline"}>
                      {pattern.winRate}%
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">R:R {pattern.avgRR}:1</span>
                    <span className={`font-semibold ${pattern.profit > 0 ? "text-green-400" : "text-red-400"}`}>
                      ${pattern.profit}
                    </span>
                  </div>
                  <Progress value={pattern.winRate} className="h-1 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Metrics */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-slate-300 text-sm mb-2">Value at Risk (VaR)</h4>
              <p className="text-2xl font-bold text-red-400">-3.2%</p>
              <p className="text-xs text-slate-500">95% confidence, 1-day</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-slate-300 text-sm mb-2">Maximum Consecutive Losses</h4>
              <p className="text-2xl font-bold text-red-400">{backtestResults.consecutiveLosses}</p>
              <p className="text-xs text-slate-500">Worst losing streak</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-slate-300 text-sm mb-2">Recovery Factor</h4>
              <p className="text-2xl font-bold text-blue-400">2.69</p>
              <p className="text-xs text-slate-500">Return / Max DD</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-slate-300 text-sm mb-2">Calmar Ratio</h4>
              <p className="text-2xl font-bold text-purple-400">2.34</p>
              <p className="text-xs text-slate-500">Risk-adjusted return</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">Backtest Summary</h4>
            <p className="text-slate-300 text-sm">
              Strategy shows strong performance with {backtestResults.winRate}% win rate and{" "}
              {backtestResults.sharpeRatio} Sharpe ratio. Maximum drawdown of {backtestResults.maxDrawdown}% is within
              acceptable risk parameters. Bullish Engulfing patterns show highest profitability with{" "}
              {tradeAnalysis[0].winRate}% success rate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
