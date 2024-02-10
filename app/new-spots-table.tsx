"use client"

import { useRouter } from "next/navigation"

import { Database } from "@/types/supabase"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = { spots: Database["public"]["Tables"]["spots"]["Row"][] }

export function NewSpotsTable({ spots }: Props) {
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
        {spots.map((spot) => (
          <TableRow
            key={spot.id}
            className="cursor-pointer"
            onClick={() => {
              router.push(`/spots/${spot.id}`)
            }}
          >
            <TableCell>{spot.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
