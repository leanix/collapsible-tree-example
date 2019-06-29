export interface IChartData {
  name: string;
  children: IChartData;
}

export interface IChartDimension {
  minY: number;
  maxY: number;
  minX: number;
  maxX: number;
}
