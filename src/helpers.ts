import * as d3 from 'd3';

import { IData } from '@app/models';

export const getLinkLine = d3
  .linkHorizontal<d3.HierarchyPointLink<IData>, d3.HierarchyPointNode<IData>>()
  .x((d) => d.y)
  .y((d) => d.x);
