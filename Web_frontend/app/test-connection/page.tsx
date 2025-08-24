"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiService } from "@/lib/api"

export default function TestConnection() {
  const [testResults, setTestResults] = useState<any>({})
  const [isTesting, setIsTesting] = useState(false)

  const testBackendConnection = async () => {
    setIsTesting(true)
    const results: any = {}

    try {
      // Test 1: List documents
      console.log("Testing: List documents")
      const documents = await apiService.listDocuments()
      results.documents = documents
      console.log("✅ Documents listed:", documents)
    } catch (error) {
      results.documentsError = error
      console.error("❌ Documents error:", error)
    }

    try {
      // Test 2: Get analytics
      console.log("Testing: Get analytics")
      const analytics = await apiService.getAnalytics()
      results.analytics = analytics
      console.log("✅ Analytics retrieved:", analytics)
    } catch (error) {
      results.analyticsError = error
      console.error("❌ Analytics error:", error)
    }

    setTestResults(results)
    setIsTesting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted p-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">🔗 Frontend-Backend Connection Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This page tests the connection between your React frontend and Django backend.
              Make sure your Django server is running on http://127.0.0.1:8000/
            </p>
            
            <Button 
              onClick={testBackendConnection} 
              disabled={isTesting}
              className="w-full"
            >
              {isTesting ? "Testing..." : "Test Connection"}
            </Button>
          </CardContent>
        </Card>

        {Object.keys(testResults).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📋 Test Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Start Django Backend</h3>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                cd document-summarizer && python manage.py runserver
              </code>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">2. Test Connection</h3>
              <p className="text-sm text-muted-foreground">
                Click the "Test Connection" button above to verify the frontend can communicate with the backend.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">3. Expected Results</h3>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Documents API should return a list (even if empty)</li>
                <li>Analytics API should return basic statistics</li>
                <li>No connection errors should occur</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
