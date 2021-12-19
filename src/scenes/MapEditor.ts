import Phaser from 'phaser'
import { MapEditorIntaractor, MapEditorUseCase } from '../usecases/mapeditor/MapEditorUseCase'
import { Map } from '../gameobjects/map/Map'

export default class MapEditorScene extends Phaser.Scene {
  private usecase: MapEditorUseCase = MapEditorIntaractor

  constructor () {
    super({ key: 'pp-map-editor' })
  }

  preload () {
    this.load.image('background', '/assets/backgrounds/grass.jpg')
  }

  create () {
    const { width, height } = this.sys.game.scale.canvas
    const meMap = this.usecase.load()
    console.log(meMap)

    this.add.image(width / 2, height / 2, 'background')
    const map = this.add.existing(new Map(this, width / 2, height / 2))
    map.setMap(meMap, this.onClickMapChip)
  }

  onClickMapChip (xIndex: number, yIndex: number) {
    console.log(`test ${yIndex} ${xIndex}`)
  }
}
