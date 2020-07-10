use crate::curve::ContinuousCurve;
use crate::util::linspace;

pub trait ContinuousDist {
  fn vis_lb(&self) -> f64;
  fn vis_ub(&self) -> f64;
  fn pdf(&self, x: f64) -> f64;
}

pub fn pdf_curve(dist: &dyn ContinuousDist, start: f64, end: f64, n: usize) -> ContinuousCurve {
  let xs = linspace(start, end, n);
  let mut ys = Vec::with_capacity(n);
  for i in 0..n {
    ys.push(dist.pdf(xs[i]));
  }
  ContinuousCurve::create(xs, ys)
}

pub fn pdf_auto_curve(dist: &dyn ContinuousDist, n: usize) -> ContinuousCurve {
  let start = dist.vis_lb();
  let end = dist.vis_ub();
  pdf_curve(dist, start, end, n)
}

pub mod normal;
pub mod beta;
