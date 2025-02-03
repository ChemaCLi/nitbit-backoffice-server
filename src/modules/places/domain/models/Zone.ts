import { ID } from '../value-objects/ID'
import { Place } from './Place'

export interface ZoneProps {
  id: ID
  name: string
  places?: Place[]
}

export class Zone {
  constructor(public readonly props: ZoneProps) {}

  get id(): ID {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get places(): Place[] {
    return this.props.places || []
  }
}
