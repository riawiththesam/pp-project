import { MEMapCorner, MEMapWall } from './MapEditorUseCase'
import { MEMapFloor } from './MEMapFloor'

export class MEMap {
  constructor (
    public width: number,
    public height: number,
    public floor: MEMapFloor,
    public wall: MEMapWall,
    public corner: MEMapCorner
  ) {
  }

  static creatEmpty = () => new MEMap(
    0,
    0,
    new MEMapFloor(0, 0, []),
    { raw: [] },
    { raw: [] }
  )

  update (floor: MEMapFloor) {
    return new MEMap(
      this.width,
      this.height,
      floor,
      this.wall,
      this.corner
    )
  }
}
