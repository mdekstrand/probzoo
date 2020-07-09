const SQRT_2PI = Math.sqrt(2 * Math.PI);

function _norm_pdf(mean, sd, x) {
  let recip_sd = 1.0 / sd
  let recip_scale = recip_sd / SQRT_2PI;
  let val = (x - mean) * recip_sd;
  val = val * val * -0.5;
  val = Math.exp(val);
  return val * recip_scale;
}

export class Normal {
  constructor(mean, sd) {
    this.mean = mean || 0;
    this.sd = sd || 1;
  }

  density(x) {
    return _norm_pdf(this.mean, this.sd, x);
  }

  async densities(spec) {
    let probzoo = await import('../pkg/probzoo');
    return probzoo.normal_densities(this, spec);
  }
}
