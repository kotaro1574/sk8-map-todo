"use client"

import { startTransition, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Controller, useForm } from "react-hook-form"
import { array, z } from "zod"

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
  filePaths: array(z.string()),
})

export default function CreateSpotForm({
  center,
}: {
  center: { lat: number; lng: number }
}) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      trick: "",
      description: "",
      location: null,
      isPublic: false,
      filePaths: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      if (!values.location) {
        toast({ description: "Location is required", variant: "destructive" })
        return
      }

      const { error } = await supabase.from("spots").insert({
        name: values.name,
        trick: values.trick,
        description: values.description,
        location: `POINT(${values.location.lng} ${values.location.lat})`,
        is_public: values.isPublic,
        //TODO ↓あとでfile_path消す
        file_path: "",
      })

      if (error) throw error

      toast({ description: "Spot created!" })
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
          name="filePaths"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>spot images</FormLabel>
              <SpotImageUploader filePaths={value} onChange={onChange} />
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
                center={center}
              />
            </FormItem>
          )}
        />

        <Button className="block w-full" disabled={loading} type="submit">
          {loading ? "loading..." : "Create"}
        </Button>
      </form>
    </Form>
  )
}
