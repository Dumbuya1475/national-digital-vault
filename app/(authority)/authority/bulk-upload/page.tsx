"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any[]>([])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
        toast.success("File uploaded successfully")
      }
    },
  })

  const handleDownloadTemplate = () => {
    toast.success("Template download started")
  }

  const handleProcess = async () => {
    if (!file) return

    setProcessing(true)
    setProgress(0)

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessing(false)
          // Mock results
          setResults([
            { row: 1, name: "John Doe", status: "success", message: "Issued successfully" },
            { row: 2, name: "Jane Smith", status: "success", message: "Issued successfully" },
            { row: 3, name: "Bob Johnson", status: "error", message: "Invalid national ID" },
            { row: 4, name: "Alice Brown", status: "success", message: "Issued successfully" },
          ])
          toast.success("Bulk upload completed!")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bulk Document Upload</h1>
        <p className="text-muted-foreground mt-1">Upload multiple documents at once using CSV/Excel</p>
      </div>

      {/* Download Template */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Download Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div>
              <p className="font-medium text-sm">CSV Template</p>
              <p className="text-xs text-muted-foreground">Download the template with required columns</p>
            </div>
            <Button onClick={handleDownloadTemplate} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload File */}
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Upload File</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {file ? (
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium mb-1">
                  {isDragActive ? "Drop the file here" : "Drag & drop your CSV/Excel file"}
                </p>
                <p className="text-xs text-muted-foreground">or click to browse</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Process */}
      {file && !processing && results.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Process Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleProcess} className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Process Bulk Upload
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Processing Progress */}
      {processing && (
        <Card>
          <CardHeader>
            <CardTitle>Processing...</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2 text-center">{progress}% complete</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result) => (
                <div key={result.row} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {result.status === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        Row {result.row}: {result.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{result.message}</p>
                    </div>
                  </div>
                  <Badge variant={result.status === "success" ? "default" : "destructive"}>{result.status}</Badge>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                Download Error Report
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setFile(null)
                  setResults([])
                }}
              >
                Upload Another File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
