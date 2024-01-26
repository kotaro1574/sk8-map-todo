import UpdateSpotForm from "./update-spot-form"

export default function SpotPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Spot
        </h1>
        <div className="w-full">
          <UpdateSpotForm />
        </div>
      </div>
    </section>
  )
}
