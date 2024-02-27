"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import L from "leaflet"

import "leaflet/dist/leaflet.css"
import { useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"

import { Database } from "@/types/supabase"

import { GetMyLocationButton } from "./get-my-location-button"
import { SpotMarkers } from "./spot-markers"

type Props = {
  center: L.LatLngExpression
  isGetMyLocation?: boolean
  zoom: number
}

export default function Map({ center, isGetMyLocation = false, zoom }: Props) {
  const supabase = createClientComponentClient<Database>()
  const [coord, setCoord] = useState<L.LatLngExpression>(center)

  return (
    <div className="text-center">
      <div className="overflow-hidden rounded-sm">
        <MapContainer
          style={{
            height: "400px",
            width: "100%",
          }}
          center={coord}
          key={`${coord}`}
          zoom={zoom}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <SpotMarkers supabase={supabase} />
        </MapContainer>
      </div>
      {isGetMyLocation && (
        <GetMyLocationButton onClick={setCoord} className="mt-4" />
      )}
    </div>
  )
}
