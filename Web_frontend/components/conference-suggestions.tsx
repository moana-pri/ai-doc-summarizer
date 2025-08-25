"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, ExternalLink, Star, Clock } from "lucide-react"

interface ConferenceSuggestion {
  conference_name: string;
  confidence_score: number;
  reasoning: string;
}

interface Document {
  id: string;
  name: string;
  conference_suggestions?: ConferenceSuggestion[];
}

interface ConferenceSuggestionsProps {
  documents: Document[]
}

interface ProcessedConference {
  name: string;
  relevance: number;
  deadline: string;
  documentName: string;
  documentId: string;
  reasoning: string;
}

export function ConferenceSuggestions({ documents }: ConferenceSuggestionsProps) {
  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Conference Suggestions</h3>
          <p className="text-muted-foreground">Upload documents to get relevant conference recommendations</p>
        </CardContent>
      </Card>
    )
  }

  const allConferences: ProcessedConference[] = documents.flatMap((doc) =>
    (doc.conference_suggestions || []).map((conf: ConferenceSuggestion) => ({
      name: conf.conference_name,
      relevance: conf.confidence_score,
      deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random deadline
      documentName: doc.name,
      documentId: doc.id,
      reasoning: conf.reasoning,
    })),
  )

  // Remove duplicates and sort by relevance
  const uniqueConferences = allConferences
    .reduce((acc: ProcessedConference[], conf: ProcessedConference) => {
      const existing = acc.find((c: ProcessedConference) => c.name === conf.name)
      if (!existing || existing.relevance < conf.relevance) {
        return [...acc.filter((c: ProcessedConference) => c.name !== conf.name), conf]
      }
      return acc
    }, [] as ProcessedConference[])
    .sort((a: ProcessedConference, b: ProcessedConference) => b.relevance - a.relevance)

  const getRelevanceColor = (relevance: number) => {
    if (relevance > 0.9) return "text-green-600"
    if (relevance > 0.8) return "text-blue-600"
    return "text-yellow-600"
  }

  const getRelevanceBadge = (relevance: number) => {
    if (relevance > 0.9) return "High Match"
    if (relevance > 0.8) return "Good Match"
    return "Moderate Match"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Conference Suggestions</h2>
          <p className="text-muted-foreground">AI-curated conferences based on your document content</p>
        </div>
        <Badge variant="secondary">
          {uniqueConferences.length} Conference{uniqueConferences.length !== 1 ? "s" : ""} Found
        </Badge>
      </div>

      <div className="grid gap-4">
        {uniqueConferences.map((conference: ProcessedConference, index: number) => (
          <Card key={`${conference.name}-${index}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {conference.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Deadline: {new Date(conference.deadline).toLocaleDateString()}
                    </span>
                    <Badge variant="outline">Based on: {conference.documentName}</Badge>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={conference.relevance > 0.9 ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    <Star className="w-3 h-3" />
                    {Math.round(conference.relevance * 100)}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-lg font-semibold ${getRelevanceColor(conference.relevance)}`}>
                      {getRelevanceBadge(conference.relevance)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Relevance score based on content analysis and domain matching
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Clock className="w-4 h-4 mr-2" />
                      Add Reminder
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{Math.floor(Math.random() * 30) + 10} days</div>
                    <div className="text-sm text-muted-foreground">Until Deadline</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{Math.floor(Math.random() * 500) + 100}+</div>
                    <div className="text-sm text-muted-foreground">Expected Attendees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">${Math.floor(Math.random() * 500) + 200}</div>
                    <div className="text-sm text-muted-foreground">Registration Fee</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
