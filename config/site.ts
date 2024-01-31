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
  dummySpots: [
    {
      id: "1",
      title: "Starthcna",
      tricks: "HeelFlip",
      description: "do",
      isCompleted: true,
      latlng: {
        lat: 49.27917258267728,
        lng: -123.08824539184572,
      },
    },
    {
      id: "2",
      title: "Downtown",
      tricks: "KickFlip",
      description: "do",
      isCompleted: false,
      latlng: {
        lat: 49.28365187565408,
        lng: -123.11862945556642,
      },
    },
    {
      id: "3",
      title: "Curb under bridge",
      tricks: "Front Tail Slide",
      description: "do",
      isCompleted: false,
      latlng: {
        lat: 49.27322289267049,
        lng: -123.11500310897829,
      },
    },
  ],
}
