import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { MapSkeleton } from "@/components/map-skeleton"

import { SpotDropdownMenu } from "./spot-dropdown-menu"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <MapSkeleton>📹 📹 📹</MapSkeleton>,
  ssr: false,
})

export default async function SpotPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { data, error, status } = await supabase
    .rpc("spot", { _id: params.id })
    .single()

  if (!data) return null

  if (error && status !== 406) {
    throw error
  }

  const center = {
    lat: data.lat,
    lng: data.long,
  }

  return (
    <section className="grid items-center gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {data.name}
        </h1>
        <SpotDropdownMenu spotId={params.id} />
      </div>
      <DynamicMap center={center} zoom={17} />
      <p className="text-2xl leading-relaxed tracking-tight md:text-xl">
        {data.name}
      </p>
      <p className="text-lg leading-relaxed tracking-tight md:text-xl">
        {data.description}
      </p>
    </section>
  )
}
