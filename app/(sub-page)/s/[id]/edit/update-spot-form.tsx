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
import { Checkbox } from "@/components/ui/checkbox"
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
import { SpotImageUploader } from "@/components/spot-image-uploader"

const DynamicLocationSelectMap = dynamic(
  () => import("@/components/location-select-map"),
  {
    loading: () => <MapSkeleton>📍 📍 📍</MapSkeleton>,
    ssr: false,
  }
)

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  trick: z.string(),
  description: z.string(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
  isPublic: z.boolean(),
  filePath: z.string(),
})

type Props = {
  spot: Database["public"]["Functions"]["spot"]["Returns"][0]
  center: { lat: number; lng: number }
}

export default function UpdateSpotForm({ spot, center }: Props) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: spot.name,
      trick: spot.trick,
      description: spot.description,
      location: {
        lat: spot.lat,
        lng: spot.long,
      },
      isPublic: spot.is_public,
      filePath: spot.file_path,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      if (!values.location) {
        toast({ description: "Location is required", variant: "destructive" })
        return
      }

      const { error } = await supabase
        .from("spots")
        .update({
          name: values.name,
          trick: values.trick,
          description: values.description,
          location: `POINT(${values.location.lng} ${values.location.lat})`,
          is_public: values.isPublic,
          updated_at: new Date().toISOString(),
          file_path: values.filePath,
        })
        .eq("id", spot.id)

      if (error) throw error

      toast({ description: "Spot updated!" })
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
        <Controller
          control={form.control}
          name="filePath"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>spot image</FormLabel>
              {/*　TODO あとで対応する */}
              {/* <SpotImageUploader filePath={value} onChange={onChange} /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Publish a spot
                  </label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
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
          name="trick"
          render={({ field }) => (
            <FormItem>
              <FormLabel>trick</FormLabel>
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
              <DynamicLocationSelectMap
                onChange={onChange}
                value={value}
                center={null}
              />
            </FormItem>
          )}
        />

        <Button className="block w-full" disabled={loading} type="submit">
          {loading ? "loading..." : "Update spot"}
        </Button>
      </form>
    </Form>
  )
}
