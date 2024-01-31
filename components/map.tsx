"use client"

import L from "leaflet"

import "leaflet/dist/leaflet.css"
import { useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import { Spot } from "@/types/spot"

import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png"
import { Button } from "./ui/button"

type Props = {
  center: L.LatLngExpression
  spots: Spot[] | Spot
  isGetMyLocation?: boolean
}

export default function Map({ center, spots, isGetMyLocation = false }: Props) {
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
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {Array.isArray(spots) ? (
            spots.map((spot) => (
              <Marker
                key={spot.id}
                icon={
                  new L.Icon({
                    iconUrl: MarkerIcon.src,
                    iconRetinaUrl: MarkerIcon.src,
                    iconSize: [25, 41],
                    iconAnchor: [12.5, 41],
                    popupAnchor: [0, -41],
                    shadowUrl: MarkerShadow.src,
                    shadowSize: [41, 41],
                  })
                }
                position={spot.latlng}
              >
                <Popup>
                  {spot.title} <br /> {spot.description} <br /> {spot.tricks}
                </Popup>
              </Marker>
            ))
          ) : (
            <Marker
              key={spots.id}
              icon={
                new L.Icon({
                  iconUrl: MarkerIcon.src,
                  iconRetinaUrl: MarkerIcon.src,
                  iconSize: [25, 41],
                  iconAnchor: [12.5, 41],
                  popupAnchor: [0, -41],
                  shadowUrl: MarkerShadow.src,
                  shadowSize: [41, 41],
                })
              }
              position={spots.latlng}
            >
              <Popup>
                {spots.title} <br /> {spots.description} <br /> {spots.tricks}
              </Popup>
            </Marker>
          )}
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
