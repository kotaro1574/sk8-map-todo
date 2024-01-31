import { siteConfig } from "@/config/site"

export default function SpotPage({ params }: { params: { id: string } }) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        {siteConfig.dummySpots.find((spot) => spot.id === params.id)?.title}
      </h1>
      <p className="text-lg leading-relaxed tracking-tight md:text-xl">
        {
          siteConfig.dummySpots.find((spot) => spot.id === params.id)
            ?.description
        }
      </p>
      <div className="w-full">{params.id}</div>
    </section>
  )
}
