import { ID } from '../../../shared/domain/value-objects/ID'

export interface TagProps {
  id: ID
  name: string
  icon?: string
  description?: string
}

export class Tag {
  constructor(public readonly props: TagProps) {}

  get id(): ID {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get icon(): string | undefined {
    return this.props.icon
  }

  get description(): string | undefined {
    return this.props.description
  }
}
