export interface IData {
  name: string;
  children: IData[];
  _children?: Array<d3.HierarchyNode<IData>>;
}
