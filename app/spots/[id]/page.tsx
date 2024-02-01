import dynamic from "next/dynamic"

import { siteConfig } from "@/config/site"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
})

export default function SpotPage({ params }: { params: { id: string } }) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        {siteConfig.dummySpots.find((spot) => spot.id === params.id)?.title}
      </h1>
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
