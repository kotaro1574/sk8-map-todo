export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Spot Todo",
  description:
    "Register now for the spots you plan to shoot with your skateboard! 🛹 📹 ",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
  defaultMapCenter: { lat: 49.27705877501251, lng: -123.10890913009645 },
}
