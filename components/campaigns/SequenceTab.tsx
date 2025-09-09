

// components/campaigns/SequenceTab.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SequenceTab({ campaignId }: { campaignId: string }) {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Message Sequence</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Edit your outreach sequence (campaign {campaignId}).</p>
          <div className="mt-4 flex gap-2">
            <Button>Preview</Button>
            <Button variant="outline">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
