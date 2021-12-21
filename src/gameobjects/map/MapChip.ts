import Phaser from 'phaser'
import { MapEditorEditingSubject } from '../../scenes/MapEditorViewModel'
import { MEMapFloorType } from '../../usecases/mapeditor/MEMapFloorType'
import { MEMapWallType } from '../../usecases/mapeditor/MEMapWallType'

function floorTypeToColor (floorType: MEMapFloorType): number {
  switch (floorType) {
    case 'empty': return 0x90ee90
    case 'floor': return 0x622d18
  }
}

function wallTypeToAlpha (wallType: MEMapWallType): number {
  if (wallType === 'none') return 0
  else return 1
}

export type OnClickMapChip = () => void

export class MapChip extends Phaser.GameObjects.Container {
  private rect: Phaser.GameObjects.Rectangle
  private walls: Array<Phaser.GameObjects.Rectangle> = []

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number,
    chipSize: number,
    floor: MEMapFloorType,
    wall: Array<MEMapWallType>,
    onClick: OnClickMapChip
  ) {
    super(scene, x, y)

    this.rect = this.scene.add.rectangle(0, 0, chipSize, chipSize, floorTypeToColor(floor))
    this.rect.setInteractive()
    this.rect.on('pointerup', () => { onClick() })

    this.add(this.rect)

    const wallColor = 0x00ff00

    const up = this.scene.add.rectangle(0, (-chipSize / 2) + 1, chipSize, 2, wallColor, wallTypeToAlpha(wall[0]))
    this.add(up)

    const down = this.scene.add.rectangle(0, (chipSize / 2) - 1, chipSize, 2, wallColor, wallTypeToAlpha(wall[2]))
    this.add(down)

    const right = this.scene.add.rectangle((chipSize / 2) - 1, 0, 2, chipSize, wallColor, wallTypeToAlpha(wall[1]))
    this.add(right)

    const left = this.scene.add.rectangle((-chipSize / 2) + 1, 0, 2, chipSize, wallColor, wallTypeToAlpha(wall[3]))
    this.add(left)
  }

  update (floor: MEMapFloorType) {
    this.rect.setFillStyle(floorTypeToColor(floor))
  }

  updateEditing (editing: MapEditorEditingSubject) {
    if (editing === 'floor') {
      this.rect.setInteractive()
    } else {
      this.rect.disableInteractive()
    }
  }
}
