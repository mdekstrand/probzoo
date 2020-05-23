use wasm_bindgen::prelude::*;
use libm;

use core::f64::consts::PI;

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

fn _linspace(start: f64, end: f64, n: usize)-> Vec<f64> {
  let mut out = Vec::with_capacity(n);
  let n_f = n as f64;
  let gap = (end - start) / (n_f - 1.0);
  for i in 0..n {
    let i_f = i as f64;
    out.push(start + i_f * gap);
  }
  if n > 1 && end > start && out[n-1] > end {
    out[n-1] = end;
  }
  if n > 1 && start > end && out[n-1] < end {
    out[n-1] = end;
  }
  out
}

#[wasm_bindgen]
pub fn linspace(start: f64, end: f64, n: usize)-> Box<[f64]> {
  _linspace(start, end, n).into_boxed_slice()
}

#[wasm_bindgen]
pub struct ContinuousCurve {
  xs: Vec<f64>,
  ys: Vec<f64>
}

#[wasm_bindgen]
impl ContinuousCurve {
  pub fn get_xs(&self) -> Box<[f64]> {
    self.xs.clone().into_boxed_slice()
  }

  pub fn get_ys(&self) -> Box<[f64]> {
    self.ys.clone().into_boxed_slice()
  }
}

#[wasm_bindgen]
pub fn normal_pdf(mean: f64, sd: f64, start: f64, end: f64, n: usize) -> ContinuousCurve {
  let recip_sqpi = 1.0 / libm::sqrt(2.0 * PI);
  let recip_sd = 1.0 / sd;
  let xs = _linspace(start, end, n);
  let mut ys = Vec::with_capacity(n);
  let recip_scale = recip_sqpi * recip_sd;
  for i in 0..n {
    let mut val = (xs[i] - mean) * recip_sd;
    val = val * val * -0.5;
    ys.push(libm::exp(val) * recip_scale);
  }
  ContinuousCurve {
    xs: xs, ys: ys
  }
}

#[test]
fn test_linspace_empty() {
  let ls = _linspace(0.0, 1.0, 0);
  assert_eq!(ls.len(), 0);
}

#[test]
fn test_linspace_0_1() {
  let ls = _linspace(0.0, 1.0, 11);
  assert_eq!(ls.len(), 11);
  assert_eq!(ls[0], 0.0);
  assert_eq!(ls[10], 1.0);
  assert_eq!(ls[1], 0.1);
}
