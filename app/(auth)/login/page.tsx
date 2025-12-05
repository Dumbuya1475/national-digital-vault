"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUser } from "@/lib/user-context"
import { mockUsers } from "@/lib/mock-data/users"
import { loginSchema, type LoginInput, otpSchema, type OTPInput } from "@/lib/schemas/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Fingerprint, Mail, Lock, Shield } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const { setCurrentUser } = useUser()
  const [showOTP, setShowOTP] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState("")

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const otpForm = useForm<OTPInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const handleLogin = async (values: LoginInput) => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find user by email
    const user = mockUsers.find((u) => u.email === values.email)

    if (user) {
      setSelectedEmail(values.email)
      // Simulate 2FA requirement
      if (user.twoFactorEnabled) {
        setShowOTP(true)
        toast.info("Enter OTP to continue")
      } else {
        setCurrentUser(user)
        toast.success("Login successful!")
        const roleRoutes = {
          citizen: "/citizen/dashboard",
          authority: "/authority/dashboard",
          verifier: "/verifier/dashboard",
          admin: "/admin/dashboard",
        }
        router.push(roleRoutes[user.role])
      }
    } else {
      toast.error("Invalid email or password")
    }

    setLoading(false)
  }

  const handleOTPVerify = async (values: OTPInput) => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Accept any 6-digit OTP for testing
    if (values.otp.length === 6) {
      const user = mockUsers.find((u) => u.email === selectedEmail)
      if (user) {
        setCurrentUser(user)
        toast.success("OTP verified!")
        const roleRoutes = {
          citizen: "/citizen/dashboard",
          authority: "/authority/dashboard",
          verifier: "/verifier/dashboard",
          admin: "/admin/dashboard",
        }
        router.push(roleRoutes[user.role])
      }
    } else {
      toast.error("Invalid OTP")
    }

    setLoading(false)
  }

  const handleBiometricLogin = () => {
    const user = mockUsers[0] // Default to first citizen
    setCurrentUser(user)
    toast.success("Biometric authentication successful!")
    router.push("/citizen/dashboard")
  }

  if (showOTP) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-950 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Enter the 6-digit code from your authenticator app</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOTPVerify)} className="space-y-4">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          maxLength={6}
                          className="text-center text-2xl tracking-widest"
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        For testing, use any 6 digits: <span className="font-mono font-bold">123456</span>
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>

                <div className="text-center">
                  <Button variant="link" size="sm" type="button" onClick={() => setShowOTP(false)}>
                    Back to Login
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl">National Document Vault</CardTitle>
          <CardDescription>Secure access to your official documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="your.email@example.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={loginForm.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="remember" />
                      </FormControl>
                      <Label htmlFor="remember" className="text-sm cursor-pointer !mt-0">
                        Remember me
                      </Label>
                    </FormItem>
                  )}
                />
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-3">
                <p className="text-xs font-semibold mb-2">Test Credentials:</p>
                <div className="space-y-1 text-xs font-mono">
                  <p>Citizen: john.citizen@email.com / Citizen123!</p>
                  <p>Authority: admin@university.edu / Authority123!</p>
                  <p>Verifier: verifier@bank.com / Verifier123!</p>
                  <p>Admin: admin@vault.gov / Admin123!</p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleBiometricLogin}>
                <Fingerprint className="mr-2 h-4 w-4" />
                Biometric Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Register now
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
