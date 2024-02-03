import "@/styles/globals.css"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/provider/theme-provider"
import { ToasterProvider } from "@/components/provider/toaster-provider"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  const { data } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user?.id ?? "")
    .single()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader
                  session={session}
                  avatar_url={data?.avatar_url ?? null}
                />
                <div className="container max-w-[980px] flex-1 px-4 pb-8 pt-6 md:px-8 md:py-10">
                  {children}
                </div>
              </div>
              <TailwindIndicator />
            </ToasterProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
