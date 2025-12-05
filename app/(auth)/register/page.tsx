"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, User, Upload, Fingerprint, Lock, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

type Step = 1 | 2 | 3 | 4

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useUser()

  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationalId: "",
    password: "",
    confirmPassword: "",
  })

  const progress = (currentStep / 4) * 100

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    // Simulate registration
    toast.success("Registration successful!")
    router.push("/verify")
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Register to access the National Document Vault</CardDescription>
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className={currentStep >= 1 ? "text-primary font-medium" : ""}>Basic Info</span>
              <span className={currentStep >= 2 ? "text-primary font-medium" : ""}>ID Verification</span>
              <span className={currentStep >= 3 ? "text-primary font-medium" : ""}>Biometric</span>
              <span className={currentStep >= 4 ? "text-primary font-medium" : ""}>Security</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Basic Information</h3>
              </div>

              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1-555-0100"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: ID Verification */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">ID Verification</h3>
              </div>

              <div>
                <Label htmlFor="nationalId">National ID Number *</Label>
                <Input
                  id="nationalId"
                  placeholder="NAT-2024-000000"
                  value={formData.nationalId}
                  onChange={(e) => updateFormData("nationalId", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload National ID</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or PDF (max. 10MB)</p>
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload Selfie</p>
                  <p className="text-xs text-muted-foreground">For identity verification</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Biometric Setup */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Fingerprint className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Biometric Setup</h3>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-6 text-center">
                <Fingerprint className="mx-auto h-20 w-20 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Fingerprint Recognition</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Place your finger on the sensor to register your fingerprint
                </p>
                <Button variant="outline">Scan Fingerprint (Simulated)</Button>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-6 text-center">
                <User className="mx-auto h-20 w-20 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Face Recognition</h4>
                <p className="text-sm text-muted-foreground mb-4">Look at the camera to register your face</p>
                <Button variant="outline">Scan Face (Simulated)</Button>
              </div>
            </div>
          )}

          {/* Step 4: Security Setup */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Security Setup</h3>
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  At least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  required
                />
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-green-900 dark:text-green-100">
                      Two-Factor Authentication Enabled
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      We'll send you a verification code via email for added security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep < 4 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Complete Registration</Button>
          )}
        </CardFooter>
        <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  )
}
