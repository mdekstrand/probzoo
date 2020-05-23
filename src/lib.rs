use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn axpy(a: f64, x: &[f64], y: &mut [f64]) {
    assert_eq!(x.len(), y.len());
    for i in 0..x.len() {
        y[i] += a * x[i];
    }
}