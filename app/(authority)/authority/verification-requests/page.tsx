"use client"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils/dateFormatter"
import { toast } from "sonner"
import { mockVerificationRequests } from "@/lib/mock-data/verifications"

export default function VerificationRequestsPage() {
  const { user } = useUser()
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [comments, setComments] = useState("")
  const [requests, setRequests] = useState(mockVerificationRequests)

  const handleApprove = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: "approved" as const, reviewedDate: new Date().toISOString() } : r,
      ),
    )
    toast.success("Request approved successfully")
    setSelectedRequest(null)
    setComments("")
  }

  const handleReject = (requestId: string) => {
    if (!comments.trim()) {
      toast.error("Please provide a reason for rejection")
      return
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: "rejected" as const, reviewedDate: new Date().toISOString(), comments }
          : r,
      ),
    )
    toast.success("Request rejected")
    setSelectedRequest(null)
    setComments("")
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const approvedRequests = requests.filter((r) => r.status === "approved")
  const rejectedRequests = requests.filter((r) => r.status === "rejected")

  const RequestCard = ({ request }: { request: any }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-sm">{request.citizenName}</h4>
          <Badge
            variant="outline"
            className={
              request.priority === "high"
                ? "border-red-600 text-red-600"
                : request.priority === "medium"
                  ? "border-orange-600 text-orange-600"
                  : "border-blue-600 text-blue-600"
            }
          >
            {request.priority}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground capitalize">
          {request.documentType.replace("_", " ")} • Submitted {formatDate(request.submittedDate)}
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" onClick={() => setSelectedRequest(request)}>
            Review
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Verification Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Citizen Name</Label>
                <p className="font-medium">{request.citizenName}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Document Type</Label>
                <p className="font-medium capitalize">{request.documentType.replace("_", " ")}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Request ID</Label>
                <p className="font-mono text-sm">{request.id}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Submission Date</Label>
                <p className="text-sm">{formatDate(request.submittedDate)}</p>
              </div>
            </div>

            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Document Preview</p>
            </div>

            <div>
              <Label htmlFor="comments">Comments / Reason</Label>
              <Textarea
                id="comments"
                placeholder="Add any notes or reasons for your decision..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => handleApprove(request.id)}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleReject(request.id)}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verification Requests</h1>
        <p className="text-muted-foreground mt-1">Review and process document verification requests</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            <Clock className="mr-2 h-4 w-4" />
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Approved ({approvedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            <XCircle className="mr-2 h-4 w-4" />
            Rejected ({rejectedRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No pending requests</div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {approvedRequests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No approved requests</div>
              ) : (
                <div className="space-y-3">
                  {approvedRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-sm">{request.citizenName}</h4>
                        <p className="text-xs text-muted-foreground capitalize">
                          {request.documentType.replace("_", " ")} • Approved {formatDate(request.reviewedDate!)}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                        Approved
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {rejectedRequests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No rejected requests</div>
              ) : (
                <div className="space-y-3">
                  {rejectedRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-sm">{request.citizenName}</h4>
                        <p className="text-xs text-muted-foreground capitalize">
                          {request.documentType.replace("_", " ")} • Rejected {formatDate(request.reviewedDate!)}
                        </p>
                        {request.comments && (
                          <p className="text-xs text-muted-foreground mt-1">Reason: {request.comments}</p>
                        )}
                      </div>
                      <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">Rejected</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
