import dynamic from "next/dynamic"

import { Separator } from "@/components/ui/separator"

import { NewSpotsTable } from "./new-spots-table"

const DynamicMap = dynamic(() => import("@/components/map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
})

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <div className="w-full">
          <DynamicMap />
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            New spots 📍
          </h1>
          <Separator className="mt-2" />
          <NewSpotsTable />
        </div>
      </div>
    </section>
  )
}
