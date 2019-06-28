export interface IData {
  id: string;
  name: string;
  children: IData[];
  _children?: Array<d3.HierarchyNode<IData>>;
}
