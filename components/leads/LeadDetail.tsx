"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUIStore } from "@/lib/zustand-store";

export default function LeadDetail() {
  const { selectedLeadId, isLeadSheetOpen, closeLeadSheet } = useUIStore();

  if (!selectedLeadId) return null;

  return (
    <Sheet open={isLeadSheetOpen} onOpenChange={closeLeadSheet}>
      <SheetContent className="w-[500px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Lead Details</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <p>Showing details for lead: {selectedLeadId}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
