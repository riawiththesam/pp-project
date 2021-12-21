import Phaser from 'phaser'
import { MapEditorViewModel } from '../../scenes/MapEditorViewModel'
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
        this.setMap(next)
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
        const row = map.getFloorRow(yIndex)

        row.forEach((item, xIndex) => {
          const chipX0 = mapX0 + chipSize * xIndex
          const chipY0 = mapY0 + chipSize * yIndex

          const mapChip = new MapChip(this.scene, chipX0, chipY0, chipSize, item, () => {
            this.mapEditorViewModel.onClickMapChip(map, xIndex, yIndex)
          })
          this.scene.add.existing(mapChip)
          this.add(mapChip)

          this.chipList.push(mapChip)
        })
      }
    } else {
      console.log(map)

      for (const yIndex of range(0, map.height)) {
        const row = map.getFloorRow(yIndex)

        row.forEach((item, xIndex) => {
          const index = yIndex * map.width + xIndex
          const mapChip = this.chipList[index]
          mapChip.update(item)
        })
      }
    }
  }
}
