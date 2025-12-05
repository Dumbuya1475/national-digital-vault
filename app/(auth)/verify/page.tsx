"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import toast from "react-hot-toast"

export default function VerifyPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(120) // 2 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerify = () => {
    if (otp === "123456") {
      toast.success("Email verified successfully!")
      router.push("/login")
    } else {
      toast.error("Invalid verification code")
    }
  }

  const handleResend = () => {
    setTimer(120)
    toast.success("Verification code resent!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>We've sent a 6-digit code to your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="text-center text-2xl tracking-widest"
              maxLength={6}
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              For testing, use: <span className="font-mono font-bold">123456</span>
            </p>
          </div>

          <Button className="w-full" onClick={handleVerify} disabled={otp.length !== 6}>
            Verify Email
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Code expires in: <span className="font-mono font-bold">{formatTime(timer)}</span>
            </p>
            <Button variant="link" size="sm" onClick={handleResend} disabled={timer > 0}>
              Resend Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
