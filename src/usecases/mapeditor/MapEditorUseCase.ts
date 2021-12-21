import { MEMap } from './MEMap'

export type MEMapWallItem = {
  raw: Array<number>
}

export type MEMapWall = {
  raw: Array<MEMapWallItem>
}

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

    return new MEMap(
      width,
      height,
      floor,
      { raw: [] },
      { raw: [] }
    )
  }
}
