import * as d3 from 'd3';

import { NODE_HEIGHT, NODE_WIDTH } from '@app/constants';
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
    .attr('d', (d) => diagonal({ ...d, source: { ...d.source, y: d.source.y + NODE_WIDTH } }));

  const node = container
    .append('g')
    .classed('node', true)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants())
    .join('g')
    .attr('transform', (d) => `translate(${d.y},${d.x})`)
    .on('mouseover', (d, i, nodes) => {
      d3.select(nodes[i])
        .select('rect')
        .attr('fill', '#999');
    })
    .on('mouseout', (d, i, nodes) => {
      d3.select(nodes[i])
        .select('rect')
        .attr('fill', 'none');
    });

  node
    .append('circle')
    .filter((d) => Boolean(d.parent))
    .attr('fill', (d) => (d.children ? '#555' : '#999'))
    .attr('r', 4);

  node
    .append('circle')
    .filter((d) => Boolean(d.children))
    .attr('cx', NODE_WIDTH)
    .attr('fill', (d) => (d.children ? '#555' : '#999'))
    .attr('r', 4);

  node
    .append('rect')
    .attr('x', 0)
    .attr('y', -NODE_HEIGHT / 2)
    .attr('fill', 'none')
    .attr('width', 200)
    .attr('rx', 6)
    .attr('height', NODE_HEIGHT)
    .attr('stroke-width', 3)
    .attr('stroke', (d) => (d.children ? '#555' : '#999'));

  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', 6)
    .attr('text-anchor', 'start')
    .text((d) => d.data.name)
    .clone(true)
    .lower()
    .attr('stroke', 'white');
};
