import { ChangeEventHandler, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import { Icons } from "./icons"
import { SpotImage } from "./spot-image"

export function SpotImageUploader({
  filePaths,
  onChange,
}: {
  filePaths: string[]
  onChange: (filePaths: string[]) => void
}) {
  const supabase = createClientComponentClient<Database>()
  const [uploading, setUploading] = useState(false)

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    setUploading(true)

    if (!event.target.files || event.target.files.length === 0) {
      setUploading(false)
      throw new Error("You must select at least one image to upload.")
    }

    const uploadedFilePaths = await Promise.all(
      Array.from(event.target.files).map(async (file) => {
        const fileExt = file.name.split(".").pop()
        const filePath = `${Math.random()}.${fileExt}`

        const { error } = await supabase.storage
          .from("spots")
          .upload(filePath, file)

        if (error) {
          throw error
        }

        return filePath
      })
    )

    onChange([...filePaths, ...uploadedFilePaths])
    setUploading(false)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {filePaths.map((filePath) => (
          <SpotImage key={filePath} filePath={filePath} />
        ))}
        <label
          className="flex h-full min-h-[100px] cursor-pointer items-center justify-center rounded-lg bg-accent p-4 hover:opacity-70"
          htmlFor="multi"
        >
          <div className="flex items-center gap-1">
            <Icons.plus className="size-4 text-ellipsis" />
            <p>Upload</p>
          </div>
        </label>
      </div>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
          width: 0,
        }}
        type="file"
        id="multi"
        multiple
        accept="image/*"
        onChange={onUpload}
        disabled={uploading}
      />
    </div>
  )
}
