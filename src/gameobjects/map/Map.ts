import Phaser from 'phaser'
import { MapEditorViewModel } from '../../scenes/MapEditorViewModel'
import { MEMap } from '../../usecases/mapeditor/MEMap'
import { MEMapFloorType } from '../../usecases/mapeditor/MEMapFloorType'
import { range } from '../../utils/Range'
import { Subscription } from 'rxjs'

function floorTypeToColor (floorType: MEMapFloorType): number {
  switch (floorType) {
    case 'empty': return 0x90ee90
    case 'floor': return 0x622d18
  }
}

export class Map extends Phaser.GameObjects.Container {
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
    const defaultColor = floorTypeToColor('empty')
    const background = this.scene.add.rectangle(0, 0, 500, 500, defaultColor)
    this.add(background)

    const chipSize = 500 / 20
    const mapX0 = -250
    const mapY0 = -250

    for (const yIndex of range(0, map.height)) {
      const row = map.getFloorRow(yIndex)
      row.forEach((item, xIndex) => {
        const chipX0 = mapX0 + chipSize * xIndex + chipSize / 2
        const chipY0 = mapY0 + chipSize * yIndex + chipSize / 2
        const chip = this.scene.add.rectangle(chipX0, chipY0, chipSize, chipSize, floorTypeToColor(item))
        chip.setInteractive()

        chip.on('pointerup', () => {
          this.mapEditorViewModel.onClickMapChip(map, xIndex, yIndex)
        })

        this.add(chip)
      })
    }
  }
}
