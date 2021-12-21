import Phaser from 'phaser'
import { MEMapFloorType } from '../../usecases/mapeditor/MEMapFloorType'

function floorTypeToColor (floorType: MEMapFloorType): number {
  switch (floorType) {
    case 'empty': return 0x90ee90
    case 'floor': return 0x622d18
  }
}

export type OnClickMapChip = () => void

export class MapChip extends Phaser.GameObjects.Container {
  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number,
    chipSize: number,
    floor: MEMapFloorType,
    onClick: OnClickMapChip
  ) {
    super(scene, x, y)

    const rect = this.scene.add.rectangle(chipSize / 2, chipSize / 2, chipSize, chipSize, floorTypeToColor(floor))

    rect.setInteractive()
    rect.on('pointerup', () => { onClick() })

    this.add(rect)
  }
}
