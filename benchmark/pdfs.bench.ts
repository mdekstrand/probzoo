import { benchmark, suite } from '@dynatrace/zakzak';
import * as jsa from '../js/arrays';
import { Normal } from '../js/normal'
import * as rsa from '../pkg/probzoo';

suite("Normal Dist", () => {
  let dist = new Normal(0, 1);
  benchmark("JavaScript", () => {
    let xs = jsa.linspace(-5, 5, 1000);
    let ys = dist.densities(xs);
  });

  benchmark("Rust", () => {
    let curve = rsa.normal_pdf(0, 1, -5, 5, 1000);
    let xs = curve.get_xs();
    let ys = curve.get_ys();
    curve.free();
  });
});
