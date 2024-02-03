import dynamic from "next/dynamic"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MapSkeleton } from "@/components/map-skeleton"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <MapSkeleton>📹 📹 📹</MapSkeleton>,
  ssr: false,
})

export default function SpotPage({ params }: { params: { id: string } }) {
  return (
    <section className="grid items-center gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {siteConfig.dummySpots.find((spot) => spot.id === params.id)?.title}
        </h1>
        <Link
          href={`/spots/${params.id}/edit`}
          className={buttonVariants({ variant: "ghost" })}
        >
          <Icons.edit className="mr-2 size-4" />
          edit
        </Link>
      </div>
      <DynamicMap
        center={
          siteConfig.dummySpots.find((spot) => spot.id === params.id)?.latlng ||
          siteConfig.defaultMapCenter
        }
        zoom={17}
        spots={
          siteConfig.dummySpots.find((spot) => spot.id === params.id) || []
        }
      />
      <p className="text-2xl leading-relaxed tracking-tight md:text-xl">
        {siteConfig.dummySpots.find((spot) => spot.id === params.id)?.tricks}
      </p>
      <p className="text-lg leading-relaxed tracking-tight md:text-xl">
        {
          siteConfig.dummySpots.find((spot) => spot.id === params.id)
            ?.description
        }
      </p>
    </section>
  )
}
