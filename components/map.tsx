"use client"

import L from "leaflet"

import "leaflet/dist/leaflet.css"
import { useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"

import { GetMyLocationButton } from "./get-my-location-button"
import { SpotMarkers } from "./spot-markers"

type Props = {
  height?: string
  center: L.LatLngExpression
  isGetMyLocation?: boolean
  zoom: number
}

export default function Map({
  center,
  isGetMyLocation = false,
  zoom,
  height = "400px",
}: Props) {
  const [coord, setCoord] = useState<L.LatLngExpression>(center)

  return (
    <div className="text-center">
      <MapContainer
        style={{
          height,
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

        <SpotMarkers />
      </MapContainer>

      {isGetMyLocation && (
        <GetMyLocationButton onClick={setCoord} className="mt-4" />
      )}
    </div>
  )
}
