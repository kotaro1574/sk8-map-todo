"use client"

import { Database } from "@/types/supabase"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SpotImage } from "@/components/spot-image"

export function SpotCarousel({
  spotImages,
}: {
  spotImages: Pick<
    Database["public"]["Tables"]["spot_images"]["Row"],
    "file_path"
  >[]
}) {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {spotImages.length !== 0 ? (
            spotImages.map((spotImage) => (
              <CarouselItem key={spotImage.file_path}>
                <SpotImage filePath={spotImage.file_path} />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <SpotImage filePath={null} />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
    </div>
  )
}
