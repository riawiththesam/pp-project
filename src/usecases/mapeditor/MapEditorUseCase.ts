import { range } from '../../utils/Range'
import { MEMap } from './MEMap'

export type MEMapCorner = {
  raw: Array<number>
}

export type MapEditorUseCase = {
  load(): MEMap
}

function getRandomInt (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

export const MapEditorIntaractor: MapEditorUseCase = {
  load: function (): MEMap {
    const width = 20
    const height = 20
    const floor = Array<number>(width * height).fill(1)
    const wall = [...range(0, 20 * 20)]
      .map(() => [...range(0, 4)]
        .map(() => getRandomInt(0, 2))
      )

    return new MEMap(
      width,
      height,
      floor,
      wall,
      { raw: [] }
    )
  }
}
