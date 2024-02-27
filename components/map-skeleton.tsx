import { ReactNode } from "react"

import { Skeleton } from "./ui/skeleton"

export function MapSkeleton({
  children,
  height = "400px",
}: {
  children: ReactNode
  height?: string
}) {
  return (
    <Skeleton
      style={{ height }}
      className="flex w-full items-center justify-center rounded-sm"
    >
      <div className="text-3xl">{children}</div>
    </Skeleton>
  )
}
