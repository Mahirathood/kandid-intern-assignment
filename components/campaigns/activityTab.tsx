

export default function ActivityTab({ campaign }: { campaign: any }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Activity</h2>
      <p>No activity logged yet for {campaign.name}</p>
    </div>
  )
}
