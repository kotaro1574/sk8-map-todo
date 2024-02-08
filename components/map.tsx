"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import L from "leaflet"

import "leaflet/dist/leaflet.css"
import { useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"

import { Spot } from "@/types/spot"
import { Database } from "@/types/supabase"

import { SpotMarkers } from "./spot-markers"
import { Button } from "./ui/button"

type SpotInView = {
  id: string
  name: string
  description: string
  lat: number
  long: number
}

type Props = {
  center: L.LatLngExpression
  isGetMyLocation?: boolean
  zoom: number
}

export default function Map({ center, isGetMyLocation = false, zoom }: Props) {
  const supabase = createClientComponentClient<Database>()
  const [coord, setCoord] = useState<L.LatLngExpression>(center)
  const [loading, setLoading] = useState(false)

  const getMyLocation = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition((position) => {
        setLoading(false)
        setCoord([position.coords.latitude, position.coords.longitude])
      })
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div>
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
        <div className="mt-4 text-center">
          <Button onClick={getMyLocation}>
            {loading ? "Loading..." : "Get my location"}
          </Button>
        </div>
      )}
    </div>
  )
}
