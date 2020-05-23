use wasm_bindgen::prelude::*;

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
