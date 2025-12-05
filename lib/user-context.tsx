"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { mockUsers } from "./mock-data/users"
import type { User } from "@/types/user"

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0])

  const logout = () => {
    setCurrentUser(null)
  }

  return <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
