

// components/campaigns/CampaignDetailsClient.tsx
"use client"

import { useEffect, useState } from "react"
import OverviewTab from "./overviewTab"
import LeadsTab from "./LeadsTab"
import SequenceTab from "./SequenceTab"
import SettingsTab from "./SettingsTab"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type Campaign = {
  id: string
  name: string
  status: "Active" | "Paused" | "Completed" | "Draft"
  totalLeads: number
  successfulLeads: number
  createdAt: string
}
type Lead = {
  id: string
  name: string
  email: string
  company: string
  campaignId: string
  status: "Pending" | "Contacted" | "Responded" | "Converted"
  lastContact: string
}

export default function CampaignDetailsClient({ campaignId }: { campaignId: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"overview" | "leads" | "sequence" | "settings">("overview")
  const [leadFilter, setLeadFilter] = useState<"All" | Lead["status"] | "All">("All")
  const statusPills: Array<"All" | Lead["status"]> = ["All", "Pending", "Contacted", "Responded", "Converted"]

  // Mock data — replace with real API calls if you have them
  const campaignsMock: Campaign[] = [
    { id: "1", name: "Spring Sale", status: "Active", totalLeads: 200, successfulLeads: 80, createdAt: "2025-09-07" },
    { id: "2", name: "Winter Promo", status: "Paused", totalLeads: 150, successfulLeads: 45, createdAt: "2025-09-09" },
    { id: "3", name: "Summer Blast", status: "Completed", totalLeads: 300, successfulLeads: 210, createdAt: "2025-09-08" },
  ]

  const allMockLeads: Lead[] = [
    { id: "l1", name: "Alice Johnson", email: "alice@example.com", company: "TechCorp", campaignId: "1", status: "Pending", lastContact: "2025-09-07" },
    { id: "l2", name: "Bob Smith", email: "bob@example.com", company: "BizSoft", campaignId: "2", status: "Contacted", lastContact: "2025-09-09" },
    { id: "l3", name: "Charlie Davis", email: "charlie@example.com", company: "InnoWorks", campaignId: "3", status: "Converted", lastContact: "2025-09-08" },
    { id: "l4", name: "Dinesh Kumar", email: "dinesh@example.com", company: "Acme", campaignId: "1", status: "Responded", lastContact: "2025-09-10" },
    { id: "l5", name: "Emma Lee", email: "emma@example.com", company: "Bright", campaignId: "1", status: "Contacted", lastContact: "2025-09-11" },
  ]

  useEffect(() => {
    setLoading(true)
    // mimic fetch delay
    const t = setTimeout(() => {
      const found = campaignsMock.find((c) => c.id === campaignId) ?? null
      const filteredLeads = allMockLeads.filter((l) => l.campaignId === campaignId)

      setCampaign(found)
      setLeads(filteredLeads)
      setLoading(false)
    }, 250)

    return () => clearTimeout(t)
  }, [campaignId])

  // guard rendering while loading / missing
  if (loading) return <div className="p-6">Loading campaign...</div>
  if (!campaign) return <div className="p-6">Campaign not found.</div>

  // badge color helper
  function statusClass(s: Campaign["status"]) {
    if (s === "Active") return "bg-green-600 text-white"
    if (s === "Paused") return "bg-yellow-500 text-black"
    if (s === "Completed") return "bg-gray-500 text-white"
    if (s === "Draft") return "bg-blue-600 text-white"
    return "bg-gray-300"
  }

  // filter leads according to selected filter (used by LeadsTab if you want)
  const filteredLeads =
    leadFilter === "All" ? leads : leads.filter((l) => l.status === (leadFilter as Lead["status"]))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaign Details</h1>
          <p className="text-muted-foreground mt-1">Manage and track your campaign performance</p>

          {/* small nav (Overview / Leads / Sequence / Settings) — we keep the tabs below, this is just for layout clarity */}
        </div>

        <div className="flex items-start gap-4">
          <Input placeholder="Search leads..." className="w-72" />
          <Badge className={statusClass(campaign.status)}>{campaign.status}</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Show the lead-status pills only on Overview (your requirement) */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {statusPills.map((s) => (
                <button
                  key={s}
                  onClick={() => setLeadFilter(s)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    leadFilter === s ? "bg-blue-600 text-white" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Pass campaign and filteredLeads to OverviewTab so Overview can show metrics */}
          <div className="mt-4">
            <OverviewTab campaign={campaign} />
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <LeadsTab leads={filteredLeads} />
        </TabsContent>

        <TabsContent value="sequence">
          <SequenceTab campaignId={campaign.id} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab campaign={campaign} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
