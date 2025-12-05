"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function CreateOrganizationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    address: "",
    logo: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.type || !formData.contactEmail) {
      toast.error("Please fill in all required fields")
      return
    }

    // Simulate organization creation
    toast.success(`Organization ${formData.name} created successfully`)
    router.push("/super-admin/organizations")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/super-admin/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Organization</h1>
          <p className="text-muted-foreground mt-1">Register a new organization/ministry/institution</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Information</CardTitle>
          <CardDescription>Fill in the details to register a new organization</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">
                  Organization Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ministry of Interior"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  Organization Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">Government Ministry</SelectItem>
                    <SelectItem value="education">Educational Institution</SelectItem>
                    <SelectItem value="healthcare">Healthcare Institution</SelectItem>
                    <SelectItem value="financial">Financial Institution</SelectItem>
                    <SelectItem value="legal">Legal Authority</SelectItem>
                    <SelectItem value="transport">Transport Authority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="contact@ministry.gov"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://ministry.gov.ng"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Government Street, Abuja"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the organization and its responsibilities..."
                  rows={4}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="logo">Organization Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
                  />
                </div>
                {formData.logo && <p className="text-sm text-muted-foreground">Selected: {formData.logo.name}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/super-admin/dashboard">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Create Organization</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
