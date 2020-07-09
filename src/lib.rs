use wasm_bindgen::prelude::*;

pub mod util;
pub mod curve;
pub mod distributions;

#[wasm_bindgen]
pub fn axpy(a: f64, x: &[f64], y: &mut [f64]) {
  for i in 0..x.len() {
    y[i] += a * x[i];
  }
}

#[wasm_bindgen]
pub fn add(a: f64, x: &[f64], y: &[f64]) -> Box<[f64]> {
  let mut out = Vec::with_capacity(x.len());
  for i in 0..x.len() {
    out.push(y[i] + a * x[i]);
  }
  return out.into_boxed_slice();
}


#[wasm_bindgen]
pub fn linspace(start: f64, end: f64, n: usize)-> Box<[f64]> {
  util::linspace(start, end, n).into_boxed_slice()
}
