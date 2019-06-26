import * as d3 from 'd3';

import { IData } from '@app/models';

const diagonal = d3
  .linkHorizontal<d3.HierarchyPointLink<IData>, d3.HierarchyPointNode<IData>>()
  .x((d) => d.y)
  .y((d) => d.x);

export const render = (
  container: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  root: d3.HierarchyPointNode<IData>
) => {
  const link = container
    .append('g')
    .classed('link', true)
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .attr('d', diagonal);

  const node = container
    .append('g')
    .classed('node', true)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants())
    .join('g')
    .attr('transform', (d) => `translate(${d.y},${d.x})`);

  node
    .append('circle')
    .attr('fill', (d) => (d.children ? '#555' : '#999'))
    .attr('r', 2.5);

  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', (d) => (d.children ? -6 : 6))
    .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .text((d) => d.data.name)
    .clone(true)
    .lower()
    .attr('stroke', 'white');
};
