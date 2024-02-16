"use client"

import { ChangeEventHandler, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import { SpotImage } from "./spot-image"
import { buttonVariants } from "./ui/button"

export function SpotImageUploader() {
  const supabase = createClientComponentClient<Database>()
  const [uploading, setUploading] = useState(false)
  const [filePath, setFilePath] = useState<string | null>(null)

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    setUploading(true)

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.")
    }

    const file = event.target.files[0]
    const fileExt = file.name.split(".").pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error } = await supabase.storage
      .from("spots")
      .upload(filePath, file)

    if (error) {
      throw error
    }

    const { data } = supabase.storage.from("spots").getPublicUrl(filePath)

    setFilePath(data.publicUrl)

    setUploading(false)
  }

  return (
    <div className="relative">
      <div className="w-[300px]">
        <SpotImage src={filePath} />
        <label
          className={`${buttonVariants({
            variant: "default",
            size: "default",
          })} mt-2 block`}
          htmlFor="single"
        >
          {filePath ? "Change spot image" : "Upload spot image"}
        </label>
      </div>

      <input
        style={{
          visibility: "hidden",
          position: "absolute",
          width: 0,
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={onUpload}
        disabled={uploading}
      />
    </div>
  )
}
