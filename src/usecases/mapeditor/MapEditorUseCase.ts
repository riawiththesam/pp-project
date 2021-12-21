import { range } from '../../utils/Range'
import { MEMap } from './MEMap'

export type MEMapCorner = {
  raw: Array<number>
}

export type MapEditorUseCase = {
  load(): MEMap
}

export const MapEditorIntaractor: MapEditorUseCase = {
  load: function (): MEMap {
    const width = 20
    const height = 20
    const floor = Array<number>(width * height).fill(1)
    const wall = [...range(0, 20 * 20)]
      .map(() => [...range(0, 4)]
        .map(() => 1)
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
