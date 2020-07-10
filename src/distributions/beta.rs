use wasm_bindgen::prelude::*;

use serde::{Serialize, Deserialize};
use serde_wasm_bindgen::from_value;

use libm::{exp, log, lgamma};

use crate::curve::{CurveSpec};
use super::{ContinuousDist, pdf_curve, pdf_auto_curve};

#[derive(Serialize, Deserialize)]
pub struct BetaParams {
  pub alpha: f64,
  pub beta: f64
}

pub struct BetaDist {
  alpha: f64,
  beta: f64,
  log_rescale: f64,
}

impl BetaDist {
  pub fn create(params: &BetaParams) -> BetaDist {
    let sc_num = lgamma(params.alpha + params.beta);
    let sc_denom = lgamma(params.alpha) + lgamma(params.beta);
    let log_rescale = sc_num - sc_denom;
    BetaDist {
      alpha: params.alpha,
      beta: params.beta,
      log_rescale
    }
  }
}

impl ContinuousDist for BetaDist {
  fn vis_lb(&self) -> f64 {
    0.0
  }
  fn vis_ub(&self) -> f64 {
    1.0
  }
  fn pdf(&self, x: f64) -> f64 {
    let succ = log(x) * (self.alpha - 1.0);
    let fail = log(1.0 - x) * (self.beta - 1.0);
    exp(self.log_rescale + succ + fail)
  }
}

#[wasm_bindgen]
pub fn beta_density(params: JsValue, x: f64) -> f64 {
  let params: BetaParams = from_value(params).unwrap();
  let dist = BetaDist::create(&params);
  dist.pdf(x)
}

#[wasm_bindgen]
pub fn beta_densities(params: JsValue, spec: JsValue) -> JsValue {
  let params: BetaParams = from_value(params).unwrap();
  let spec = CurveSpec::from_js(spec);
  let dist = BetaDist::create(&params);
  let curve = match spec.bounds() {
    Some((lb, ub)) => pdf_curve(&dist, lb, ub, spec.n),
    _ => pdf_auto_curve(&dist, spec.n)
  };
  curve.to_js()
}
