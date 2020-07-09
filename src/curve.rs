use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use serde_wasm_bindgen::{from_value, to_value};

use std::f64::{INFINITY, NEG_INFINITY};

#[derive(Serialize, Deserialize)]
pub struct CurveSpec {
  pub lower: Option<f64>,
  pub upper: Option<f64>,
  pub n: usize
}

impl CurveSpec {
  pub fn from_js(js: JsValue) -> CurveSpec {
    from_value(js).unwrap()
  }

  pub fn bounds(&self) -> Option<(f64, f64)> {
    match (self.lower, self.upper) {
      (Some(lb), Some(ub)) => Some((lb, ub)),
      _ => None
    }
  }
}

#[derive(Serialize, Deserialize)]
pub struct Point {
  pub x: f64,
  pub y: f64
}

#[derive(Serialize, Deserialize)]
pub struct ContinuousCurve {
  pub xmin: f64,
  pub xmax: f64,
  pub ymin: f64,
  pub ymax: f64,
  pub points: Vec<Point>
}

impl ContinuousCurve {
  pub fn with_capacity(capacity: usize) -> ContinuousCurve {
    ContinuousCurve {
      xmin: INFINITY,
      xmax: NEG_INFINITY,
      ymin: INFINITY,
      ymax: NEG_INFINITY,
      points: Vec::with_capacity(capacity)
    }
  }

  pub fn create(xs: Vec<f64>, ys: Vec<f64>) -> ContinuousCurve {
    let mut curve = ContinuousCurve::with_capacity(xs.len());
    for i in 0..xs.len() {
      curve.add_point(xs[i], ys[i]);
    }
    curve
  }

  pub fn add_point(&mut self, x: f64, y: f64) {
    self.points.push(Point {
      x, y
    });
    if x < self.xmin {
      self.xmin = x;
    }
    if x > self.xmax {
      self.xmax = x;
    }
    if y < self.ymin {
      self.ymin = y;
    }
    if y > self.ymax {
      self.ymax = y;
    }
  }

  pub fn to_js(&self) -> JsValue {
    to_value(self).unwrap()
  }
}
