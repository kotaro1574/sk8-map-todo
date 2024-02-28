import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import L from "leaflet"

import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Marker, Popup, useMap } from "react-leaflet"

import { Database } from "@/types/supabase"

import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png"
import { SpotImage } from "./spot-image"

type SpotInView = {
  id: string
  file_path: string
  name: string
  description: string
  lat: number
  long: number
}

export function SpotMarkers() {
  const supabase = createClientComponentClient<Database>()
  const map = useMap()
  const [spotsInView, setSpotsInView] = useState<SpotInView[]>([])

  useEffect(() => {
    const fetchSpotsInView = async () => {
      try {
        const bounds = map.getBounds()
        const { data } = await supabase
          .rpc("spots_in_view", {
            min_lat: bounds.getSouthWest().lat,
            min_long: bounds.getSouthWest().lng,
            max_lat: bounds.getNorthEast().lat,
            max_long: bounds.getNorthEast().lng,
          })
          .eq("is_public", true)

        if (data) {
          setSpotsInView(data)
        }
      } catch (error) {
        console.error("Error fetching spots:", error)
      }
    }

    const onMoveEnd = () => {
      fetchSpotsInView()
    }

    map.on("moveend", onMoveEnd)

    fetchSpotsInView()

    return () => {
      map.off("moveend", onMoveEnd)
    }
  }, [map, supabase])

  return (
    <>
      {spotsInView.map((spot) => (
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
          position={{ lat: spot.lat, lng: spot.long }}
        >
          <Popup>
            <Link href={`/s/${spot.id}`}>
              <div className="w-[150px]">
                <SpotImage filePath={spot.file_path} />
                <p>{spot.name}</p>
              </div>
            </Link>
          </Popup>
        </Marker>
      ))}
    </>
  )
}
