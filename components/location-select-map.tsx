import L from "leaflet"

import "leaflet/dist/leaflet.css"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet"

import { siteConfig } from "@/config/site"

import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png"

type Props = {
  onChange: (...event: any[]) => void
  value: {
    lat: number
    lng: number
  } | null
}

export default function LocationSelectMap({ onChange, value }: Props) {
  const SelectedMarker = () => {
    const map = useMapEvents({
      click(e) {
        onChange(e.latlng)
      },
    })

    return (
      <>
        {value && (
          <Marker
            position={value}
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
          >
            <Popup>You are here</Popup>
          </Marker>
        )}
      </>
    )
  }

  return (
    <div>
      <div className="overflow-hidden rounded-sm">
        <MapContainer
          style={{
            height: "400px",
            width: "100%",
          }}
          center={siteConfig.defaultMapCenter}
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <SelectedMarker />
        </MapContainer>
      </div>
    </div>
  )
}
