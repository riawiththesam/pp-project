export type Empty = 'empty'
export type Floor = 'floor'

export type MEMapFloorType = Empty | Floor

export const numberToType = (n: number): MEMapFloorType => {
  switch (n) {
    case 0: {
      return 'empty'
    }
    case 1: {
      return 'floor'
    }
  }
  throw Error('floorを解釈できませんでした')
}
