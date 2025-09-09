
// // app/campaigns/[id]/page.tsx
// "use client"

// import { useParams } from "next/navigation"
// import CampaignDetailsClient from "@/components/campaigns/CampaignDetailsClient"

// export default function CampaignPage() {
//   const params = useParams()
//   const id = params?.id as string

//   if (!id) return <div>No campaign ID provided</div>

//   return <CampaignDetailsClient campaignId={id} />
// }