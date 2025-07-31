"use client"

import type React from "react"
import { Brain } from "lucide-react" // Import the Brain component

import { useState } from "react"
import { Upload, FileImage, FileSpreadsheet, Link, Loader2, Activity, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isAnalyzing: boolean
}

export default function FileUpload({ onFileUpload, isAnalyzing }: FileUploadProps) {
  const [urlInput, setUrlInput] = useState("")
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadMode, setUploadMode] = useState<"file" | "url" | "live">("file")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragActive(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragActive(false)

    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      console.log("Processing URL:", urlInput)
      const mockFile = new File(["mock data"], "chart-from-url.png", { type: "image/png" })
      onFileUpload(mockFile)
    }
  }

  const handleLiveFeed = (symbol: string) => {
    console.log("Connecting to live feed:", symbol)
    const mockFile = new File(["live data"], `${symbol}-live.csv`, { type: "text/csv" })
    onFileUpload(mockFile)
  }

  return (
    <Tabs value={uploadMode} onValueChange={(value) => setUploadMode(value as any)} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
        <TabsTrigger value="file">Upload File</TabsTrigger>
        <TabsTrigger value="url">Chart URL</TabsTrigger>
        <TabsTrigger value="live">Live Feed</TabsTrigger>
      </TabsList>

      <TabsContent value="file" className="mt-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? "border-blue-400 bg-blue-400/10 scale-105" : "border-slate-600 hover:border-slate-500"
          } ${isAnalyzing ? "pointer-events-none opacity-50" : ""}`}
        >
          <input
            type="file"
            accept="image/*,.csv,.xls,.xlsx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            disabled={isAnalyzing}
          />

          {isAnalyzing ? (
            <div className="space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <p className="text-white font-medium">Analyzing Chart...</p>
                <p className="text-slate-400 text-sm">Processing with ML models and technical indicators</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <FileImage className="w-8 h-8 text-blue-400" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center">
                  <FileSpreadsheet className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div>
                <p className="text-white font-medium mb-2">
                  {isDragActive ? "Drop your file here" : "Drag & drop or click to upload"}
                </p>
                <p className="text-slate-400 text-sm">
                  Supports: TradingView screenshots, CSV/Excel files, chart images
                </p>
              </div>

              <label htmlFor="file-upload">
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0"
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="url" className="mt-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="chart-url" className="text-slate-300">
              Chart URL
            </Label>
            <div className="flex space-x-2 mt-2">
              <Input
                id="chart-url"
                placeholder="https://tradingview.com/chart/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                disabled={isAnalyzing}
              />
              <Button onClick={handleUrlSubmit} disabled={!urlInput.trim() || isAnalyzing} size="sm">
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-slate-700/30 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Supported Platforms</h4>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• TradingView chart links</li>
              <li>• Direct image URLs</li>
              <li>• Yahoo Finance charts</li>
              <li>• Investing.com charts</li>
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="live" className="mt-4">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-5 h-5 text-green-400" />
              <h4 className="text-green-400 font-semibold">Live Market Data</h4>
            </div>
            <p className="text-slate-300 text-sm mb-4">Connect to real-time price feeds for instant analysis</p>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleLiveFeed("EURUSD")}
                disabled={isAnalyzing}
                variant="outline"
                className="bg-slate-700/50 border-slate-600 hover:bg-slate-600"
              >
                <Globe className="w-4 h-4 mr-2" />
                EUR/USD
              </Button>
              <Button
                onClick={() => handleLiveFeed("GBPUSD")}
                disabled={isAnalyzing}
                variant="outline"
                className="bg-slate-700/50 border-slate-600 hover:bg-slate-600"
              >
                <Globe className="w-4 h-4 mr-2" />
                GBP/USD
              </Button>
              <Button
                onClick={() => handleLiveFeed("USDJPY")}
                disabled={isAnalyzing}
                variant="outline"
                className="bg-slate-700/50 border-slate-600 hover:bg-slate-600"
              >
                <Globe className="w-4 h-4 mr-2" />
                USD/JPY
              </Button>
              <Button
                onClick={() => handleLiveFeed("BTCUSD")}
                disabled={isAnalyzing}
                variant="outline"
                className="bg-slate-700/50 border-slate-600 hover:bg-slate-600"
              >
                <Globe className="w-4 h-4 mr-2" />
                BTC/USD
              </Button>
            </div>
          </div>

          <div className="bg-slate-700/30 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Data Sources</h4>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Binance API (Crypto)</li>
              <li>• Alpha Vantage (Forex)</li>
              <li>• Yahoo Finance (Stocks)</li>
              <li>• IEX Cloud (Options)</li>
            </ul>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
