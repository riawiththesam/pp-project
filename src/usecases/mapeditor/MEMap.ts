import { MEMapCorner } from './MapEditorUseCase'
import { MEMapFloorType, numberToType, typeToNumber } from './MEMapFloorType'

export class MEMap {
  constructor (
    public width: number,
    public height: number,
    public rawFloor: Array<number>,
    public rawWall: Array<Array<number>>,
    public corner: MEMapCorner
  ) {
  }

  getFloor (x: number, y: number): MEMapFloorType {
    const index = this.width * y + x
    return numberToType(this.rawFloor[index])
  }

  // TODO return WallType
  getWalls (x: number, y: number): Array<number> {
    const index = this.width * y + x
    return this.rawWall[index]
  }

  updateFloor (x: number, y: number, value: MEMapFloorType): MEMap {
    const rawIndex = y * this.width + x
    const next = this.rawFloor.slice(0, this.rawFloor.length)
    next[rawIndex] = typeToNumber(value)
    return new MEMap(this.width, this.height, next, this.rawWall, this.corner)
  }
}
