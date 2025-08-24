"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Brain, Search, Users, AlertTriangle, Download, Sparkles, Zap, Target } from "lucide-react"
import { DocumentUpload } from "@/components/document-upload"
import { SummaryResults } from "@/components/summary-results"
import { CitationTracker } from "@/components/citation-tracker"
import { PlagiarismDetector } from "@/components/plagiarism-detector"
import { ConferenceSuggestions } from "@/components/conference-suggestions"

export default function DocumentSummarizer() {
  const [uploadedDocuments, setUploadedDocuments] = useState([])
  const [activeTab, setActiveTab] = useState("upload")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDocumentUpload = (files) => {
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      const newDocs = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        status: "processed",
        summary: generateMockSummary(file.name),
        citations: generateMockCitations(),
        plagiarismScore: Math.floor(Math.random() * 15) + 5,
        conferences: generateMockConferences(file.name),
      }))

      setUploadedDocuments((prev) => [...prev, ...newDocs])
      setIsProcessing(false)
      setActiveTab("results")
    }, 3000)
  }

  const generateMockSummary = (filename) => {
    const summaries = [
      "This research paper presents a comprehensive analysis of machine learning applications in healthcare, focusing on diagnostic accuracy improvements and patient outcome predictions. The study demonstrates significant advances in early disease detection through AI-powered imaging analysis.",
      "The legal document outlines contractual obligations between parties, emphasizing liability limitations, intellectual property rights, and dispute resolution mechanisms. Key provisions include termination clauses and confidentiality agreements.",
      "This academic paper explores the intersection of artificial intelligence and educational technology, presenting evidence for improved learning outcomes through personalized AI tutoring systems and adaptive learning platforms.",
    ]
    return summaries[Math.floor(Math.random() * summaries.length)]
  }

  const generateMockCitations = () => [
    {
      id: 1,
      text: "According to recent studies in medical imaging...",
      source: "Page 3, Paragraph 2",
      confidence: 0.95,
    },
    { id: 2, text: "The contractual framework establishes...", source: "Section 4.2, Line 15", confidence: 0.88 },
    { id: 3, text: "Educational outcomes improved by 23%...", source: "Table 2, Results Section", confidence: 0.92 },
  ]

  const generateMockConferences = (filename) => [
    { name: "International Conference on AI in Healthcare", relevance: 0.94, deadline: "2024-03-15" },
    { name: "Legal Technology Summit", relevance: 0.87, deadline: "2024-04-20" },
    { name: "Educational AI Symposium", relevance: 0.91, deadline: "2024-05-10" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 animate-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    DocuMind AI
                  </h1>
                  <p className="text-slate-300 text-lg">Intelligent Document Analysis & Summarization</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Badge className="text-sm bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI-Powered
                </Badge>
                <Badge className="text-sm bg-purple-500/20 text-purple-300 border-purple-400/30 hover:bg-purple-500/30 transition-all duration-300">
                  <Zap className="w-4 h-4 mr-1" />
                  Lightning Fast
                </Badge>
                <Badge className="text-sm bg-indigo-500/20 text-indigo-300 border-indigo-400/30 hover:bg-indigo-500/30 transition-all duration-300">
                  <Target className="w-4 h-4 mr-1" />
                  99% Accurate
                </Badge>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              <Download className="w-5 h-5 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-12 p-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
            <TabsTrigger
              value="upload"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 rounded-lg"
            >
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="citations"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 rounded-lg"
            >
              <Search className="w-4 h-4" />
              Citations
            </TabsTrigger>
            <TabsTrigger
              value="plagiarism"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 rounded-lg"
            >
              <AlertTriangle className="w-4 h-4" />
              Plagiarism
            </TabsTrigger>
            <TabsTrigger
              value="conferences"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 rounded-lg"
            >
              <Users className="w-4 h-4" />
              Conferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-8">
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Document Upload
                </CardTitle>
                <CardDescription className="text-lg text-slate-400">
                  Upload your documents for AI-powered analysis, summarization, and citation tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUpload onUpload={handleDocumentUpload} isProcessing={isProcessing} />

                {isProcessing && (
                  <div className="mt-8 space-y-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        Processing documents...
                      </span>
                      <span className="text-blue-400">Analyzing content</span>
                    </div>
                    <Progress value={65} className="w-full h-3 bg-slate-700" />
                    <p className="text-sm text-slate-400 text-center">
                      🧠 Extracting text • 📝 Generating summaries • 🔗 Tracking citations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {uploadedDocuments.length > 0 && (
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <FileText className="w-6 h-6 text-blue-400" />
                    Uploaded Documents
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {uploadedDocuments.length} document{uploadedDocuments.length !== 1 ? "s" : ""} ready for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {uploadedDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                            <FileText className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200">{doc.name}</p>
                            <p className="text-sm text-slate-400">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded {doc.uploadedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-400/30 animate-pulse">
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
        </Tabs>
      </div>
    </div>
  )
}
