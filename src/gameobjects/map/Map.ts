import Phaser from 'phaser'
import { MapEditorEditingSubject, MapEditorViewModel } from '../../scenes/MapEditorViewModel'
import { MEMap } from '../../usecases/mapeditor/MEMap'
import { range } from '../../utils/Range'
import { Subscription } from 'rxjs'
import { MapChip } from './MapChip'

export class Map extends Phaser.GameObjects.Container {
  private current: MEMap | null = null
  private chipList: Array<MapChip> = []

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number,
    private mapEditorViewModel: MapEditorViewModel
  ) {
    super(scene, x, y)
    const composite = new Subscription()

    this.on('addedtoscene', () => {
      composite.add(this.mapEditorViewModel.map.subscribe(next => {
        if (!next) return
        this.setMap(next)
      }))

      composite.add(this.mapEditorViewModel.editingSubject.subscribe(next => {
        this.updateEditing(next)
      }))
    })
    this.on('removedfromscene', () => {
      composite.unsubscribe()
    })
  }

  private setMap (
    map: MEMap
  ) {
    if (this.current == null) {
      this.current = map

      const chipSize = 500 / 20
      const mapX0 = -250
      const mapY0 = -250

      for (const yIndex of range(0, map.height)) {
        for (const xIndex of range(0, map.width)) {
          const floor = map.getFloor(xIndex, yIndex)
          const walls = map.getWalls(xIndex, yIndex)
          const chipX0 = mapX0 + chipSize * xIndex + chipSize / 2
          const chipY0 = mapY0 + chipSize * yIndex + chipSize / 2

          const mapChip = new MapChip(
            this.scene,
            chipX0,
            chipY0,
            chipSize,
            floor,
            walls,
            () => {
              this.mapEditorViewModel.onClickMapChip(xIndex, yIndex)
            }
          )
          this.scene.add.existing(mapChip)
          this.add(mapChip)

          this.chipList.push(mapChip)
        }
      }
    } else {
      for (const yIndex of range(0, map.height)) {
        for (const xIndex of range(0, map.width)) {
          const floor = map.getFloor(xIndex, yIndex)
          const index = yIndex * map.width + xIndex
          const mapChip = this.chipList[index]
          mapChip.update(floor)
        }
      }
    }
  }

  updateEditing (editing: MapEditorEditingSubject) {
    this.chipList.forEach(it => it.updateEditing(editing))
  }
}
