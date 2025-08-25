"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, Copy, CheckCircle, RefreshCw } from "lucide-react"
import { apiService } from "@/lib/api"

interface CitationTrackerProps {
  documents: any[]
}

export function CitationTracker({ documents }: CitationTrackerProps) {
  const [allCitations, setAllCitations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalCitations, setTotalCitations] = useState(0)

  // Fetch citations for all documents
  const fetchCitations = async () => {
    if (documents.length === 0) return
    
    setIsLoading(true)
    try {
      console.log(`🔄 Starting citation fetch for ${documents.length} documents...`)
      
      const citationsPromises = documents.map(async (doc) => {
        try {
          console.log(`📄 Fetching citations for document: ${doc.name} (${doc.id})`)
          const results = await apiService.getDocumentResults(doc.id)
          console.log(`📊 Document results for ${doc.name}:`, results)
          
          const docCitations = results.document.citations || []
          console.log(`🔗 Found ${docCitations.length} citations in document ${doc.name}:`, docCitations)
          
          return docCitations.map((citation: any) => ({
            ...citation,
            documentName: doc.name,
            documentId: doc.id,
          }))
        } catch (error) {
          console.error(`❌ Error fetching citations for document ${doc.id}:`, error)
          return []
        }
      })

      const citationsArrays = await Promise.all(citationsPromises)
      const flatCitations = citationsArrays.flat()
      
      console.log(`📊 All citations arrays:`, citationsArrays)
      console.log(`🔗 Flattened citations:`, flatCitations)
      
      setAllCitations(flatCitations)
      setTotalCitations(flatCitations.length)
      
      console.log(`✅ Fetched ${flatCitations.length} citations from ${documents.length} documents`)
    } catch (error) {
      console.error('❌ Error fetching citations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch citations when documents change
  useEffect(() => {
    console.log(`🔄 CitationTracker: Documents changed, fetching citations for ${documents.length} documents`)
    console.log('📄 Documents:', documents.map(doc => ({ id: doc.id, name: doc.name, hasCitations: !!doc.citations })))
    fetchCitations()
  }, [documents])

  // Debug log when citations are updated
  useEffect(() => {
    console.log(`📊 CitationTracker: Citations updated - ${allCitations.length} citations found`)
    if (allCitations.length > 0) {
      console.log('🔍 Sample citations:', allCitations.slice(0, 2))
    }
  }, [allCitations])

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

  // If no citations found, show a message with refresh option
  if (allCitations.length === 0 && !isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Citation Tracking</h2>
            <p className="text-muted-foreground">Source traceability and reference verification</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">0 Citations Found</Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchCitations}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Citations Detected</h3>
            <p className="text-muted-foreground mb-4">
              No citations were found in the uploaded documents. This could mean:
            </p>
            <ul className="text-sm text-muted-foreground mb-4 space-y-1">
              <li>• The documents don't contain any citations</li>
              <li>• Citation detection is still processing</li>
              <li>• The documents need to be re-analyzed</li>
            </ul>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={fetchCitations}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh Citations'}
              </Button>
            </div>
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
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            {totalCitations} Citation{totalCitations !== 1 ? "s" : ""} Found
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchCitations}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <RefreshCw className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-spin" />
            <p className="text-muted-foreground">Refreshing citations...</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && allCitations.length > 0 && (
        <div className="grid gap-4">
          {allCitations.map((citation, index) => (
            <Card key={`${citation.documentId}-${citation.id || index}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {citation.documentName}
                      </Badge>
                      <Badge variant={citation.confidence > 0.9 ? "default" : "secondary"} className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {Math.round((citation.confidence || 0.8) * 100)}% Confidence
                      </Badge>
                    </div>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "{citation.text || 'Citation text not available'}"
                    </blockquote>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(citation.text || '');
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
                      disabled={!citation.source || !citation.source.startsWith('http')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Source Location:</strong> {citation.source || 'Unknown source'}
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
      )}


    </div>
  )
}
