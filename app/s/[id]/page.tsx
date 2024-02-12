import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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

  const {
    data: spots,
    error: spotsError,
    status: spotsStatus,
  } = await supabase.rpc("spot", { _id: params.id }).single()

  if (!spots) return null

  if (spotsError && spotsStatus !== 406) {
    throw spotsError
  }

  const center = {
    lat: spots.lat,
    lng: spots.long,
  }

  const {
    data: user,
    error: userError,
    status: userStatus,
  } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", spots.user_id)
    .single()

  if (!user) return null

  if (userError && userStatus !== 406) {
    throw userError
  }

  return (
    <section className="grid items-center gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {spots.name}
          </h1>
          <Badge variant={spots.is_completed ? "success" : "warning"}>
            {spots.is_completed ? "Make" : "No make"}
          </Badge>
        </div>
        <SpotDropdownMenu spotId={params.id} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <DynamicMap center={center} zoom={17} />

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-2xl font-bold leading-relaxed tracking-tight md:text-xl">
              {`Taking on the challenge a ${spots.trick} here.`}
            </p>
            <p className="text-lg leading-relaxed tracking-tight md:text-xl">
              {spots.description}
            </p>
          </div>
          <p className="text-md mt-4 text-end text-muted-foreground">
            {user.username} created this spot.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <Button variant={"success"}>Made up 🎉</Button>
    </section>
  )
}
