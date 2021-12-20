import Phaser from 'phaser'
import { MapEditorIntaractor } from '../usecases/mapeditor/MapEditorUseCase'
import { Map } from '../gameobjects/map/Map'
import { MapEditorViewModel } from './MapEditorViewModel'

export default class MapEditorScene extends Phaser.Scene {
  private mapEditorViewModel = new MapEditorViewModel(MapEditorIntaractor)

  constructor () {
    super({ key: 'pp-map-editor' })
  }

  preload () {
    this.load.image('background', '/assets/backgrounds/grass.jpg')
  }

  create () {
    const { width, height } = this.sys.game.scale.canvas
    this.mapEditorViewModel.load()

    this.add.image(width / 2, height / 2, 'background')

    const mapX = (width / 2) - 100
    this.add.existing(new Map(this, mapX, height / 2, this.mapEditorViewModel))
  }
}
