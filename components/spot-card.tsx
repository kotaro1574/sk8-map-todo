import { Session } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import { SpotCompletedButton } from "./spot-completed-button"
import { SpotImage } from "./spot-image"
import { Card, CardContent } from "./ui/card"

type SpotWithImages = Database["public"]["Tables"]["spots"]["Row"] & {
  spot_images: Pick<
    Database["public"]["Tables"]["spot_images"]["Row"],
    "order" | "file_path"
  >[]
}

type Props = {
  spot: SpotWithImages
  session: Session | null
}

export function SpotCard({ spot, session }: Props) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <SpotImage
          filePath={
            spot.spot_images.find((image) => image.order === 1)?.file_path ??
            null
          }
        />
        <h2 className="mt-4 text-xl font-bold">{spot.name}</h2>
        <div className="mt-2 flex items-start justify-between">
          <p>trick: {spot.trick}</p>
          {session && session.user.id === spot.user_id && (
            <SpotCompletedButton
              isCompleted={spot.is_completed}
              spotId={spot.id}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
