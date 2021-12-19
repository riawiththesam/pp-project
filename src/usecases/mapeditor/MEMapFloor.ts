import { MEMapFloorType, numberToType } from './MEMapFloorType'

export class MEMapFloor {
  constructor (
    public width: number,
    public height: number,
    public raw: Array<number>
  ) {}

  getType (x: number, y: number): MEMapFloorType {
    const index = this.width * y + x
    return numberToType(this.raw[index])
  }

  getRow (y: number): Array<MEMapFloorType> {
    const index0 = this.width * y
    const row = this.raw.slice(index0, index0 + this.width)
    return row.map((it) => numberToType(it))
  }
}
