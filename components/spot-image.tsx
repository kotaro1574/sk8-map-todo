"use client"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function SpotImage() {
  return (
    <AspectRatio ratio={1}>
      <Image
        className="rounded-md object-cover"
        src={"/spot-senda.jpg"}
        alt={"senda spot image"}
        fill
      />
    </AspectRatio>
  )
}
