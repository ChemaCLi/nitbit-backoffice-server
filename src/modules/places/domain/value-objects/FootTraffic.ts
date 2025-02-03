export type FootTrafficLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export class FootTraffic {
  constructor(private readonly value: FootTrafficLevel) {
    if (!['LOW', 'MEDIUM', 'HIGH'].includes(value)) {
      throw new Error('Invalid foot traffic level')
    }
  }

  getValue(): FootTrafficLevel {
    return this.value
  }
}
