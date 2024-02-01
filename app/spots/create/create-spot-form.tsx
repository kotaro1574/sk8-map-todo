"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

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
import { MapSkeleton } from "@/components/map-skeleton"

const DynamicLocationSelectMap = dynamic(
  () => import("@/components/location-select-map"),
  {
    loading: () => <MapSkeleton>📍 📍 📍</MapSkeleton>,
    ssr: false,
  }
)

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  tricks: z.string(),
  description: z.string(),
  latlng: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
})

export default function CreateSpotForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tricks: "",
      description: "",
      latlng: null,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      console.log(values)
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {form.formState.errors.title && (
                <FormDescription>
                  {form.formState.errors.title.message}
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
          name="latlng"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>address</FormLabel>
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
