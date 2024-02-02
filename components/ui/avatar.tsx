"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import { Icons } from "../icons"

export function Avatar({ size, url }: { size: number; url: string }) {
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState(url)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log("Error downloading image: ", error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  return avatarUrl && avatarUrl.startsWith("blob:") ? (
    <Image
      width={size}
      height={size}
      src={avatarUrl}
      alt="Avatar"
      className="max-w-full overflow-hidden rounded-md object-cover"
      style={{ height: size, width: size }}
    />
  ) : (
    <Icons.user
      className="fill-current"
      style={{ height: size, width: size }}
    />
  )
}
