import { real } from './params';

let probzoo = import('../pkg/probzoo');

export class Normal {
  constructor(mean, sd) {
    this.mean = mean || 0;
    this.sd = sd || 1;
  }

  async density(x) {
    let zoo = await probzoo;
    return zoo.normal_density(this, x);
  }

  async densities(spec) {
    let zoo = await probzoo;
    return zoo.normal_densities(this, spec);
  }
}

Normal.prototype.params = {
  mean: real('\\(\\mu\\)'),
  sd: real('\\(\\sigma\\)', [1.0e-10, null])
}
