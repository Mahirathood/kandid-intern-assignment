"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CampaignDetailProps {
  campaign: {
    name: string
    status: string
    totalLeads: number
    successfulLeads: number
    createdAt: string
  } | null
  open: boolean
  onClose: () => void
}

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-500"
    case "Paused":
      return "bg-yellow-500"
    case "Completed":
      return "bg-gray-500"
    case "Draft":
      return "bg-blue-500"
    default:
      return "bg-gray-300"
  }
}

export default function CampaignDetail({
  campaign,
  open,
  onClose,
}: CampaignDetailProps) {
  if (!campaign) return null

  const responseRate =
    campaign.totalLeads > 0
      ? Math.round((campaign.successfulLeads / campaign.totalLeads) * 100)
      : 0

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>{campaign.name}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <Badge className={getStatusColor(campaign.status)}>
              {campaign.status}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Leads:</span>
            <span>{campaign.totalLeads}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Successful Leads:</span>
            <span>{campaign.successfulLeads}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Response Rate:</span>
            <span>{responseRate}%</span>
          </div>
          <div>
            <span className="font-medium">Progress:</span>
            <Progress value={responseRate} className="mt-2" />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Created Date:</span>
            <span>{campaign.createdAt}</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
