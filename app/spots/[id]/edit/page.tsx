import UpdateSpotForm from "./update-spot-form"

export default function SpotEditPage() {
  return (
    <section className="grid items-center gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Edit Spot
        </h1>
        <div className="w-full">
          <UpdateSpotForm />
        </div>
      </div>
    </section>
  )
}
