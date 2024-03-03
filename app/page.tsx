import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { MapSkeleton } from "@/components/map-skeleton"
import { SpotCard } from "@/components/spot-card"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <MapSkeleton>🛹 🛹 🛹</MapSkeleton>,
  ssr: false,
})

export default async function IndexPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: spots,
    error: spotsError,
    status: spotsStatus,
  } = await supabase
    .from("spots")
    .select(
      `
    *,
    spot_images (
      file_path,
      order
    )
  `
    )
    .eq("is_public", true)
    .order("created_at", { ascending: false })

  if (!spots) return null

  if (spotsError && spotsStatus !== 406) {
    throw spotsError
  }

  const { data: user } = await supabase
    .from("profiles")
    .select("lat, lng")
    .eq("id", session?.user.id ?? "")
    .single()

  const center =
    user && user.lat && user.lng
      ? { lat: user.lat, lng: user.lng }
      : siteConfig.defaultMapCenter

  return (
    <section>
      <DynamicMap center={center} isGetMyLocation zoom={13} />
      <div className="container grid max-w-[980px] items-center gap-6 px-4 pb-8 pt-6 md:px-8 md:py-10">
        <div>
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              New spots 📍
            </h1>
            {session && (
              <Link
                href={"/s/create"}
                className={buttonVariants({ variant: "ghost" })}
              >
                <Icons.plus className="mr-2 size-4" />
                new spot
              </Link>
            )}
          </div>
          <Separator className="my-4" />
          <div className="grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {spots.map((spot) => (
              <Link href={`/s/${spot.id}`} key={spot.id}>
                <SpotCard spot={spot} session={session} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
