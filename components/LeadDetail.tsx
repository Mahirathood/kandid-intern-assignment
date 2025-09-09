
"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function LeadDetail({ lead, onClose }: any) {
  // Prevent crash when lead is null
  if (!lead) return null

  return (
    <Sheet open={!!lead} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Lead Details</SheetTitle>
          <SheetDescription>
            Comprehensive information about the selected lead.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2 mt-4">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Company:</strong> {lead.company}</p>
          <p><strong>Campaign:</strong> {lead.campaign}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Last Contact:</strong> {lead.lastContact}</p>
        </div>

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button>Update Status</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
