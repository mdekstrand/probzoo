import { benchmark, suite } from '@dynatrace/zakzak';
import * as jsa from '../lib/arrays';
import * as rsa from '../wasm/probzoo';

suite("axpy", () => {
  let x = jsa.makeRandom(1000);
  let y = jsa.makeRandom(1000);

  benchmark("JavaScript", () => {
    let y2 = Float64Array.from(y);
    jsa.axpy(1.5, x, y2);
  });

  benchmark("Rust", () => {
    let y2 = Float64Array.from(y);
    rsa.axpy(1.5, x, y2);
  });
})
