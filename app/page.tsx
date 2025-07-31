"use client"

import { useState } from "react"
import { Upload, TrendingUp, Brain, Target, BarChart3, Zap, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import FileUpload from "@/components/file-upload"
import TradingSignal from "@/components/trading-signal"
import TechnicalAnalysis from "@/components/technical-analysis"
import ChartPatterns from "@/components/chart-patterns"
import RiskManagement from "@/components/risk-management"
import { analyzeTradingData } from "@/lib/trading-analysis"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Backtesting from "@/components/backtesting"
import MLPredictions from "@/components/ml-predictions"
import SecureAuthWrapper from "@/components/secure-auth-wrapper"
import { TabsContent as TabContent } from "@/components/ui/tabs" // Import TabsContent as TabContent

function GPTChartInstitutionalApp() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsAnalyzing(true)

    try {
      const result = await analyzeTradingData(file)
      setAnalysisResult(result)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("gptchart_session_token")
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">GPTChart Institutional™</h1>
                <p className="text-sm text-slate-400">AI-Powered Trading Analysis Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Premium Access
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Secure Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-2 rounded-full border border-green-500/30">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Secure Premium Access</span>
              </div>
            </div>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
              Elite AI Trading Analysis
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Welcome to the most secure and advanced AI trading platform. Your session is protected with
              enterprise-grade security.
            </p>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: Brain, label: "LSTM + XGBoost ML", color: "from-purple-500 to-blue-500" },
                { icon: Target, label: "Smart Money Concepts", color: "from-blue-500 to-cyan-500" },
                { icon: BarChart3, label: "Multi-Timeframe Logic", color: "from-cyan-500 to-teal-500" },
                { icon: Zap, label: "Real-time Analysis", color: "from-teal-500 to-green-500" },
                { icon: Shield, label: "Secure Platform", color: "from-green-500 to-yellow-500" },
                { icon: Globe, label: "Global Markets", color: "from-yellow-500 to-orange-500" },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className={`flex items-center space-x-2 bg-gradient-to-r ${color} bg-opacity-20 backdrop-blur-sm px-4 py-3 rounded-full border border-white/10 hover:scale-105 transition-all duration-300`}
                >
                  <Icon className="w-4 h-4 text-white" />
                  <span className="text-sm text-white font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Trading Mode Selector */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Switch id="magic-mode" />
                <label htmlFor="magic-mode" className="text-sm text-slate-300">
                  Magic Mode
                </label>
              </div>
              <Select defaultValue="advanced">
                <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600">
                  <SelectValue placeholder="Analysis Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Analysis</SelectItem>
                  <SelectItem value="advanced">Advanced SMC</SelectItem>
                  <SelectItem value="quant">Quant Terminal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content - Same as before */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Data Input
                </CardTitle>
                <CardDescription>Upload charts, CSV files, or connect live feeds</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
              </CardContent>
            </Card>

            {/* Real-time Market Overview */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">EUR/USD</span>
                  <span className="text-green-400 font-semibold">1.1023 +0.12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">GBP/USD</span>
                  <span className="text-red-400 font-semibold">1.2687 -0.08%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">USD/JPY</span>
                  <span className="text-green-400 font-semibold">149.45 +0.23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">BTC/USD</span>
                  <span className="text-green-400 font-semibold">43,250 +2.1%</span>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Summary */}
            {analysisResult && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mt-6">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confidence</span>
                    <span className="text-green-400 font-semibold">{analysisResult.confidence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ML Score</span>
                    <span className="text-blue-400 font-semibold">
                      {analysisResult.ml_predictions?.xgboost_trend_score || 0.78}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk/Reward</span>
                    <span className="text-purple-400 font-semibold">{analysisResult.rrr}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Signal</span>
                    <Badge variant={analysisResult.order === "BUY" ? "default" : "destructive"}>
                      {analysisResult.order}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Analysis Results */}
          <div className="lg:col-span-3">
            {!analysisResult ? (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-16 h-16 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Ready for Elite Analysis</h3>
                  <p className="text-slate-400 mb-6">
                    Upload a chart or CSV file to begin institutional-grade AI analysis
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      ML Predictions
                    </Badge>
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      Smart Money
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Risk Analysis
                    </Badge>
                  </div>
                </div>
              </Card>
            ) : (
              <Tabs defaultValue="signal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 backdrop-blur-sm">
                  <TabsTrigger value="signal">Signal</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="patterns">Patterns</TabsTrigger>
                  <TabsTrigger value="risk">Risk</TabsTrigger>
                  <TabsTrigger value="ml">ML</TabsTrigger>
                  <TabsTrigger value="backtest">Backtest</TabsTrigger>
                </TabsList>

                <TabsContent value="signal">
                  <TradingSignal data={analysisResult} />
                </TabsContent>

                <TabsContent value="technical">
                  <TechnicalAnalysis data={analysisResult} />
                </TabsContent>

                <TabsContent value="patterns">
                  <ChartPatterns data={analysisResult} />
                </TabsContent>

                <TabContent value="risk">
                  {" "}
                  {/* Corrected TabContent to TabsContent */}
                  <RiskManagement data={analysisResult} />
                </TabContent>

                <TabsContent value="ml">
                  <MLPredictions data={analysisResult} />
                </TabsContent>

                <TabsContent value="backtest">
                  <Backtesting data={analysisResult} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GPTChartInstitutional() {
  return (
    <SecureAuthWrapper>
      <GPTChartInstitutionalApp />
    </SecureAuthWrapper>
  )
}
