"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const spots = [
  {
    id: 1,
    name: "アートギャラリー",
    tricks: ["HeelFlip", "KickFlip"],
  },
  {
    id: 2,
    name: "ベンチ",
    tricks: ["PopShuvit", "Ollie"],
  },
]

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
        {spots.map((spot) => (
          <TableRow key={spot.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>{spot.name}</TableCell>
            <TableCell>{spot.tricks.join(", ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
