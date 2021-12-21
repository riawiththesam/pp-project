import { MEMapCorner, MEMapWall } from './MapEditorUseCase'
import { MEMapFloorType, numberToType, typeToNumber } from './MEMapFloorType'

export class MEMap {
  constructor (
    public width: number,
    public height: number,
    public rawFloor: Array<number>,
    public wall: MEMapWall,
    public corner: MEMapCorner
  ) {
  }

  static creatEmpty = () => new MEMap(
    0,
    0,
    [],
    { raw: [] },
    { raw: [] }
  )

  getFloorRow (y: number): Array<MEMapFloorType> {
    const index0 = this.width * y
    const row = this.rawFloor.slice(index0, index0 + this.width)
    return row.map((it) => numberToType(it))
  }

  update (floor: Array<number>) {
    return new MEMap(
      this.width,
      this.height,
      floor,
      this.wall,
      this.corner
    )
  }

  updateFloor (x: number, y: number, value: MEMapFloorType): MEMap {
    const rawIndex = y * this.width + x
    const next = this.rawFloor.slice(0, this.rawFloor.length)
    next[rawIndex] = typeToNumber(value)
    return new MEMap(this.width, this.height, next, this.wall, this.corner)
  }
}
