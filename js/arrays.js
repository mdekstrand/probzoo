export function empty() {
  return new Float64Array(0);
}

export function linspace(start, stop, num) {
  let out = new Float64Array(num);
  let gap = start != stop ? (stop - start) / (num - 1) : 0;
  for (let i = 0; i < num - 1; i++) {
    out[i] = start + i * gap;
  }
  out[num-1] = stop;
  return out;
}

export function makeRandom(size) {
  let arr = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.random();
  }
  return arr;
}

export function axpy(a, x, y) {
  let n = x.length;
  for (let i = 0; i < n; i++) {
    y[i] = y[i] + x[i] * a;
  }
}

export function add(a, x, y) {
  let n = x.length;
  let out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    out[i] = y[i] + x[i] * a;
  }
  return out;
}
