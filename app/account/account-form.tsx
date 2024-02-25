"use client"

import { startTransition, useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { GetMyLocationButton } from "@/components/get-my-location-button"
import LocationSelectMap from "@/components/location-select-map"

import AvatarUploader from "./avatar-uploader"

const formSchema = z.object({
  username: z.string(),
  avatar_url: z.string(),
  center: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
})

type Props = {
  profile: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "username" | "avatar_url" | "id" | "lat" | "lng"
  >
}

export default function AccountForm({ profile }: Props) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile.username || "",
      avatar_url: profile.avatar_url || "",
      center:
        profile.lat && profile.lng
          ? {
              lat: profile.lat,
              lng: profile.lng,
            }
          : null,
    },
  })

  const onSubmit = async ({
    username,
    avatar_url,
    center,
  }: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const { error } = await supabase.from("profiles").upsert({
        id: profile.id,
        username,
        avatar_url,
        lat: center?.lat,
        lng: center?.lng,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast({ description: "Profile updated!" })
      setLoading(false)
      router.push(`/${profile.id}`)
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      toast({ variant: "destructive", description: "Error updating the data!" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="avatar_url">Avatar</FormLabel>
              <FormControl>
                <AvatarUploader
                  uid={profile.id}
                  url={field.value}
                  size={150}
                  onUpload={(url) => {
                    form.setValue("avatar_url", url)
                    onSubmit(form.getValues())
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="center"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel htmlFor="center">Center</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <LocationSelectMap
                    value={value}
                    onChange={onChange}
                    center={null}
                  />
                  <GetMyLocationButton
                    onClick={onChange}
                    className="block w-full"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Determine the center of the Map that will be displayed in the
                app.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="block w-full" disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </Button>
      </form>
    </Form>
  )
}
