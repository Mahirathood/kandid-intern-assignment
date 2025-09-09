

"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LeadDetail from "@/components/LeadDetail"

// Example mock leads data
const mockLeads = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    company: "TechCorp",
    campaign: "Spring Sale",
    status: "Pending",
    lastContact: "2025-09-07",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    company: "BizSoft",
    campaign: "Winter Promo",
    status: "Contacted",
    lastContact: "2025-09-09",
  },
  {
    name: "Charlie Davis",
    email: "charlie@example.com",
    company: "InnoWorks",
    campaign: "Summer Blast",
    status: "Converted",
    lastContact: "2025-09-08",
  },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedLead, setSelectedLead] = useState<any>(null)

  // Simulate API fetch
  useEffect(() => {
    setTimeout(() => {
      setLeads(mockLeads)
      setLoading(false)
    }, 1200) // fake delay
  }, [])

  // Search filter
  const filteredLeads = leads.filter((lead) =>
    [lead.name, lead.email, lead.company, lead.campaign]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-2xl font-bold">Leads</h1>

      {/* 🔍 Search bar */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400"
        />
        <Button
          variant="outline"
          className="border border-gray-600 text-gray-200 hover:bg-gray-700"
          onClick={() => setSearch("")}
        >
          Clear
        </Button>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-600 text-sm">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-600 text-left">Name</th>
              <th className="px-4 py-2 border border-gray-600 text-left">Email</th>
              <th className="px-4 py-2 border border-gray-600 text-left">Company</th>
              <th className="px-4 py-2 border border-gray-600 text-left">Campaign</th>
              <th className="px-4 py-2 border border-gray-600 text-left">Status</th>
              <th className="px-4 py-2 border border-gray-600 text-left">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Loading leads...
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-2 border border-gray-600">{lead.name}</td>
                  <td className="px-4 py-2 border border-gray-600">{lead.email}</td>
                  <td className="px-4 py-2 border border-gray-600">{lead.company}</td>
                  <td className="px-4 py-2 border border-gray-600">{lead.campaign}</td>
                  <td className="px-4 py-2 border border-gray-600">{lead.status}</td>
                  <td className="px-4 py-2 border border-gray-600">{lead.lastContact}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead detail side sheet */}
      <LeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  )
}
