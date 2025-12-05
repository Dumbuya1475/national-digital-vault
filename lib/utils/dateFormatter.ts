import { format, formatDistanceToNow, isBefore, addHours, addDays } from "date-fns"

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), "MMM dd, yyyy")
}

export const formatDateTime = (dateString: string): string => {
  return format(new Date(dateString), "MMM dd, yyyy HH:mm")
}

export const formatTimeAgo = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}

export const isExpired = (dateString: string): boolean => {
  return isBefore(new Date(dateString), new Date())
}

export const calculateExpiryDate = (duration: string, fromDate: Date = new Date()): string => {
  switch (duration) {
    case "1h":
      return addHours(fromDate, 1).toISOString()
    case "24h":
      return addHours(fromDate, 24).toISOString()
    case "7d":
      return addDays(fromDate, 7).toISOString()
    default:
      return addDays(fromDate, 7).toISOString()
  }
}

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
}
