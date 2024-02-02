import Link from "next/link"
import { Session } from "@supabase/auth-helpers-nextjs"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Avatar } from "./ui/avatar"
import { buttonVariants } from "./ui/button"

export function SiteHeader({
  session,
  avatar_url,
}: {
  session: Session | null
  avatar_url: string | null
}) {
  return (
    <header className="sticky top-0 z-[1100] w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4 px-4 sm:space-x-0 md:px-8">
        <MainNav items={siteConfig.mainNav} />
        <nav className="hidden items-center space-x-1 sm:flex">
          {session ? (
            <Link
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              href={"/account"}
            >
              <Avatar url={avatar_url ?? ""} size={avatar_url ? 30 : 20} />
            </Link>
          ) : (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={"/login"}
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </nav>

        {/* <div className="sm:hidden">
          <SiteDrawer
            items={siteConfig.mainNav}
            session={session}
            avatar_url={avatar_url}
          />
        </div> */}
      </div>
    </header>
  )
}
