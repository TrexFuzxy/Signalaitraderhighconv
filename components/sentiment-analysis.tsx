"use client"

import { MessageCircle, TrendingUp, Globe, Brain, Hash, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface SentimentAnalysisProps {
  data: any
}

export default function SentimentAnalysis({ data }: SentimentAnalysisProps) {
  const sentimentData = [
    { time: "00:00", twitter: 0.65, reddit: 0.58, news: 0.72, tradingview: 0.69 },
    { time: "04:00", twitter: 0.68, reddit: 0.62, news: 0.75, tradingview: 0.71 },
    { time: "08:00", twitter: 0.72, reddit: 0.65, news: 0.78, tradingview: 0.74 },
    { time: "12:00", twitter: 0.75, reddit: 0.68, news: 0.82, tradingview: 0.77 },
    { time: "16:00", twitter: 0.78, reddit: 0.71, news: 0.85, tradingview: 0.8 },
    { time: "20:00", twitter: 0.76, reddit: 0.69, news: 0.83, tradingview: 0.78 },
  ]

  const sentimentDistribution = [
    { name: "Bullish", value: 65, color: "#10B981" },
    { name: "Neutral", value: 25, color: "#6B7280" },
    { name: "Bearish", value: 10, color: "#EF4444" },
  ]

  const newsImpact = [
    {
      source: "Reuters",
      headline: "Fed hints at dovish stance in upcoming meeting",
      sentiment: 0.82,
      impact: "High",
      timestamp: "2h ago",
    },
    {
      source: "Bloomberg",
      headline: "ECB policy decision expected next week",
      sentiment: 0.65,
      impact: "Medium",
      timestamp: "4h ago",
    },
    {
      source: "CNBC",
      headline: "Dollar weakens amid risk-on sentiment",
      sentiment: 0.73,
      impact: "Medium",
      timestamp: "6h ago",
    },
  ]

  const socialMetrics = [
    { platform: "Twitter", mentions: 2547, sentiment: 0.72, engagement: 89 },
    { platform: "Reddit", mentions: 1234, sentiment: 0.68, engagement: 76 },
    { platform: "TradingView", mentions: 892, sentiment: 0.75, engagement: 92 },
    { platform: "Discord", mentions: 456, sentiment: 0.71, engagement: 84 },
  ]

  const influencerSentiment = [
    { name: "CryptoBull", followers: "2.1M", sentiment: 0.85, platform: "Twitter" },
    { name: "ForexKing", followers: "1.8M", sentiment: 0.78, platform: "Twitter" },
    { name: "ChartMaster", followers: "956K", sentiment: 0.82, platform: "TradingView" },
    { name: "TradingGuru", followers: "1.2M", sentiment: 0.73, platform: "YouTube" },
  ]

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.7) return "text-green-400"
    if (sentiment > 0.5) return "text-yellow-400"
    return "text-red-400"
  }

  const getSentimentBadge = (sentiment: number) => {
    if (sentiment > 0.7) return "default"
    if (sentiment > 0.5) return "secondary"
    return "destructive"
  }

  return (
    <div className="space-y-6">
      {/* Sentiment Overview */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Market Sentiment Analysis
          </CardTitle>
          <CardDescription>Real-time sentiment tracking across social media and news</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Overall Sentiment</h4>
                <div className="flex items-center space-x-3">
                  <div className="text-4xl font-bold text-white">73%</div>
                  <div className="text-sm text-green-300">
                    <div>Bullish</div>
                    <div>+5.2% from yesterday</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">Social Volume</span>
                  </div>
                  <div className="text-xl font-bold text-white">5.2K</div>
                  <div className="text-xs text-slate-500">Mentions/hour</div>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-slate-300">News Impact</span>
                  </div>
                  <div className="text-xl font-bold text-white">High</div>
                  <div className="text-xs text-slate-500">Market moving</div>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Timeline */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Sentiment Timeline (24h)</CardTitle>
          <CardDescription>Real-time sentiment tracking across multiple platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentData}>
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
                <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} name="Twitter" />
                <Line type="monotone" dataKey="reddit" stroke="#FF4500" strokeWidth={2} name="Reddit" />
                <Line type="monotone" dataKey="news" stroke="#10B981" strokeWidth={2} name="News" />
                <Line type="monotone" dataKey="tradingview" stroke="#2962FF" strokeWidth={2} name="TradingView" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* News Impact Analysis */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            News Impact Analysis
          </CardTitle>
          <CardDescription>Recent news events and their sentiment impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsImpact.map((news, index) => (
              <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {news.source}
                      </Badge>
                      <span className="text-xs text-slate-500">{news.timestamp}</span>
                    </div>
                    <h4 className="text-white font-medium">{news.headline}</h4>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getSentimentColor(news.sentiment)}`}>
                      {(news.sentiment * 100).toFixed(0)}%
                    </div>
                    <Badge variant={getSentimentBadge(news.sentiment)}>{news.impact}</Badge>
                  </div>
                </div>
                <Progress value={news.sentiment * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Hash className="w-5 h-5 mr-2" />
              Social Media Metrics
            </CardTitle>
            <CardDescription>Platform-specific sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialMetrics.map((metric) => (
                <div key={metric.platform} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white font-medium">{metric.platform}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-right">
                      <div className="text-slate-300">{metric.mentions} mentions</div>
                      <div className="text-slate-500">{metric.engagement}% engagement</div>
                    </div>
                    <div className={`font-semibold ${getSentimentColor(metric.sentiment)}`}>
                      {(metric.sentiment * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Influencer Sentiment
            </CardTitle>
            <CardDescription>Key trading influencers' sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {influencerSentiment.map((influencer) => (
                <div key={influencer.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{influencer.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{influencer.name}</div>
                      <div className="text-slate-400 text-xs">
                        {influencer.followers} • {influencer.platform}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getSentimentColor(influencer.sentiment)}`}>
                      {(influencer.sentiment * 100).toFixed(0)}%
                    </div>
                    <Badge variant={getSentimentBadge(influencer.sentiment)} className="text-xs">
                      {influencer.sentiment > 0.7 ? "Bullish" : influencer.sentiment > 0.5 ? "Neutral" : "Bearish"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Trading Signals */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Sentiment Trading Signals
          </CardTitle>
          <CardDescription>AI-powered sentiment analysis for trading decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Bullish Sentiment Confluence</h4>
              <p className="text-slate-300 text-sm mb-3">
                Strong bullish sentiment across all major platforms with increasing momentum. News sentiment
                particularly positive following Fed dovish hints.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">73%</div>
                  <div className="text-xs text-slate-500">Overall Sentiment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">+5.2%</div>
                  <div className="text-xs text-slate-500">24h Change</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">High</div>
                  <div className="text-xs text-slate-500">News Impact</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Sentiment Strategy</h4>
              <p className="text-slate-300 text-sm">
                Current sentiment supports bullish bias. Consider sentiment divergence as early warning for potential
                reversals. Social volume spike may indicate momentum confirmation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
