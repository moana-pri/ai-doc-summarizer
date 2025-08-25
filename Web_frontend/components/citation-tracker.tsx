"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, Copy, CheckCircle } from "lucide-react"

interface CitationTrackerProps {
  documents: any[]
}

export function CitationTracker({ documents }: CitationTrackerProps) {
  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Citations to Track</h3>
          <p className="text-muted-foreground">Upload documents to see citation analysis</p>
        </CardContent>
      </Card>
    )
  }

  const allCitations = documents.flatMap((doc) => {
    return (doc.citations || []).map((citation: any) => ({
      ...citation,
      documentName: doc.name,
      documentId: doc.id,
    }))
  })

  // If no citations found, show a message
  if (allCitations.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Citation Tracking</h2>
            <p className="text-muted-foreground">Source traceability and reference verification</p>
          </div>
          <Badge variant="secondary">0 Citations Found</Badge>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Citations Detected</h3>
            <p className="text-muted-foreground">
              No citations were found in the uploaded documents. This could mean:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• The documents don't contain any citations</li>
              <li>• Citation detection is still processing</li>
              <li>• The documents need to be re-analyzed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Citation Tracking</h2>
          <p className="text-muted-foreground">Source traceability and reference verification</p>
        </div>
        <Badge variant="secondary">
          {allCitations.length} Citation{allCitations.length !== 1 ? "s" : ""} Found
        </Badge>
      </div>

      <div className="grid gap-4">
        {allCitations.map((citation) => (
          <Card key={`${citation.documentId}-${citation.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {citation.documentName}
                    </Badge>
                    <Badge variant={citation.confidence > 0.9 ? "default" : "secondary"} className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {Math.round(citation.confidence * 100)}% Confidence
                    </Badge>
                  </div>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    "{citation.text}"
                  </blockquote>
                </div>
                                 <div className="flex gap-2 ml-4">
                   <Button 
                     variant="outline" 
                     size="sm"
                     onClick={() => {
                       navigator.clipboard.writeText(citation.text);
                       // You could add a toast notification here
                     }}
                     title="Copy citation"
                   >
                     <Copy className="w-4 h-4" />
                   </Button>
                   <Button 
                     variant="outline" 
                     size="sm"
                     onClick={() => {
                       if (citation.source && citation.source.startsWith('http')) {
                         window.open(citation.source, '_blank');
                       }
                     }}
                     title="Open source link"
                   >
                     <ExternalLink className="w-4 h-4" />
                   </Button>
                 </div>
              </div>

                             <div className="flex items-center justify-between pt-4 border-t">
                 <div className="text-sm text-muted-foreground">
                   <strong>Source Location:</strong> {citation.source}
                 </div>
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={() => {
                     // Scroll to the citation in the document or show a modal
                     console.log(`Viewing citation in document: ${citation.documentName}`);
                     // You could implement a modal or scroll functionality here
                     alert(`Citation from document: ${citation.documentName}\n\nText: "${citation.text}"\n\nSource: ${citation.source}`);
                   }}
                   title="View citation in document context"
                 >
                   View in Document
                 </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
