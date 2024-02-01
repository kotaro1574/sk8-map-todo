"use client"

import { useRouter } from "next/navigation"

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
  const router = useRouter()
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
          <TableRow
            key={spot.id}
            className="cursor-pointer"
            onClick={() => {
              router.push(`/spots/${spot.id}`)
            }}
          >
            <TableCell>{spot.title}</TableCell>
            <TableCell>{spot.tricks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
