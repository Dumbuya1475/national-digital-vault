"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-destructive">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="h-20 w-20 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something went wrong!</h1>
          <p className="text-muted-foreground mb-6">An unexpected error occurred. Please try again.</p>
          {error.message && (
            <p className="text-sm text-muted-foreground mb-6 p-4 bg-muted rounded-lg font-mono text-left">
              {error.message}
            </p>
          )}
          <div className="flex gap-2">
            <Button onClick={() => reset()} className="flex-1">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")} className="flex-1">
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
