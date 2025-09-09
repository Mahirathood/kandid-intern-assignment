

// ---------------------------------------------------------

"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const campaigns = [
  { id: "1", name: "Spring Sale", status: "Active", totalLeads: 200, successfulLeads: 80, createdAt: "2025-09-07" },
  { id: "2", name: "Winter Promo", status: "Paused", totalLeads: 150, successfulLeads: 45, createdAt: "2025-09-09" },
  { id: "3", name: "Summer Blast", status: "Completed", totalLeads: 300, successfulLeads: 210, createdAt: "2025-09-08" },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Active": return "bg-green-500"
    case "Paused": return "bg-yellow-500"
    case "Completed": return "bg-gray-500"
    case "Draft": return "bg-blue-500"
    default: return "bg-gray-300"
  }
}

export default function CampaignsPage() {
  const [filter, setFilter] = useState("All")
  const router = useRouter()

  const filteredCampaigns = useMemo(() => {
    if (filter === "All") return campaigns
    return campaigns.filter(c => c.status === filter)
  }, [filter])

  const totalLeads = campaigns.reduce((acc, c) => acc + c.totalLeads, 0)
  const totalSuccessful = campaigns.reduce((acc, c) => acc + c.successfulLeads, 0)
  const successRate = totalLeads > 0 ? Math.round((totalSuccessful / totalLeads) * 100) : 0

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Campaigns</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <h2 className="text-sm text-muted-foreground">Total Campaigns</h2>
          <p className="text-2xl font-bold">{campaigns.length}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h2 className="text-sm text-muted-foreground">Total Leads</h2>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h2 className="text-sm text-muted-foreground">Success Rate</h2>
          <p className="text-2xl font-bold">{successRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["All", "Active", "Paused", "Completed", "Draft"].map(s => (
          <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)}>
            {s}
          </Button>
        ))}
      </div>

      {/* Campaigns Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Leads</TableHead>
            <TableHead>Successful Leads</TableHead>
            <TableHead>Response Rate</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCampaigns.map(c => {
            const responseRate = c.totalLeads > 0 ? Math.round((c.successfulLeads / c.totalLeads) * 100) : 0
            return (
              <TableRow
                key={c.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => router.push(`/campaigns/${c.id}`)} // 👈 navigate
              >
                <TableCell>{c.name}</TableCell>
                <TableCell><Badge className={getStatusColor(c.status)}>{c.status}</Badge></TableCell>
                <TableCell>{c.totalLeads}</TableCell>
                <TableCell>{c.successfulLeads}</TableCell>
                <TableCell>{responseRate}%</TableCell>
                <TableCell className="w-[200px]"><Progress value={responseRate} /></TableCell>
                <TableCell>{c.createdAt}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
