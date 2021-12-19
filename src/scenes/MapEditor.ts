import Phaser from 'phaser'
import { MapEditorIntaractor, MapEditorUseCase } from '../usecases/mapeditor/MapEditorUseCase'
import { Map } from '../gameobjects/map/Map'
import { MEMap } from '../usecases/mapeditor/MEMap'

export default class MapEditorScene extends Phaser.Scene {
  private usecase: MapEditorUseCase = MapEditorIntaractor
  private meMap!: MEMap

  constructor () {
    super({ key: 'pp-map-editor' })
  }

  preload () {
    this.load.image('background', '/assets/backgrounds/grass.jpg')
    this.meMap = this.usecase.load()
  }

  create () {
    const { width, height } = this.sys.game.scale.canvas
    console.log(this.meMap)

    this.add.image(width / 2, height / 2, 'background')
    const map = this.add.existing(new Map(this, width / 2, height / 2))
    map.setMap(this.meMap)
  }
}
