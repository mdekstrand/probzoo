export class RealParam {
  constructor(label, bounds) {
    this.label = label;
    this.bounds = bounds;
    if (bounds) {
      this.lowerBound = bounds[0];
      this.upperBound = bounds[1];
    }
  }
}

export function real(label, bounds) {
  return new RealParam(label, bounds);
}
