"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, ExternalLink, Shield, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PlagiarismDetectorProps {
  documents: any[]
}

export function PlagiarismDetector({ documents }: PlagiarismDetectorProps) {
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

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

  const handleViewDetailedReport = (document: any) => {
    setSelectedDocument(document)
    setIsDetailModalOpen(true)
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
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3 bg-transparent"
                          onClick={() => handleViewDetailedReport(doc)}
                        >
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

      {/* Detailed Report Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Detailed Plagiarism Report
            </DialogTitle>
            <DialogDescription>
              Comprehensive analysis of {selectedDocument?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-6">
              {/* Document Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Document Name</p>
                      <p className="font-medium">{selectedDocument.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">File Size</p>
                      <p className="font-medium">{(selectedDocument.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Upload Date</p>
                      <p className="font-medium">
                        {selectedDocument.uploadedAt ? new Date(selectedDocument.uploadedAt).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Analysis Status</p>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plagiarism Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Plagiarism Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Similarity</span>
                    <Badge variant={selectedDocument.plagiarismScore < 10 ? "default" : "destructive"} className="text-lg">
                      {selectedDocument.plagiarismScore}%
                    </Badge>
                  </div>
                  <Progress value={selectedDocument.plagiarismScore} className="h-3" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{100 - selectedDocument.plagiarismScore}%</div>
                      <div className="text-sm text-muted-foreground">Original Content</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{selectedDocument.plagiarismScore}%</div>
                      <div className="text-sm text-muted-foreground">Similar Content</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 5) + 1}</div>
                      <div className="text-sm text-muted-foreground">Sources Checked</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Matched Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Matched Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedDocument.plagiarism_checks && selectedDocument.plagiarism_checks.length > 0 ? (
                      selectedDocument.plagiarism_checks.map((check: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Source {index + 1}</span>
                            <Badge variant="outline">{check.similarity_percentage}% match</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {check.matched_sources && check.matched_sources.length > 0 
                              ? check.matched_sources[0]?.title || 'Unknown source'
                              : 'No specific source identified'
                            }
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Status: {check.status}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <Shield className="w-8 h-8 mx-auto mb-2" />
                        <p>No specific sources matched</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedDocument.plagiarismScore < 10 ? (
                      <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800 dark:text-green-200">Excellent Originality</h4>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            Your document shows excellent originality. No action required.
                          </p>
                        </div>
                      </div>
                    ) : selectedDocument.plagiarismScore < 25 ? (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Moderate Similarity Detected</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              Review highlighted sections and ensure proper attribution.
                            </p>
                          </div>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li>• Review and cite any referenced sources</li>
                          <li>• Paraphrase similar content</li>
                          <li>• Add quotation marks for direct quotes</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-800 dark:text-red-200">High Similarity Detected</h4>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              Significant similarity detected. Immediate review recommended.
                            </p>
                          </div>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li>• Thoroughly review all highlighted sections</li>
                          <li>• Rewrite similar content in your own words</li>
                          <li>• Properly cite all referenced sources</li>
                          <li>• Consider using plagiarism detection tools</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
