export type PictureSizeType =
  | 'TINY'
  | 'SMALL'
  | 'MEDIUM'
  | 'LARGE'
  | 'EXTRA_LARGE'

export class PictureSize {
  constructor(private readonly value: PictureSizeType) {
    if (!['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'].includes(value)) {
      throw new Error('Invalid picture size')
    }
  }

  getValue(): PictureSizeType {
    return this.value
  }
}
