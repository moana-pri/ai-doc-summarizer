"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileText,
  Brain,
  Search,
  Users,
  AlertTriangle,
  Download,
  Sparkles,
  Zap,
  Target,
  BarChart3,
} from "lucide-react"
import { DocumentUpload } from "@/components/document-upload"
import { SummaryResults } from "@/components/summary-results"
import { CitationTracker } from "@/components/citation-tracker"
import { PlagiarismDetector } from "@/components/plagiarism-detector"
import { ConferenceSuggestions } from "@/components/conference-suggestions"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { apiService, DocumentResults } from "@/lib/api"

export default function DocumentSummarizer() {
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentResults[]>([])
  const [activeTab, setActiveTab] = useState("upload")
  const [isProcessing, setIsProcessing] = useState(false)
  const [analyticsData, setAnalyticsData] = useState({
    totalDocuments: 0,
    totalProcessingTime: 0,
    averageAccuracy: 0,
    successRate: 100,
    documentsToday: 0,
    citationsFound: 0,
    plagiarismDetected: 0,
    conferencesMatched: 0,
  })

  const handleDocumentUpload = async (files: File[]) => {
    setIsProcessing(true)

    try {
      const newDocs: DocumentResults[] = []

      for (const file of files) {
        // Upload document
        const uploadResult = await apiService.uploadDocument(file)
        const document = uploadResult.document

        // Generate summary
        const summaryResult = await apiService.generateSummary(document.id, 200)
        
        // Analyze document
        const analysisResult = await apiService.analyzeDocument(document.id)
        
        // Get full results
        const results = await apiService.getDocumentResults(document.id)
        
        newDocs.push(results.document)
      }

      setUploadedDocuments((prev) => [...prev, ...newDocs])

      // Update analytics
      const analytics = await apiService.getAnalytics()
      setAnalyticsData(analytics)

      setIsProcessing(false)
      setActiveTab("results")
    } catch (error) {
      console.error('Error processing documents:', error)
      setIsProcessing(false)
      // You could add error handling UI here
    }
  }

  // Mock data generation functions removed - now using real API data

  // Load analytics data on component mount
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const analytics = await apiService.getAnalytics()
        setAnalyticsData(analytics)
      } catch (error) {
        console.error('Error loading analytics:', error)
      }
    }
    
    loadAnalytics()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/30"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/10 glass-effect animate-float">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white mb-2">DocuMind AI</h1>
                  <p className="text-white/90 text-lg">Intelligent Document Analysis & Summarization</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="text-sm bg-white/10 text-white border-white/20 hover-lift">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="text-sm bg-white/10 text-white border-white/20 hover-lift">
                  <Zap className="w-4 h-4 mr-1" />
                  Lightning Fast
                </Badge>
                <Badge variant="secondary" className="text-sm bg-white/10 text-white border-white/20 hover-lift">
                  <Target className="w-4 h-4 mr-1" />
                  99% Accurate
                </Badge>
              </div>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="hover-lift pulse-on-hover bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-12 p-2 bg-card/50 backdrop-blur-sm border border-border/50 hover-lift">
            <TabsTrigger
              value="upload"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="citations"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <Search className="w-4 h-4" />
              Citations
            </TabsTrigger>
            <TabsTrigger
              value="plagiarism"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <AlertTriangle className="w-4 h-4" />
              Plagiarism
            </TabsTrigger>
            <TabsTrigger
              value="conferences"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <Users className="w-4 h-4" />
              Conferences
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-8">
            <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Document Upload
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Upload your documents for AI-powered analysis, summarization, and citation tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUpload onUpload={handleDocumentUpload} isProcessing={isProcessing} />

                {isProcessing && (
                  <div className="mt-8 space-y-4 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        Processing documents...
                      </span>
                      <span className="text-primary">Analyzing content</span>
                    </div>
                    <Progress value={65} className="w-full h-3 animate-glow" />
                    <p className="text-sm text-muted-foreground text-center">
                      🧠 Extracting text • 📝 Generating summaries • 🔗 Tracking citations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {uploadedDocuments.length > 0 && (
              <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    Uploaded Documents
                  </CardTitle>
                  <CardDescription>
                    {uploadedDocuments.length} document{uploadedDocuments.length !== 1 ? "s" : ""} ready for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {uploadedDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-xl hover-lift bg-gradient-to-r from-card/80 to-muted/60 border-border/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/20">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded {doc.uploadedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-primary/20 text-primary border-primary/30 animate-pulse"
                        >
                          ✨ Processed
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="results">
            <SummaryResults documents={uploadedDocuments} />
          </TabsContent>

          <TabsContent value="citations">
            <CitationTracker documents={uploadedDocuments} />
          </TabsContent>

          <TabsContent value="plagiarism">
            <PlagiarismDetector documents={uploadedDocuments} />
          </TabsContent>

          <TabsContent value="conferences">
            <ConferenceSuggestions documents={uploadedDocuments} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard data={analyticsData} documents={uploadedDocuments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
