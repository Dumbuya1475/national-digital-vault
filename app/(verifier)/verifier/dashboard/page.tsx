"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShieldCheck, Clock, TrendingUp, CheckCircle2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function VerifierDashboardPage() {
  const router = useRouter()
  const [quickVerifyId, setQuickVerifyId] = useState("")

  const stats = {
    today: 12,
    total: 487,
    successRate: 98.5,
    avgTime: "45s",
  }

  const recentVerifications = [
    {
      id: "VER-001",
      documentType: "Degree",
      ownerName: "John Citizen",
      result: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "VER-002",
      documentType: "Birth Certificate",
      ownerName: "Sarah Williams",
      result: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "VER-003",
      documentType: "Property Deed",
      ownerName: "Michael Brown",
      result: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
    },
    {
      id: "VER-004",
      documentType: "Transcript",
      ownerName: "Emily Johnson",
      result: "invalid",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: "VER-005",
      documentType: "Tax Clearance",
      ownerName: "David Miller",
      result: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
    },
  ]

  const handleQuickVerify = () => {
    if (quickVerifyId.trim()) {
      router.push(`/verifier/verify-document?id=${quickVerifyId}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verifier Dashboard</h1>
        <p className="text-muted-foreground mt-1">Quick document verification and history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today</p>
                <p className="text-2xl font-bold mt-1">{stats.today}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Verifications</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold mt-1">{stats.successRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Time</p>
                <p className="text-2xl font-bold mt-1">{stats.avgTime}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Verify Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Verify</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Document ID or paste verification link..."
              value={quickVerifyId}
              onChange={(e) => setQuickVerifyId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleQuickVerify()}
              className="flex-1"
            />
            <Button onClick={handleQuickVerify}>
              <Search className="mr-2 h-4 w-4" />
              Verify
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Or use the full verification page for QR code scanning</p>
        </CardContent>
      </Card>

      {/* Recent Verifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVerifications.map((verification) => (
              <div
                key={verification.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      verification.result === "verified" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 ${verification.result === "verified" ? "text-green-600" : "text-red-600"}`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{verification.documentType}</p>
                    <p className="text-sm text-muted-foreground">{verification.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={verification.result === "verified" ? "default" : "destructive"}>
                      {verification.result}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(verification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => router.push("/verifier/history")}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
