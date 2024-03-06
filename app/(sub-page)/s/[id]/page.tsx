import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SpotCompletedButton } from "@/components/spot-completed-button"

import { SpotDropdownMenu } from "./spot-dropdown-menu"
import { SpotTabs } from "./spot-tabs"

export default async function SpotPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: spot,
    error: spotError,
    status: spotStatus,
  } = await supabase.rpc("spot", { _id: params.id }).single()

  if (!spot) return null

  if (spotError && spotStatus !== 406) {
    throw spotError
  }

  const {
    data: spotImages,
    error: spotImagesError,
    status: spotImagesStatus,
  } = await supabase
    .from("spot_images")
    .select("file_path")
    .eq("spot_id", spot.id)

  if (spotImagesError && spotImagesStatus !== 406) {
    throw spotImagesError
  }

  const {
    data: user,
    error: userError,
    status: userStatus,
  } = await supabase
    .from("profiles")
    .select("username, id, avatar_url")
    .eq("id", spot.user_id)
    .single()

  if (!user) return null

  if (userError && userStatus !== 406) {
    throw userError
  }

  const center = {
    lat: spot.lat,
    lng: spot.long,
  }

  return (
    <section className="grid items-center gap-6">
      <div className="flex items-center justify-between">
        <h1 className="max-w-[280px] text-3xl font-extrabold leading-tight tracking-tighter md:max-w-screen-sm md:text-4xl">
          {spot.name}
        </h1>
        {session && session.user.id === spot.user_id && (
          <SpotDropdownMenu spotId={params.id} />
        )}
      </div>
      <div>
        <Badge variant={spot.is_public ? "success" : "warning"}>
          {spot.is_public ? "public spot" : "private spot"}
        </Badge>
      </div>
      <div className="mx-auto grid w-full max-w-[400px] gap-6">
        <SpotTabs center={center} spotImages={spotImages ?? []} />

        <p className="text-lg leading-relaxed tracking-tight md:text-xl">
          {spot.description}
        </p>

        {session && (
          <p className="text-lg leading-relaxed tracking-tight md:text-xl">
            trick: {spot.trick}
          </p>
        )}

        <p className="text-md text-end text-muted-foreground">
          <Link href={`/${user.id}`} className="mt-2 hover:underline">
            {user.username}
          </Link>
          {` created this spot.`}
        </p>
      </div>
      {session && session.user.id === spot.user_id && (
        <>
          <Separator className="my-4" />
          <SpotCompletedButton
            isCompleted={spot.is_completed}
            spotId={spot.id}
          />
        </>
      )}
    </section>
  )
}
