"use client"

import { startTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

export function SpotCompletedButton({
  isCompleted,
  spotId,
}: {
  isCompleted: boolean
  spotId: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient<Database>()

  const onMakeOrNomake = async () => {
    try {
      setIsLoading(true)

      const { error } = await supabase
        .from("spots")
        .update({ is_completed: !isCompleted })
        .eq("id", spotId)

      if (error) throw error

      toast({ description: isCompleted ? "Let's try it!" : "Nice Make 🎉" })

      setIsLoading(false)
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return !isCompleted ? (
    <Button disabled={isLoading} variant={"success"} onClick={onMakeOrNomake}>
      {isLoading ? "...loading" : "Make"}
    </Button>
  ) : (
    <Button disabled={isLoading} variant={"warning"} onClick={onMakeOrNomake}>
      {isLoading ? "...loading" : "No make"}
    </Button>
  )
}
