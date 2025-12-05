"use client"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockApplications } from "@/lib/mock-data/applications"
import { mockOrganizations } from "@/lib/mock-data/organizations"
import { FileText, Search, Clock, CheckCircle2, XCircle, AlertCircle, Download, Eye } from "lucide-react"
import { toast } from "sonner"

export default function AuthorityApplicationsPage() {
  const { currentUser } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  // Get current user's organization
  const userOrg = mockOrganizations.find((org) => org.id === currentUser?.organizationId)

  // Filter applications for this organization
  const orgApplications = mockApplications.filter(
    (app) => app.issuingOrganization === userOrg?.name || app.issuingOrganization === userOrg?.id,
  )

  // Filter by status
  const pendingApplications = orgApplications.filter((app) => app.status === "pending")
  const approvedApplications = orgApplications.filter((app) => app.status === "approved")
  const rejectedApplications = orgApplications.filter((app) => app.status === "rejected")
  const inReviewApplications = orgApplications.filter((app) => app.status === "in_review")

  // Search filter
  const filteredApplications = (applications: any[]) => {
    if (!searchQuery) return applications
    return applications.filter(
      (app) =>
        app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.documentType.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const handleApprove = (applicationId: string) => {
    toast.success("Application approved successfully")
    console.log("[v0] Approved application:", applicationId)
  }

  const handleReject = (applicationId: string) => {
    toast.error("Application rejected")
    console.log("[v0] Rejected application:", applicationId)
  }

  const handleRequestMoreInfo = (applicationId: string) => {
    toast.info("More information requested from applicant")
    console.log("[v0] Requested more info for:", applicationId)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any; color: string }> = {
      pending: {
        variant: "outline",
        icon: Clock,
        color: "border-yellow-600 text-yellow-600",
      },
      in_review: {
        variant: "outline",
        icon: AlertCircle,
        color: "border-blue-600 text-blue-600",
      },
      approved: {
        variant: "outline",
        icon: CheckCircle2,
        color: "border-green-600 text-green-600",
      },
      rejected: {
        variant: "outline",
        icon: XCircle,
        color: "border-red-600 text-red-600",
      },
    }

    const config = variants[status] || variants.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace("_", " ")}
      </Badge>
    )
  }

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-base">{application.applicantName}</h3>
            <p className="text-sm text-muted-foreground">{application.applicantId}</p>
          </div>
          {getStatusBadge(application.status)}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="capitalize">{application.documentType.replace(/_/g, " ")}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Reason:</strong> {application.reason}
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Submitted:</strong> {new Date(application.submittedDate).toLocaleDateString()}
          </div>
          {application.supportingDocuments && application.supportingDocuments.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <strong>Documents:</strong> {application.supportingDocuments.length} attached
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" onClick={() => setSelectedApplication(application)}>
                <Eye className="w-3 h-3 mr-1" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Applicant Name</Label>
                    <p className="text-sm mt-1">{application.applicantName}</p>
                  </div>
                  <div>
                    <Label>National ID</Label>
                    <p className="text-sm mt-1">{application.applicantId}</p>
                  </div>
                  <div>
                    <Label>Document Type</Label>
                    <p className="text-sm mt-1 capitalize">{application.documentType.replace(/_/g, " ")}</p>
                  </div>
                  <div>
                    <Label>Reason</Label>
                    <p className="text-sm mt-1">{application.reason}</p>
                  </div>
                  <div>
                    <Label>Submitted Date</Label>
                    <p className="text-sm mt-1">{new Date(application.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">{getStatusBadge(application.status)}</div>
                  </div>
                </div>

                {application.additionalInfo && (
                  <div>
                    <Label>Additional Information</Label>
                    <p className="text-sm mt-1">{application.additionalInfo}</p>
                  </div>
                )}

                {application.supportingDocuments && application.supportingDocuments.length > 0 && (
                  <div>
                    <Label>Supporting Documents</Label>
                    <div className="space-y-2 mt-2">
                      {application.supportingDocuments.map((doc: string, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{doc}</span>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {application.status === "pending" && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleApprove(application.id)} className="flex-1">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleRequestMoreInfo(application.id)}
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Request Info
                    </Button>
                    <Button onClick={() => handleReject(application.id)} variant="destructive" className="flex-1">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {application.status === "pending" && (
            <>
              <Button size="sm" onClick={() => handleApprove(application.id)}>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleReject(application.id)}>
                <XCircle className="w-3 h-3 mr-1" />
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Document Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and process document applications for {userOrg?.name || "your organization"}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inReviewApplications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedApplications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedApplications.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or document type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
          <TabsTrigger value="in_review">In Review ({inReviewApplications.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
          <TabsTrigger value="all">All ({orgApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {filteredApplications(pendingApplications).map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
          {filteredApplications(pendingApplications).length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">No pending applications found</CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="in_review" className="space-y-4">
          {filteredApplications(inReviewApplications).map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
          {filteredApplications(inReviewApplications).length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">No applications in review</CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filteredApplications(approvedApplications).map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
          {filteredApplications(approvedApplications).length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No approved applications found
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {filteredApplications(rejectedApplications).map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
          {filteredApplications(rejectedApplications).length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No rejected applications found
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {filteredApplications(orgApplications).map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
