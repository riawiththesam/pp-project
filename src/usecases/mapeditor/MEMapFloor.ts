import { MEMapFloorType, numberToType, typeToNumber } from './MEMapFloorType'

export class MEMapFloor {
  constructor (
    public width: number,
    public height: number,
    public raw: Array<number>
  ) {}

  getRow (y: number): Array<MEMapFloorType> {
    const index0 = this.width * y
    const row = this.raw.slice(index0, index0 + this.width)
    return row.map((it) => numberToType(it))
  }

  update (x: number, y: number, value: MEMapFloorType): MEMapFloor {
    const rawIndex = y * this.width + x
    const next = this.raw.slice(0, this.raw.length)
    next[rawIndex] = typeToNumber(value)
    return new MEMapFloor(this.width, this.height, next)
  }
}
