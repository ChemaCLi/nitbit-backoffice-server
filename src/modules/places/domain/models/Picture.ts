import { ID } from '../../../shared/domain/value-objects/ID'
import { PictureSize } from '../value-objects/PictureSize'

export interface PictureProps {
  id: ID
  imageUrl: string
  altText: string
  figcaptionText: string
  size: PictureSize
  variants: Omit<PictureProps, 'variants'>[]
}

export class Picture {
  constructor(public readonly props: PictureProps) {}

  get id(): ID {
    return this.props.id
  }

  get imageUrl(): string {
    return this.props.imageUrl
  }

  get altText(): string {
    return this.props.altText
  }

  get figcaptionText(): string {
    return this.props.figcaptionText
  }

  get size(): PictureSize {
    return this.props.size
  }

  get variants(): Omit<PictureProps, 'variants'>[] {
    return this.props.variants
  }
}
