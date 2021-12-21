import { BehaviorSubject } from 'rxjs'
import { MEMap } from '../usecases/mapeditor/MEMap'
import { MapEditorUseCase } from '../usecases/mapeditor/MapEditorUseCase'

export type MapEditorEditingSubjectFloor = 'floor'
export type MapEditorEditingSubjectWall = 'wall'
export type MapEditorEditingSubject = MapEditorEditingSubjectFloor | MapEditorEditingSubjectWall

export class MapEditorViewModel {
  public editingSubject = new BehaviorSubject<MapEditorEditingSubject>('floor')
  public map = new BehaviorSubject<MEMap | null>(null)

  constructor (
    private mapEditorUseCase: MapEditorUseCase
  ) {
  }

  load () {
    const next = this.mapEditorUseCase.load()
    this.map.next(next)
  }

  onClickMapChip (xIndex: number, yIndex: number) {
    const current = this.map.value
    if (!current) return
    const next = current.updateFloor(xIndex, yIndex, 'empty')
    this.map.next(next)
  }

  onClickButton () {
    const current = this.editingSubject.value
    let next: MapEditorEditingSubject = 'floor'
    if (current === 'floor') {
      next = 'wall'
    } else {
      next = 'floor'
    }
    console.log('set ' + next)
    this.editingSubject.next(next)
  }
}
