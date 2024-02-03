"use client"

import React, { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { Avatar } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"

type Profiles = Database["public"]["Tables"]["profiles"]["Row"]

export default function AvatarUploader({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles["avatar_url"]
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClientComponentClient<Database>()
  const [uploading, setUploading] = useState(false)

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert("Error uploading avatar!")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <Avatar url={url ?? ""} size={size} />
      <div style={{ width: size }} className="relative">
        <label
          className={`${buttonVariants({
            variant: "default",
            size: "default",
          })} mt-2 block w-full`}
          htmlFor="single"
        >
          {uploading ? "Uploading ..." : "Upload"}
        </label>

        <input
          style={{
            visibility: "hidden",
            position: "absolute",
            width: 0,
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
