"use client"

import dynamic from "next/dynamic"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapSkeleton } from "@/components/map-skeleton"
import { SpotImage } from "@/components/spot-image"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <MapSkeleton>📹 📹 📹</MapSkeleton>,
  ssr: false,
})

export function SpotTabs({ center }: { center: { lat: number; lng: number } }) {
  return (
    <Tabs defaultValue="image">
      <TabsList>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="map">Map</TabsTrigger>
      </TabsList>
      <TabsContent value="image">
        <SpotImage filePath={null} />
      </TabsContent>
      <TabsContent value="map">
        <DynamicMap center={center} zoom={17} />
      </TabsContent>
    </Tabs>
  )
}
