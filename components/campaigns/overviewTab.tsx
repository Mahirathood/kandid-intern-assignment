
// components/campaigns/OverviewTab.tsx
import { Progress } from "@/components/ui/progress"

export default function OverviewTab({ campaign }: { campaign: any }) {
  if (!campaign) return null

  const responseRate =
    campaign.totalLeads > 0 ? Math.round((campaign.successfulLeads / campaign.totalLeads) * 100) : 0

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Overview</h2>

      <div className="mt-4 space-y-4">
        <div className="flex gap-6">
          <div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
            <div className="font-semibold">{campaign.totalLeads}</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Successful Leads</div>
            <div className="font-semibold">{campaign.successfulLeads}</div>
          </div>

          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Response Rate</div>
            <div className="mt-2">
              <Progress value={responseRate} />
              <div className="text-xs mt-1">{responseRate}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
