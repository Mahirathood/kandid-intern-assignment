
// components/campaigns/SettingsTab.tsx
"use client";

export default function SettingsTab({ campaign }: { campaign: any }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Settings</h2>
      <p className="text-sm text-muted-foreground">Edit settings for campaign: <strong>{campaign?.name}</strong></p>

      {/* Add any settings UI you need here */}
    </div>
  );
}

