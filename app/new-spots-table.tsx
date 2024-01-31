"use client"

import { siteConfig } from "@/config/site"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function NewSpotsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Spots</TableHead>
          <TableHead>Selected Tricks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {siteConfig.dummySpots.map((spot) => (
          <TableRow key={spot.id}>
            <TableCell>{spot.title}</TableCell>
            <TableCell>{spot.tricks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
