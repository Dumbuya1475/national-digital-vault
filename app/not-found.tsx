import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <FileQuestion className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">The page you are looking for does not exist or has been moved.</p>
          <Link href="/">
            <Button className="w-full">Return Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
