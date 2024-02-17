"use client"

import Link from "next/link"
import { Session } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpotCompletedButton } from "@/components/spot-completed-button"
import { SpotImage } from "@/components/spot-image"

type Props = {
  spots: Database["public"]["Tables"]["spots"]["Row"][]
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
            <Card key={spot.id}>
              <CardContent className="p-4">
                <SpotImage filePath={spot.file_path} />
                <Link href={`/s/${spot.id}`} className="hover:underline">
                  <h2 className="mt-4 text-xl font-bold">{spot.name}</h2>
                </Link>
                <div className="mt-2 flex items-start justify-between">
                  <p>trick: {spot.trick}</p>
                  {session && session.user.id === spot.user_id && (
                    <SpotCompletedButton
                      isCompleted={spot.is_completed}
                      spotId={spot.id}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>
      <TabsContent
        value="make"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {spots
          .filter((spot) => spot.is_completed)
          .map((spot) => (
            <Card key={spot.id}>
              <CardContent className="p-4">
                <SpotImage filePath={spot.file_path} />
                <Link href={`/s/${spot.id}`} className="hover:underline">
                  <h2 className="mt-4 text-xl font-bold">{spot.name}</h2>
                </Link>
                <div className="mt-2 flex items-start justify-between">
                  <p>trick: {spot.trick}</p>
                  {session && session.user.id === spot.user_id && (
                    <SpotCompletedButton
                      isCompleted={spot.is_completed}
                      spotId={spot.id}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>
    </Tabs>
  )
}
