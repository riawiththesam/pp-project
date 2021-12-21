import Phaser from 'phaser'
import { MapEditorEditingSubject } from '../../scenes/MapEditorViewModel'
import { MEMapFloorType } from '../../usecases/mapeditor/MEMapFloorType'
import { MEMapWallType } from '../../usecases/mapeditor/MEMapWallType'
import { PhaserProps } from '../phaserutils/PhaserProps'

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

export type WallDirectionUp = 'up'
export type WallDirectionDown = 'down'
export type WallDirectionLeft = 'left'
export type WallDirectionRight = 'right'
export type WallDirectionType = WallDirectionUp | WallDirectionDown | WallDirectionLeft | WallDirectionRight

export type OnClickWall = (direction: WallDirectionType) => void

export type MapChipProps = {
  chipSize: number
  floor: MEMapFloorType
  walls: Array<MEMapWallType>
  onClick: OnClickMapChip
  onClickWall: OnClickWall
} & PhaserProps

export class MapChip extends Phaser.GameObjects.Container {
  private rect: Phaser.GameObjects.Rectangle
  private up: Phaser.GameObjects.Rectangle
  private down: Phaser.GameObjects.Rectangle
  private left: Phaser.GameObjects.Rectangle
  private right: Phaser.GameObjects.Rectangle

  constructor (props: MapChipProps) {
    const {
      scene,
      x,
      y,
      chipSize,
      floor,
      walls,
      onClick,
      onClickWall
    } = props

    super(scene, x, y)

    this.rect = this.scene.add.rectangle(0, 0, chipSize, chipSize, floorTypeToColor(floor))
    this.rect.setInteractive()
    this.rect.on('pointerup', () => { onClick() })

    this.add(this.rect)

    const wallColor = 0x00ff00

    this.up = this.scene.add.rectangle(0, (-chipSize / 2) + 1, chipSize, 2, wallColor, wallTypeToAlpha(walls[0]))
    this.up.setInteractive()
    this.up.on('pointerdown', () => { onClickWall('up') })
    this.add(this.up)

    this.down = this.scene.add.rectangle(0, (chipSize / 2) - 1, chipSize, 2, wallColor, wallTypeToAlpha(walls[2]))
    this.down.setInteractive()
    this.down.on('pointerdown', () => { onClickWall('down') })
    this.add(this.down)

    this.right = this.scene.add.rectangle((chipSize / 2) - 1, 0, 2, chipSize, wallColor, wallTypeToAlpha(walls[1]))
    this.right.setInteractive()
    this.right.on('pointerdown', () => { onClickWall('right') })
    this.add(this.right)

    this.left = this.scene.add.rectangle((-chipSize / 2) + 1, 0, 2, chipSize, wallColor, wallTypeToAlpha(walls[3]))
    this.left.setInteractive()
    this.left.on('pointerdown', () => { onClickWall('left') })
    this.add(this.left)
  }

  update (floor: MEMapFloorType) {
    this.rect.setFillStyle(floorTypeToColor(floor))
  }

  updateEditing (editing: MapEditorEditingSubject) {
    const list = [this.up, this.down, this.left, this.right]
    if (editing === 'floor') {
      this.rect.setInteractive()
      const list = [this.up, this.down, this.left, this.right]
      list.forEach(it => it.disableInteractive())
    } else {
      this.rect.disableInteractive()
      list.forEach(it => it.setInteractive())
    }
  }
}
