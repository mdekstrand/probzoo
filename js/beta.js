let probzoo = import('../pkg/probzoo');

export class Beta {
  constructor(alpha, beta) {
    this.alpha = alpha || 2;
    this.beta = beta || 2;
  }

  async density(x) {
    let zoo = await probzoo;
    return zoo.beta_density(this, x);
  }

  async densities(spec) {
    let zoo = await probzoo;
    return zoo.beta_densities(this, spec);
  }
}
