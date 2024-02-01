"use client"

import { siteConfig } from "@/config/site"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function SpotsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]" />
          <TableHead>Spots</TableHead>
          <TableHead>Selected Tricks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {siteConfig.dummySpots.map((spot) => (
          <TableRow key={spot.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>{spot.title}</TableCell>
            <TableCell>{spot.tricks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
