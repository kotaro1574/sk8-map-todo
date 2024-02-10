"use client"

import { startTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export function SpotDropdownMenu({ spotId }: { spotId: string }) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()

  const onDelete = async () => {
    try {
      const confirmEnd = window.confirm(
        "Do you really want to delete the spot?"
      )

      if (confirmEnd) {
        const { error } = await supabase.from("spots").delete().eq("id", spotId)

        if (error) throw error

        toast({ description: "Spot deleted!" })
        startTransition(() => {
          router.push("/")
        })
      }
    } catch (error) {
      toast({ variant: "destructive", description: "Error updating the data!" })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${buttonVariants({
          variant: "ghost",
          size: "icon",
        })}`}
      >
        <Icons.more className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1100]">
        <Link href={`/spots/${spotId}/edit`}>
          <DropdownMenuItem>
            <Icons.edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={onDelete}>
          <Icons.trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
