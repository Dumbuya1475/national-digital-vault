"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, FileCheck, Lock, Zap, Users, Globe, Apple, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Every document is secured with blockchain technology for tamper-proof verification",
    },
    {
      icon: FileCheck,
      title: "Official Documents",
      description: "Store birth certificates, degrees, property deeds, and more in one secure place",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Bank-level encryption and multi-factor authentication protect your sensitive documents",
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Share and verify documents instantly with authorized parties",
    },
    {
      icon: Users,
      title: "Trusted Authorities",
      description: "Documents issued by verified government and institutional authorities",
    },
    {
      icon: Globe,
      title: "Accessible Anywhere",
      description: "Access your documents securely from anywhere, anytime",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Digital Vault</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Secured by Blockchain Technology
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Your Official Documents,
            <br />
            <span className="text-primary">Securely Stored Forever</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            The National Digital Document Vault provides secure, blockchain-verified storage for all your important
            documents in one trusted location.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Create Your Vault
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-3 mt-6">
            <p className="text-sm text-muted-foreground font-medium">Download our mobile app</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button variant="outline" size="lg" className="gap-2 px-6 bg-transparent">
                <Apple className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-6 bg-transparent">
                <Smartphone className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Intuitive Dashboard Experience</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Manage all your documents with an elegant, user-friendly interface designed for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Citizen Dashboard Preview */}
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Citizen Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">View and manage your documents</p>
                </div>
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                  <Image
                    src="/modern-dashboard-with-document-cards--stats-widget.jpg"
                    alt="Citizen Dashboard Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Authority Dashboard Preview */}
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    Authority Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Issue and verify documents</p>
                </div>
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                  <Image
                    src="/professional-authority-dashboard-with-analytics-ch.jpg"
                    alt="Authority Dashboard Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Management Preview */}
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/30 p-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-violet-600" />
                  Document Management
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Secure storage with blockchain verification and instant sharing
                </p>
              </div>
              <div className="relative aspect-[21/9] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                <Image
                  src="/document-grid-view-showing-various-official-docume.jpg"
                  alt="Document Management Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Digital Vault?</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              A modern, secure platform trusted by citizens and institutions nationwide
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
              <p className="text-muted-foreground">Register with your national ID and complete secure verification</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
              <p className="text-muted-foreground">
                Upload your official documents or receive them directly from authorities
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Securely</h3>
              <p className="text-muted-foreground">
                Share verified documents with employers, institutions, or anyone who needs them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary">
            <CardContent className="pt-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Documents?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of citizens who trust Digital Vault with their important documents
              </p>
              <div className="flex flex-col items-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8">
                    Get Started for Free
                  </Button>
                </Link>
                <div className="pt-4 border-t w-full max-w-md">
                  <p className="text-sm text-muted-foreground mb-3">Or download our mobile app</p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Apple className="h-4 w-4" />
                      <span className="text-sm">App Store</span>
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm">Google Play</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-bold">Digital Vault</span>
              </div>
              <p className="text-sm text-muted-foreground">
                National Digital Document Vault - Securing your documents with blockchain technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-foreground">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 National Digital Document Vault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
