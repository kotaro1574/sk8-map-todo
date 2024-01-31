import dynamic from "next/dynamic"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

import { NewSpotsTable } from "./new-spots-table"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
})

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="w-full">
        <DynamicMap />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            New spots 📍
          </h1>
          <Link
            href={"/spots/create"}
            className={buttonVariants({ variant: "ghost" })}
          >
            <Icons.plus className="mr-2 size-4" />
            new spot
          </Link>
        </div>
        <Separator className="mt-2" />
        <NewSpotsTable />
      </div>
    </section>
  )
}
