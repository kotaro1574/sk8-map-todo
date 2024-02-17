import { siteConfig } from "@/config/site"

import LoginForm from "./login-form"

export default function IndexPage() {
  return (
    <section className="grid items-center gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
