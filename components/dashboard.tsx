"use client"

import { Activity, Globe, TrendingUp, Users, Zap, Bell, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function Dashboard() {
  const liveSignals = [
    { pair: "EUR/USD", signal: "BUY", confidence: 92, entry: 1.1023, time: "2m ago" },
    { pair: "GBP/USD", signal: "SELL", confidence: 85, entry: 1.2687, time: "5m ago" },
    { pair: "BTC/USD", signal: "BUY", confidence: 78, entry: 43250, time: "8m ago" },
  ]

  const marketMetrics = [
    { name: "Active Signals", value: "12", change: "+3", color: "text-green-400" },
    { name: "Win Rate Today", value: "74%", change: "+2%", color: "text-blue-400" },
    { name: "Total P&L", value: "$2,340", change: "+$450", color: "text-purple-400" },
    { name: "Risk Score", value: "Low", change: "Stable", color: "text-yellow-400" },
  ]

  const performanceData = [
    { time: "09:00", pnl: 0, signals: 0 },
    { time: "10:00", pnl: 150, signals: 2 },
    { time: "11:00", pnl: 280, signals: 3 },
    { time: "12:00", pnl: 420, signals: 5 },
    { time: "13:00", pnl: 390, signals: 6 },
    { time: "14:00", pnl: 650, signals: 8 },
    { time: "15:00", pnl: 580, signals: 10 },
    { time: "16:00", pnl: 750, signals: 12 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
          <p className="text-slate-400">Real-time AI trading signals and performance monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="auto-trade" />
            <label htmlFor="auto-trade" className="text-sm text-slate-300">
              Auto-Trading
            </label>
          </div>
          <Button size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{metric.name}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <p className="text-xs text-slate-500">{metric.change}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  {index === 0 && <Activity className="w-6 h-6 text-blue-400" />}
                  {index === 1 && <TrendingUp className="w-6 h-6 text-green-400" />}
                  {index === 2 && <Zap className="w-6 h-6 text-purple-400" />}
                  {index === 3 && <Globe className="w-6 h-6 text-yellow-400" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Performance Chart */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Today's Performance</CardTitle>
          <CardDescription>Real-time P&L and signal generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="pnl" stroke="#10B981" strokeWidth={2} name="P&L ($)" />
                <Line type="monotone" dataKey="signals" stroke="#8B5CF6" strokeWidth={2} name="Signals Generated" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Signals */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Live Signals
            </CardTitle>
            <CardDescription>Recent AI-generated trading signals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liveSignals.map((signal, index) => (
                <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant={signal.signal === "BUY" ? "default" : "destructive"}>{signal.signal}</Badge>
                      <span className="text-white font-semibold">{signal.pair}</span>
                    </div>
                    <span className="text-slate-400 text-sm">{signal.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Entry: {signal.entry}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">Confidence:</span>
                      <Progress value={signal.confidence} className="w-16 h-2" />
                      <span className="text-green-400 text-sm font-semibold">{signal.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              System Status
            </CardTitle>
            <CardDescription>AI models and data feed status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">LSTM Model</span>
                </div>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">XGBoost Engine</span>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Market Data Feed</span>
                </div>
                <Badge variant="default">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">News Sentiment API</span>
                </div>
                <Badge variant="secondary">Limited</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
