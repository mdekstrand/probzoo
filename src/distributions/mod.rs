use wasm_bindgen::prelude::*;
use crate::curve::ContinuousCurve;
use crate::util::linspace;

pub trait ContinuousDist {
  fn vis_lb(&self) -> f64;
  fn vis_ub(&self) -> f64;
  fn pdf(&self, x: f64) -> f64;

  fn pdf_curve(&self, start: f64, end: f64, n: usize) -> ContinuousCurve {
    let xs = linspace(start, end, n);
    let mut ys = Vec::with_capacity(n);
    for i in 0..n {
      ys.push(self.pdf(xs[i]));
    }
    ContinuousCurve::create(xs, ys)
  }
  fn pdf_auto_curve(&self, n: usize) -> ContinuousCurve {
    let start = self.vis_lb();
    let end = self.vis_ub();
    self.pdf_curve(start, end, n)
  }
}

pub mod normal;
