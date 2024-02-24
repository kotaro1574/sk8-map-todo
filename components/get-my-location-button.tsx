import { useState } from "react"

import { Button } from "./ui/button"

export function GetMyLocationButton({
  onClick,
  className,
}: {
  onClick: ({ lat, lng }: { lat: number; lng: number }) => void
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  const getMyLocation = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition((position) => {
        setLoading(false)
        onClick({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  return (
    <Button onClick={getMyLocation} disabled={loading} className={className}>
      {loading ? "Loading..." : "Get my location"}
    </Button>
  )
}
