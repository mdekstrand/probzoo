use wasm_bindgen::prelude::*;
use core::f64::consts::PI;

use serde::{Serialize, Deserialize};
use serde_wasm_bindgen::from_value;

use crate::curve::{CurveSpec};
use super::ContinuousDist;

const CRIT_995: f64 = 2.575829;
const CRIT_9995: f64 = 3.290527;

#[derive(Serialize, Deserialize)]
pub struct NormalParams {
  pub mean: f64,
  pub sd: f64
}

pub struct NormalDist {
  mean: f64,
  sd: f64,
  recip_sqpi: f64,
  recip_sd: f64,
  recip_scale: f64
}

impl NormalDist {
  pub fn create(params: &NormalParams) -> NormalDist {
    let recip_sqpi = 1.0 / libm::sqrt(2.0 * PI);
    let recip_sd = 1.0 / params.sd;
    NormalDist {
      mean: params.mean,
      sd: params.sd,
      recip_sqpi, recip_sd,
      recip_scale: recip_sqpi * recip_sd
    }
  }

  fn destandardize(&self, x: f64) -> f64 {
    x * self.sd + self.mean
  }
}

impl ContinuousDist for NormalDist {
  fn vis_lb(&self) -> f64 {
    self.destandardize(-CRIT_9995)
  }
  fn vis_ub(&self) -> f64 {
    self.destandardize(CRIT_9995)
  }
  fn pdf(&self, x: f64) -> f64 {
    let mut val = (x - self.mean) * self.recip_sd;
    val = val * val * -0.5;
    libm::exp(val) * self.recip_scale
  }
}

#[wasm_bindgen]
pub fn normal_density(params: JsValue, x: f64) -> f64 {
  let params: NormalParams = from_value(params).unwrap();
  let dist = NormalDist::create(&params);
  dist.pdf(x)
}

#[wasm_bindgen]
pub fn normal_densities(params: JsValue, spec: JsValue) -> JsValue {
  let params: NormalParams = from_value(params).unwrap();
  let spec = CurveSpec::from_js(spec);
  let dist = NormalDist::create(&params);
  let curve = match spec.bounds() {
    Some((lb, ub)) => dist.pdf_curve(lb, ub, spec.n),
    _ => dist.pdf_auto_curve(spec.n)
  };
  curve.to_js()
}
