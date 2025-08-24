"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Copy, ExternalLink, Clock } from "lucide-react"

export function SummaryResults({ documents }) {
  if (documents.length === 0) {
    return (
      <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-slate-500" />
          <h3 className="text-lg font-medium mb-2 text-slate-200">No Documents Analyzed</h3>
          <p className="text-slate-400">Upload documents to see AI-generated summaries</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Document Summaries
          </h2>
          <p className="text-slate-400">AI-generated summaries with source traceability</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30">
          {documents.length} Document{documents.length !== 1 ? "s" : ""} Processed
        </Badge>
      </div>

      {documents.map((doc) => (
        <Card
          key={doc.id}
          className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-slate-200">
                  <FileText className="w-5 h-5 text-blue-400" />
                  {doc.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Processed {doc.uploadedAt.toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Source
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-slate-200">Executive Summary</h4>
                <p className="text-slate-300 leading-relaxed">{doc.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{doc.citations?.length || 0}</div>
                  <div className="text-sm text-slate-400">Citations Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{100 - doc.plagiarismScore}%</div>
                  <div className="text-sm text-slate-400">Originality Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{doc.conferences?.length || 0}</div>
                  <div className="text-sm text-slate-400">Relevant Conferences</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
