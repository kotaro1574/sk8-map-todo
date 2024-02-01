export type Spot = {
  id: string
  title: string
  tricks: string
  description: string
  isCompleted: boolean
  latlng: {
    lat: number
    lng: number
  }
}
