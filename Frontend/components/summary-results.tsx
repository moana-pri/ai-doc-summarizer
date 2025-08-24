"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Copy, ExternalLink, Clock } from "lucide-react"

interface SummaryResultsProps {
  documents: any[]
}

export function SummaryResults({ documents }: SummaryResultsProps) {
  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Documents Analyzed</h3>
          <p className="text-muted-foreground">Upload documents to see AI-generated summaries</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Summaries</h2>
          <p className="text-muted-foreground">AI-generated summaries with source traceability</p>
        </div>
        <Badge variant="secondary">
          {documents.length} Document{documents.length !== 1 ? "s" : ""} Processed
        </Badge>
      </div>

      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {doc.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Processed {doc.uploadedAt.toLocaleDateString()}
                  </span>
                  <Badge variant="outline">{(doc.size / 1024 / 1024).toFixed(2)} MB</Badge>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Source
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Executive Summary</h4>
                <p className="text-muted-foreground leading-relaxed">{doc.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{doc.citations?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Citations Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{100 - doc.plagiarismScore}%</div>
                  <div className="text-sm text-muted-foreground">Originality Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{doc.conferences?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Relevant Conferences</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
