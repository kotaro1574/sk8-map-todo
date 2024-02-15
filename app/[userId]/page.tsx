import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { MapSkeleton } from "@/components/map-skeleton"

import { UserSpotsTabs } from "./user-spots-tabs"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <MapSkeleton>🛹 🛹 🛹</MapSkeleton>,
  ssr: false,
})

export default async function UserPage({
  params,
}: {
  params: { userId: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: user,
    error: userError,
    status: userStatus,
  } = await supabase
    .from("profiles")
    .select("avatar_url, username, id")
    .eq("id", params.userId)
    .single()

  if (!user) return null

  if (userError && userStatus !== 406) {
    throw userError
  }

  const {
    data: spots,
    error: spotsError,
    status: spotsStatus,
  } = await supabase.from("spots").select("*").eq("user_id", user.id)

  if (spotsError && spotsStatus !== 406) {
    throw spotsError
  }

  return (
    <section className="grid items-center gap-6">
      <div className="grid grid-cols-[60px_1fr_24px] items-center gap-6">
        <Avatar url={user.avatar_url ?? ""} size={70} />
        <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {user.username}
        </h1>
        {session && session.user.id === user.id ? (
          <Link href={"/account"}>
            <Icons.settings className="size-6" />
          </Link>
        ) : (
          <div />
        )}
      </div>
      <UserSpotsTabs spots={spots ?? []} session={session} />
    </section>
  )
}
