import { linkHorizontal as d3linkHorizontal } from 'd3-shape';

import { IData } from '@app/models';

export const getLinkLine = d3linkHorizontal<d3.HierarchyPointLink<IData>, d3.HierarchyPointNode<IData>>()
  .x((d) => d.y)
  .y((d) => d.x);

export const getVerticalDimensions = <T>(root: d3.HierarchyPointNode<T>) => {
  let y0 = Infinity;
  let y1 = -y0;
  root.each((d) => {
    if (d.x > y1) {
      y1 = d.x;
    }
    if (d.x < y0) {
      y0 = d.x;
    }
  });
  return [y0, y1];
};
