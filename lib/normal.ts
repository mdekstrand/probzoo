import { ContinuousDistribution } from './distribution';

const SQRT_2PI = Math.sqrt(2 * Math.PI);

function _norm_pdf(mean, sd, x) {
  let recip_sd = 1.0 / sd
  let recip_scale = recip_sd / SQRT_2PI;
  let val = (x - mean) * recip_sd;
  val = val * val * -0.5;
  val = Math.exp(val);
  return val * recip_scale;
}

export class Normal implements ContinuousDistribution {
  min: number = -Infinity;
  max: number = Infinity;
  mean: number;
  sd: number;

  constructor(mean: number = 0, sd: number = 0) {
    this.mean = mean;
    this.sd = sd;
  }

  density(x) {
    return _norm_pdf(this.mean, this.sd, x);
  }

  densities(xs) {
    let mu = this.mean;
    let sd = this.sd;
    return Float64Array.from(xs, (x) => _norm_pdf(mu, sd, x));
  }
}
