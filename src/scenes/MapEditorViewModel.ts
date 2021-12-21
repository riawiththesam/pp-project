import { BehaviorSubject } from 'rxjs'
import { MEMap } from '../usecases/mapeditor/MEMap'
import { MapEditorUseCase } from '../usecases/mapeditor/MapEditorUseCase'

export class MapEditorViewModel {
  public map = new BehaviorSubject<MEMap>(MEMap.creatEmpty())

  constructor (
    private mapEditorUseCase: MapEditorUseCase
  ) {
  }

  load () {
    const next = this.mapEditorUseCase.load()
    this.map.next(next)
  }

  onClickMapChip (current: MEMap, xIndex: number, yIndex: number) {
    const next = current.updateFloor(xIndex, yIndex, 'empty')
    this.map.next(next)
  }
}
