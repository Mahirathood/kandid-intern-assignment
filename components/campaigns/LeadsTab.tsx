

// components/campaigns/LeadsTab.tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function LeadsTab({ leads }: { leads: any[] }) {
  if (!leads) {
    return (
      <div className="p-4">
        <p>No leads</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-4 text-center text-sm text-muted-foreground">
                  No leads for this campaign.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>{l.name}</TableCell>
                  <TableCell>{l.email}</TableCell>
                  <TableCell>{l.company}</TableCell>
                  <TableCell>{l.status}</TableCell>
                  <TableCell>{l.lastContact}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
