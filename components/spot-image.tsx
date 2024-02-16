"use client"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function SpotImage({ src }: { src: string | null }) {
  return (
    <AspectRatio ratio={1}>
      {src ? (
        <Image
          className="rounded-md object-cover"
          src={src}
          alt={"senda spot image"}
          sizes="100%"
          fill
        />
      ) : (
        <div className="flex size-full items-center justify-center rounded-md bg-accent">
          <p className="text-gray-400">No image 🛹</p>
        </div>
      )}
    </AspectRatio>
  )
}
