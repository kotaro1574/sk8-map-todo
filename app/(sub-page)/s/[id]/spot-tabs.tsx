"use client"

import dynamic from "next/dynamic"

import { Database } from "@/types/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapSkeleton } from "@/components/map-skeleton"

import { SpotCarousel } from "./spot-carousel"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <MapSkeleton>📹 📹 📹</MapSkeleton>,
  ssr: false,
})

export function SpotTabs({
  spotImages,
  center,
}: {
  spotImages: Pick<
    Database["public"]["Tables"]["spot_images"]["Row"],
    "file_path"
  >[]
  center: { lat: number; lng: number }
}) {
  return (
    <Tabs defaultValue={!spotImages.length ? "map" : "images"}>
      <TabsList>
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="map">Map</TabsTrigger>
      </TabsList>
      <TabsContent value="images">
        <SpotCarousel spotImages={spotImages} />
      </TabsContent>
      <TabsContent value="map">
        <DynamicMap center={center} zoom={17} />
      </TabsContent>
    </Tabs>
  )
}
