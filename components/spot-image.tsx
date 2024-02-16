"use client"

import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function SpotImage({ filePath }: { filePath: string | null }) {
  if (!filePath) {
    return (
      <AspectRatio ratio={1}>
        <div className="flex size-full items-center justify-center rounded-md bg-accent">
          <p className="text-gray-400">No image 🛹</p>
        </div>
      </AspectRatio>
    )
  }

  const supabase = createClientComponentClient<Database>()
  const { data } = supabase.storage.from("spots").getPublicUrl(filePath)

  return (
    <AspectRatio ratio={1}>
      <Image
        src={data.publicUrl}
        alt="Spot image"
        layout="fill"
        objectFit="cover"
        className="rounded-md"
      />
    </AspectRatio>
  )
}
