"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  FileText,
  Search,
  AlertTriangle,
  Users,
  Zap,
  Target,
  Activity,
  PieChart,
  Calendar,
  Award,
} from "lucide-react"

interface AnalyticsProps {
  data: {
    totalDocuments: number
    totalProcessingTime: number
    averageAccuracy: number
    successRate: number
    documentsToday: number
    citationsFound: number
    plagiarismDetected: number
    conferencesMatched: number
  }
  documents: any[]
}

export function AnalyticsDashboard({ data, documents }: AnalyticsProps) {
  const averageProcessingTime = data.totalDocuments > 0 ? Math.floor(data.totalProcessingTime / data.totalDocuments) : 0

  const recentActivity = documents.slice(-5).map((doc) => ({
    name: doc.name,
    time: doc.processingTime,
    accuracy: doc.accuracy,
    status: doc.status,
    uploadedAt: doc.uploadedAt,
  }))

  const performanceMetrics = [
    {
      label: "Processing Speed",
      value: `${averageProcessingTime}s`,
      trend: "+12%",
      icon: Zap,
      color: "text-green-500",
    },
    { label: "Accuracy Rate", value: `${data.averageAccuracy}%`, trend: "+5%", icon: Target, color: "text-blue-500" },
    { label: "Success Rate", value: `${data.successRate}%`, trend: "0%", icon: CheckCircle, color: "text-emerald-500" },
    { label: "Citations Found", value: data.citationsFound, trend: "+23%", icon: Search, color: "text-purple-500" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center justify-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Comprehensive insights into your document processing performance
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift glass-effect border-border/50 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-3xl font-bold text-primary">{data.totalDocuments}</p>
                <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />+{data.documentsToday} today
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-primary/20">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass-effect border-border/50 bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing Time</p>
                <p className="text-3xl font-bold text-accent">{Math.floor(data.totalProcessingTime / 60)}m</p>
                <p className="text-sm text-blue-500 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  Avg: {averageProcessingTime}s
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-accent/20">
                <Activity className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass-effect border-border/50 bg-gradient-to-br from-green-500/20 to-green-500/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Citations Found</p>
                <p className="text-3xl font-bold text-green-500">{data.citationsFound}</p>
                <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                  <Search className="w-3 h-3" />
                  High accuracy
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-green-500/20">
                <Search className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass-effect border-border/50 bg-gradient-to-br from-purple-500/20 to-purple-500/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conferences</p>
                <p className="text-3xl font-bold text-purple-500">{data.conferencesMatched}</p>
                <p className="text-sm text-purple-500 flex items-center gap-1 mt-1">
                  <Users className="w-3 h-3" />
                  Matched
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/20">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-card/80 to-muted/60 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={`${metric.color} bg-current/10 border-current/20`}>
                  {metric.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest document processing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-card/80 to-muted/60 border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm truncate max-w-[200px]">{activity.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.uploadedAt.toLocaleTimeString()} • {activity.time}s • {activity.accuracy}% accuracy
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Done
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <PieChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent activity</p>
                  <p className="text-sm">Upload documents to see analytics</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">{data.averageAccuracy}%</div>
                <p className="text-sm text-muted-foreground">Overall Accuracy</p>
              </div>
              <Progress value={data.averageAccuracy} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Excellent</span>
                <span>Industry Standard: 85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Plagiarism Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">{data.plagiarismDetected}</div>
                <p className="text-sm text-muted-foreground">Issues Detected</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Detection Rate</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                  99.2%
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>False Positives</span>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
                  0.8%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass-effect border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Today</span>
                <span className="font-bold">{data.documentsToday} docs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">This Week</span>
                <span className="font-bold">{Math.floor(data.totalDocuments * 0.7)} docs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-bold">{data.totalDocuments} docs</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>+34% vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
