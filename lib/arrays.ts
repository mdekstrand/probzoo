export function empty(): Float64Array {
  return new Float64Array(0);
}

export function makeRandom(size): Float64Array {
  let arr = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.random();
  }
  return arr;
}

export function axpy(a: number, x: Float64Array, y: Float64Array) {
  let n = x.length;
  for (let i = 0; i < n; i++) {
    y[i] = y[i] + x[i] * a;
  }
}
