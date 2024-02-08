"use client"

import { startTransition, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MapSkeleton } from "@/components/map-skeleton"

const DynamicLocationSelectMap = dynamic(
  () => import("@/components/location-select-map"),
  {
    loading: () => <MapSkeleton>📍 📍 📍</MapSkeleton>,
    ssr: false,
  }
)

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  tricks: z.string(),
  description: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

export default function CreateSpotForm() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tricks: "",
      description: "",
      location: {
        lat: 0,
        lng: 0,
      },
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const { error } = await supabase.from("spots").insert({
        name: values.name,
        description: values.description,
        location: `POINT(${values.location.lng} ${values.location.lat})`,
      })

      if (error) throw error

      toast({ description: "Commit created!" })
      setLoading(false)
      router.push("/")
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {form.formState.errors.name && (
                <FormDescription>
                  {form.formState.errors.name.message}
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tricks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>tricks</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>location</FormLabel>
              <DynamicLocationSelectMap onChange={onChange} value={value} />
            </FormItem>
          )}
        />

        <Button className="block w-full" type="submit">
          {loading ? "loading.." : "Create"}
        </Button>
      </form>
    </Form>
  )
}
