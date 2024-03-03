"use client"

import Link from "next/link"
import { Session } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpotCard } from "@/components/spot-card"

type SpotWithImages = Database["public"]["Tables"]["spots"]["Row"] & {
  spot_images: Pick<
    Database["public"]["Tables"]["spot_images"]["Row"],
    "order" | "file_path"
  >[]
}

type Props = {
  spots: SpotWithImages[]
  session: Session | null
}

export function UserSpotsTabs({ spots, session }: Props) {
  return (
    <Tabs defaultValue="no-make">
      <TabsList>
        <TabsTrigger value="no-make">No make</TabsTrigger>
        <TabsTrigger value="make">Make</TabsTrigger>
      </TabsList>
      <TabsContent
        value="no-make"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {spots
          .filter((spot) => !spot.is_completed)
          .map((spot) => (
            <Link href={`/s/${spot.id}`} key={spot.id}>
              <SpotCard spot={spot} session={session} isTrick />
            </Link>
          ))}
      </TabsContent>
      <TabsContent
        value="make"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {spots
          .filter((spot) => spot.is_completed)
          .map((spot) => (
            <Link href={`/s/${spot.id}`} key={spot.id}>
              <SpotCard spot={spot} session={session} isTrick />
            </Link>
          ))}
      </TabsContent>
    </Tabs>
  )
}
