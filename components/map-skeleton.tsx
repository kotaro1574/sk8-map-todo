import { ReactNode } from "react"

import { Skeleton } from "./ui/skeleton"

export function MapSkeleton({ children }: { children: ReactNode }) {
  return (
    <Skeleton className="flex h-[400px] w-full items-center justify-center rounded-sm">
      <div className="text-3xl">{children}</div>
    </Skeleton>
  )
}
