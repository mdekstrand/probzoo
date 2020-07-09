export interface CurveSpec {
  lower?: number,
  upper?: number,
  n: number
}

export interface Point {
  x: number,
  y: number
}

export interface ContinuousCurve {
  xmin, xmax, ymin, ymax: number
  points: Point[]
}

export interface ContinuousDistribution {
  min: number,
  max: number,
  density(x: number): number;
  densities(spec: CurveSpec): Promise<ContinuousCurve>;
}
