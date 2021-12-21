import Phaser from 'phaser'
import { PhaserProps } from '../phaserutils/PhaserProps'

type OnClick = () => void

export type ButtonProps = {
  texture: string
  onClick?: OnClick
} & PhaserProps

export class Button extends Phaser.GameObjects.Container {
  constructor (
    props: ButtonProps
  ) {
    const {
      scene,
      x,
      y,
      texture,
      onClick
    } = props
    super(scene, x, y)

    const image = scene.add.image(0, 0, texture)
    image.setInteractive({ useHandCursor: true })

    if (onClick) {
      image.on('pointerdown', () => onClick())
    }

    this.add(image)
  }
}
