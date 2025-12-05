export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}

export const getDocumentIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    birth_certificate: "baby",
    national_id: "id-card",
    passport: "plane",
    drivers_license: "car",
    degree: "graduation-cap",
    transcript: "file-text",
    property_deed: "home",
    land_title: "map",
    marriage_certificate: "heart",
    tax_clearance: "receipt",
    business_license: "briefcase",
  }

  return iconMap[type] || "file"
}

export const getDocumentTypeLabel = (type: string): string => {
  const labelMap: Record<string, string> = {
    birth_certificate: "Birth Certificate",
    national_id: "National ID",
    passport: "Passport",
    drivers_license: "Driver's License",
    degree: "Degree",
    transcript: "Transcript",
    property_deed: "Property Deed",
    land_title: "Land Title",
    marriage_certificate: "Marriage Certificate",
    tax_clearance: "Tax Clearance",
    business_license: "Business License",
  }

  return labelMap[type] || type
}

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    verified: "text-green-600 bg-green-50 border-green-200",
    pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
    expired: "text-orange-600 bg-orange-50 border-orange-200",
    revoked: "text-red-600 bg-red-50 border-red-200",
  }

  return colorMap[status] || "text-gray-600 bg-gray-50 border-gray-200"
}

export const validateFileType = (file: File): boolean => {
  const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
  return validTypes.includes(file.type)
}

export const validateFileSize = (file: File, maxSizeMB = 10): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024
}
