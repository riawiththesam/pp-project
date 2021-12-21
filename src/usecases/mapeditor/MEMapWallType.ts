export type MEMapWallTypeNone = 'none'
export type MEMapWallTypeWall = 'wall'

export type MEMapWallType = MEMapWallTypeNone | MEMapWallTypeWall

export const numberToWallType = (n: number): MEMapWallType => {
  switch (n) {
    case 0: return 'none'
    case 1: return 'wall'
  }
  throw Error('Wallの変換に失敗')
}
