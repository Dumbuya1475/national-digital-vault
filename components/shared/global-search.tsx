"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Building2, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface GlobalSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const recentSearches = ["Birth Certificate", "Property Deed", "Tax Documents"]

  const searchResults = query
    ? [
        {
          type: "document",
          title: "Bachelor of Science Degree",
          subtitle: "National University - DOC-2024-001",
          icon: FileText,
        },
        {
          type: "document",
          title: "Birth Certificate",
          subtitle: "Ministry of Home Affairs - DOC-2024-002",
          icon: FileText,
        },
        {
          type: "authority",
          title: "National University",
          subtitle: "Education Authority",
          icon: Building2,
        },
      ]
    : []

  const handleResultClick = (result: any) => {
    if (result.type === "document") {
      router.push("/citizen/documents")
    } else if (result.type === "authority") {
      router.push("/admin/authorities")
    }
    onOpenChange(false)
    setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents, users, authorities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {query ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <result.icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{result.title}</p>
                      <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                    </div>
                    <Badge variant="outline">{result.type}</Badge>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No results found for "{query}"</div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Recent Searches</p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
