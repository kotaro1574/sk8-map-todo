"use client"

import Link from "next/link"

import { Database } from "@/types/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  spots: Database["public"]["Tables"]["spots"]["Row"][]
}

export function UserSpotsTabs({ spots }: Props) {
  return (
    <Tabs defaultValue="no-make">
      <TabsList>
        <TabsTrigger value="no-make">No make</TabsTrigger>
        <TabsTrigger value="make">Make</TabsTrigger>
      </TabsList>
      <TabsContent
        value="no-make"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {spots
          .filter((spot) => !spot.is_completed)
          .map((spot) => (
            <Link key={spot.id} href={`/s/${spot.id}`}>
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold">{spot.name}</h2>
                  <p className="mt-2">{spot.description}</p>
                  <p className="mt-2">Do {spot.trick}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </TabsContent>
      <TabsContent
        value="make"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {spots
          .filter((spot) => spot.is_completed)
          .map((spot) => (
            <Link key={spot.id} href={`/s/${spot.id}`}>
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold">{spot.name}</h2>
                  <p className="mt-2">{spot.description}</p>
                  <p className="mt-2">Do {spot.trick}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </TabsContent>
    </Tabs>
  )
}
