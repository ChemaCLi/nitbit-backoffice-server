export class CoordinatePair {
  constructor(
    private readonly latitude: number,
    private readonly longitude: number,
  ) {
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error('Invalid coordinates')
    }
  }

  getLatitude(): number {
    return this.latitude
  }

  getLongitude(): number {
    return this.longitude
  }

  toArray(): [number, number] {
    return [this.latitude, this.longitude]
  }
}
