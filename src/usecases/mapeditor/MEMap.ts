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
}
