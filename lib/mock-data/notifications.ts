import type { Notification } from "@/types/notification"

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "success",
    title: "Document Verified",
    message: "Your Birth Certificate has been successfully verified and added to your vault.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "info",
    title: "Share Link Accessed",
    message: "Your Property Deed document was accessed by Bank of America via share link.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: "notif-3",
    userId: "user-1",
    type: "warning",
    title: "Document Expiring Soon",
    message: "Your Passport will expire in 30 days. Consider renewing it.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: false,
  },
  {
    id: "notif-4",
    userId: "user-1",
    type: "success",
    title: "Share Link Created",
    message: "Share link created successfully for Driver's License. Valid for 24 hours.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    read: true,
  },
  {
    id: "notif-5",
    userId: "user-1",
    type: "info",
    title: "New Document Issued",
    message: "A new Tax Clearance Certificate has been issued by Revenue Authority.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    read: true,
  },
  {
    id: "notif-6",
    userId: "user-2",
    type: "success",
    title: "Verification Request Approved",
    message: "Your verification request for John Citizen's degree has been approved.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    read: false,
  },
  {
    id: "notif-7",
    userId: "user-3",
    type: "info",
    title: "Document Verified Successfully",
    message: "The property deed for 123 Main St has been verified and matches blockchain records.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    read: false,
  },
  {
    id: "notif-8",
    userId: "user-4",
    type: "warning",
    title: "System Maintenance Scheduled",
    message: "System maintenance is scheduled for tonight at 2:00 AM. Expected downtime: 2 hours.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    read: true,
  },
]
