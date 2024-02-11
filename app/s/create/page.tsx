"use client"

import CreateSpotForm from "./create-spot-form"

export default function SpotCreatePage() {
  return (
    <section className="grid items-center gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-6">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Create Spot 📍
        </h1>
        <div className="w-full">
          <CreateSpotForm />
        </div>
      </div>
    </section>
  )
}
