import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { siteConfig } from "@/config/site"

import UpdateSpotForm from "./update-spot-form"

export default async function SpotEditPage({
  params,
}: {
  params: { id: string }
}) {
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

  const {
    data: { session },
  } = await supabase.auth.getSession()

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
    <section className="grid items-center gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-6">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Edit Spot
        </h1>
        <div className="w-full">
          <UpdateSpotForm spot={data} center={center} />
        </div>
      </div>
    </section>
  )
}
