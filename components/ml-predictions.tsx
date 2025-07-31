"use client"

import { Brain, TrendingUp, BarChart3, Target, Zap, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MLPredictionsProps {
  data: any
}

export default function MLPredictions({ data }: MLPredictionsProps) {
  const mlData = data.ml_predictions || {
    lstm_price_change: 2.3,
    xgboost_trend_score: 0.78,
    pattern_classification: "Bullish Engulfing + Order Block Retest",
    cnn_confidence: 89.2,
    sentiment_score: 0.65,
    volatility_forecast: 0.0018,
    volume_prediction: 1.23,
    support_resistance_ml: [1.1015, 1.105],
  }

  const predictionData = [
    { time: "T+1", lstm: 1.1025, xgboost: 1.1023, actual: 1.1023 },
    { time: "T+2", lstm: 1.1028, xgboost: 1.1026, actual: null },
    { time: "T+3", lstm: 1.1032, xgboost: 1.1029, actual: null },
    { time: "T+4", lstm: 1.1035, xgboost: 1.1032, actual: null },
    { time: "T+5", lstm: 1.1038, xgboost: 1.1035, actual: null },
  ]

  const confidenceData = [
    { model: "LSTM", confidence: 87, accuracy: 73.2 },
    { model: "XGBoost", confidence: 82, accuracy: 68.9 },
    { model: "CNN Pattern", confidence: 89, accuracy: 76.5 },
    { model: "Random Forest", confidence: 79, accuracy: 71.1 },
    { model: "SVM", confidence: 84, accuracy: 69.8 },
  ]

  const featureImportance = [
    { feature: "RSI", importance: 0.23, impact: "High" },
    { feature: "MACD", importance: 0.19, impact: "High" },
    { feature: "Volume", importance: 0.16, impact: "Medium" },
    { feature: "ATR", importance: 0.14, impact: "Medium" },
    { feature: "Order Block", importance: 0.12, impact: "Medium" },
    { feature: "FVG", importance: 0.09, impact: "Low" },
    { feature: "BOS", importance: 0.07, impact: "Low" },
  ]

  return (
    <div className="space-y-6">
      {/* ML Model Overview */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Machine Learning Predictions
          </CardTitle>
          <CardDescription>Advanced AI models analyzing market patterns and price movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-purple-300">LSTM Forecast</h4>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">+{mlData.lstm_price_change}%</p>
              <p className="text-xs text-purple-300">Next 5 periods</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-blue-300">XGBoost Score</h4>
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">{mlData.xgboost_trend_score}</p>
              <p className="text-xs text-blue-300">Trend strength</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 p-4 rounded-lg border border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-green-300">CNN Pattern</h4>
                <Target className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">{mlData.cnn_confidence}%</p>
              <p className="text-xs text-green-300">Pattern confidence</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-yellow-300">Sentiment AI</h4>
                <Activity className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white">{(mlData.sentiment_score * 100).toFixed(0)}%</p>
              <p className="text-xs text-yellow-300">Bullish sentiment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Prediction Chart */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Multi-Model Price Forecasting</CardTitle>
          <CardDescription>LSTM vs XGBoost predictions with confidence intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
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
                <Line
                  type="monotone"
                  dataKey="lstm"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="LSTM Prediction"
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="xgboost"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  name="XGBoost Prediction"
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10B981"
                  strokeWidth={3}
                  name="Actual Price"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Model Performance</CardTitle>
            <CardDescription>Confidence scores and historical accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {confidenceData.map((model) => (
                <div key={model.model} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">{model.model}</span>
                    <span className="text-white">{model.confidence}%</span>
                  </div>
                  <Progress value={model.confidence} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Historical Accuracy: {model.accuracy}%</span>
                    <Badge
                      variant={model.confidence > 85 ? "default" : model.confidence > 75 ? "secondary" : "outline"}
                    >
                      {model.confidence > 85 ? "Excellent" : model.confidence > 75 ? "Good" : "Fair"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Feature Importance</CardTitle>
            <CardDescription>Key indicators driving ML predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {featureImportance.map((feature, index) => (
                <div key={feature.feature} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white font-medium">{feature.feature}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16">
                      <Progress value={feature.importance * 100} className="h-1" />
                    </div>
                    <span className="text-slate-300 text-sm">{(feature.importance * 100).toFixed(1)}%</span>
                    <Badge
                      variant={
                        feature.impact === "High" ? "default" : feature.impact === "Medium" ? "secondary" : "outline"
                      }
                    >
                      {feature.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Advanced ML Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-slate-300 text-sm mb-2">Pattern Classification</h4>
              <p className="text-white font-semibold mb-2">{mlData.pattern_classification}</p>
              <p className="text-xs text-slate-500">CNN confidence: {mlData.cnn_confidence}%</p>
            </div>

            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-slate-300 text-sm mb-2">Volatility Forecast</h4>
              <p className="text-white font-semibold mb-2">{mlData.volatility_forecast}</p>
              <p className="text-xs text-slate-500">Expected ATR next session</p>
            </div>

            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-slate-300 text-sm mb-2">Volume Prediction</h4>
              <p className="text-white font-semibold mb-2">{mlData.volume_prediction}x</p>
              <p className="text-xs text-slate-500">Relative to average</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-lg">
            <h4 className="text-purple-400 font-semibold mb-2">ML Ensemble Signal</h4>
            <p className="text-slate-300 text-sm">
              The ensemble of LSTM, XGBoost, and CNN models shows strong bullish consensus with {mlData.cnn_confidence}%
              confidence. Feature importance analysis indicates RSI and MACD are primary drivers, while Smart Money
              Concepts provide additional confluence.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Model Explainability */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">AI Model Explainability</CardTitle>
          <CardDescription>Understanding how our models make predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">LSTM Neural Network</h4>
              <p className="text-slate-300 text-sm mb-3">
                Long Short-Term Memory network analyzing 100 historical price points to predict future movement
                patterns.
              </p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <p className="text-slate-400">Layers</p>
                  <p className="text-white font-bold">4</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">Neurons</p>
                  <p className="text-white font-bold">256</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">Lookback</p>
                  <p className="text-white font-bold">100</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">XGBoost Gradient Boosting</h4>
              <p className="text-slate-300 text-sm mb-3">
                Ensemble of 1000 decision trees analyzing 47 technical indicators for trend classification.
              </p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <p className="text-slate-400">Trees</p>
                  <p className="text-white font-bold">1000</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">Features</p>
                  <p className="text-white font-bold">47</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">Depth</p>
                  <p className="text-white font-bold">8</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">CNN Pattern Recognition</h4>
              <p className="text-slate-300 text-sm mb-3">
                Convolutional Neural Network trained on 50,000+ chart patterns for visual pattern detection.
              </p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <p className="text-slate-400">Filters</p>
                  <p className="text-white font-bold">128</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">Patterns</p>
                  <p className="text-white font-bold">50K+</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">Accuracy</p>
                  <p className="text-white font-bold">89%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
