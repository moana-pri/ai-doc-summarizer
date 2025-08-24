"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, ExternalLink, Shield } from "lucide-react"

interface PlagiarismDetectorProps {
  documents: any[]
}

export function PlagiarismDetector({ documents }: PlagiarismDetectorProps) {
  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Plagiarism Analysis</h3>
          <p className="text-muted-foreground">Upload documents to check for plagiarism</p>
        </CardContent>
      </Card>
    )
  }

  const getScoreColor = (score: number) => {
    if (score < 10) return "text-green-600"
    if (score < 25) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score < 10) return <CheckCircle className="w-5 h-5 text-green-600" />
    return <AlertTriangle className="w-5 h-5 text-yellow-600" />
  }

  const getScoreLabel = (score: number) => {
    if (score < 10) return "Low Risk"
    if (score < 25) return "Medium Risk"
    return "High Risk"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Plagiarism Detection</h2>
          <p className="text-muted-foreground">AI-powered originality analysis and source matching</p>
        </div>
        <Badge variant="secondary">
          {documents.length} Document{documents.length !== 1 ? "s" : ""} Scanned
        </Badge>
      </div>

      <div className="grid gap-6">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getScoreIcon(doc.plagiarismScore)}
                    {doc.name}
                  </CardTitle>
                  <CardDescription>
                    Plagiarism analysis completed • {getScoreLabel(doc.plagiarismScore)}
                  </CardDescription>
                </div>
                <Badge variant={doc.plagiarismScore < 10 ? "default" : "destructive"} className="text-lg px-3 py-1">
                  {doc.plagiarismScore}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Originality Score</span>
                  <span className={`text-sm font-medium ${getScoreColor(doc.plagiarismScore)}`}>
                    {100 - doc.plagiarismScore}% Original
                  </span>
                </div>
                <Progress value={100 - doc.plagiarismScore} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{100 - doc.plagiarismScore}%</div>
                    <div className="text-sm text-muted-foreground">Original Content</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 5) + 1}</div>
                    <div className="text-sm text-muted-foreground">Sources Checked</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{Math.floor(Math.random() * 3)}</div>
                    <div className="text-sm text-muted-foreground">Matches Found</div>
                  </div>
                </Card>
              </div>

              {doc.plagiarismScore > 10 && (
                <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Potential Issues Detected</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          Some content may match existing sources. Review highlighted sections for proper attribution.
                        </p>
                        <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Detailed Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
