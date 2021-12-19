import Phaser from 'phaser'
import './main.css'
import MyScene from './scenes/MyScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT
  },
  scene: MyScene
}
// eslint-disable-next-line no-new
new Phaser.Game(config)
