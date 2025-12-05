"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  QrCode,
  Link2,
  FileSearch,
  Download,
  CheckCircle2,
  Shield,
} from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

export default function VerifyDocumentPage() {
  const [verificationMethod, setVerificationMethod] = useState<"id" | "qr" | "link">("id")
  const [documentId, setDocumentId] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock verification result
    const result = {
      status: "verified", // or 'invalid', 'expired', 'revoked'
      document: {
        id: "DOC-2024-001",
        type: "Degree",
        name: "Bachelor of Science in Computer Science",
        ownerName: "John Citizen",
        documentNumber: "DEG-2020-12345",
        issuingAuthority: {
          name: "National University",
          logo: "/university-logo.jpg",
        },
        issueDate: "2020-06-15",
        blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        blockchainVerified: true,
        lastVerifiedDate: new Date().toISOString(),
      },
      warnings: [] as string[],
      verificationId: "VER-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: new Date().toISOString(),
    }

    setVerificationResult(result)
    setIsVerifying(false)
  }

  const downloadReceipt = () => {
    // Simulate receipt download
    alert("Verification receipt downloaded")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-50 border-green-200"
      case "invalid":
        return "text-red-600 bg-red-50 border-red-200"
      case "expired":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "revoked":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-16 w-16 text-green-600" />
      case "invalid":
        return <XCircle className="h-16 w-16 text-red-600" />
      case "expired":
        return <AlertTriangle className="h-16 w-16 text-orange-600" />
      case "revoked":
        return <XCircle className="h-16 w-16 text-red-600" />
      default:
        return <FileSearch className="h-16 w-16 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Verify Document</h1>
        <p className="text-muted-foreground mt-1">Verify the authenticity of a document</p>
      </div>

      {!verificationResult ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Verification Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={verificationMethod} onValueChange={(v) => setVerificationMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="id">
                  <FileSearch className="mr-2 h-4 w-4" />
                  Document ID
                </TabsTrigger>
                <TabsTrigger value="qr">
                  <QrCode className="mr-2 h-4 w-4" />
                  QR Code
                </TabsTrigger>
                <TabsTrigger value="link">
                  <Link2 className="mr-2 h-4 w-4" />
                  Share Link
                </TabsTrigger>
              </TabsList>

              <TabsContent value="id" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="documentId">Document ID</Label>
                  <Input
                    id="documentId"
                    placeholder="Enter document ID (e.g., DOC-2024-001)"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessCode">Access Code (if required)</Label>
                  <Input
                    id="accessCode"
                    type="password"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4 mt-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">Scan QR code from shared document</p>
                  <Button variant="outline">Upload QR Code Image</Button>
                </div>
              </TabsContent>

              <TabsContent value="link" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="shareLink">Verification Link</Label>
                  <Input id="shareLink" placeholder="Paste the shared verification link" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkAccessCode">Access Code (if required)</Label>
                  <Input id="linkAccessCode" type="password" placeholder="Enter access code" />
                </div>
              </TabsContent>
            </Tabs>

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={handleVerify}
              disabled={isVerifying || (verificationMethod === "id" && !documentId)}
            >
              {isVerifying ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Verify Document
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Verification Result */}
          <Card className={`border-2 ${getStatusColor(verificationResult.status)}`}>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                {getStatusIcon(verificationResult.status)}
                <div>
                  <h2 className="text-2xl font-bold capitalize">{verificationResult.status}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verification completed at {format(new Date(verificationResult.timestamp), "PPpp")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Details */}
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Document Type</Label>
                  <p className="font-medium">{verificationResult.document.type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Document Number</Label>
                  <p className="font-medium font-mono">{verificationResult.document.documentNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Owner Name</Label>
                  <p className="font-medium">{verificationResult.document.ownerName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Issue Date</Label>
                  <p className="font-medium">{format(new Date(verificationResult.document.issueDate), "PPP")}</p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-muted-foreground">Issuing Authority</Label>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={verificationResult.document.issuingAuthority.logo || "/placeholder.svg"}
                    alt={verificationResult.document.issuingAuthority.name}
                    className="h-10 w-10 rounded"
                  />
                  <p className="font-medium">{verificationResult.document.issuingAuthority.name}</p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-muted-foreground">Document Name</Label>
                <p className="font-medium">{verificationResult.document.name}</p>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Blockchain Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Blockchain Status</p>
                  <p className="text-sm text-muted-foreground">Document recorded on blockchain</p>
                </div>
                <Badge variant={verificationResult.document.blockchainVerified ? "default" : "secondary"}>
                  {verificationResult.document.blockchainVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>

              <div>
                <Label className="text-muted-foreground">Blockchain Hash</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                    {verificationResult.document.blockchainHash}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(verificationResult.document.blockchainHash)}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Last Verified</Label>
                <p className="font-medium">{format(new Date(verificationResult.document.lastVerifiedDate), "PPpp")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Warnings */}
          {verificationResult.warnings.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <AlertTriangle className="h-5 w-5" />
                  Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {verificationResult.warnings.map((warning: string, index: number) => (
                    <li key={index} className="text-sm text-amber-900">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1" onClick={downloadReceipt}>
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setVerificationResult(null)}>
              Verify Another
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
