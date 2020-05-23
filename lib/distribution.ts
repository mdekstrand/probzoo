export interface ContinuousDistribution {
  min: number,
  max: number,
  density(x: number): number;
}
