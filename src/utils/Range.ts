export function * range (from: number, to: number, step = 1) {
  while (from < to) {
    yield from
    from += step
  }
}
