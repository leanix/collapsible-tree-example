import { select as d3select, selectAll as d3selectAll } from 'd3-selection';

import { NODE_HEIGHT, NODE_WIDTH } from '@app/constants';
import { getLinkLine, getVerticalDimensions } from '@app/helpers';
import { IData, INodeSize } from '@app/models';

export const render = (selector: string, root: d3.HierarchyPointNode<IData>, width: number, size: INodeSize) => {
  
  const [y0,y1] = getVerticalDimensions<IData>(root);
  
  const svg = d3select(selector)
    .append('svg')
    .attr('viewBox', [0, 0, width, y1 - y0 + size.dy * 2].join(' '));

  const container = svg.append('g').attr('transform', `translate(${10},${size.dy - y0})`);

  const link = container
    .append('g')
    .classed('links', true)
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .classed('link', true)
    .attr('d', (d) => getLinkLine({ ...d, source: { ...d.source, y: d.source.y + NODE_WIDTH } }));

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
      d3select(nodes[i])
        .select('rect')
        .attr('fill', '#999');

      d3select(nodes[i])
        .select('circle.source')
        .attr('r', 6);

      d3selectAll<SVGPathElement, d3.HierarchyPointLink<IData>>('path.link')
        .filter((linkNode) => {
          return linkNode.source.data.name === d.data.name;
        })
        .attr('stroke-width', 4);
    })
    .on('mouseout', (d, i, nodes) => {
      d3select(nodes[i])
        .select('rect')
        .attr('fill', 'white');

      d3select(nodes[i])
        .select('circle.source')
        .attr('r', 4);

      d3selectAll<SVGPathElement, d3.HierarchyPointLink<IData>>('path.link')
        .filter((linkNode) => {
          return linkNode.source.data.name === d.data.name;
        })
        .attr('stroke-width', 1.5);
    });

  node
    .append('circle')
    .classed('target', true)
    .filter((d) => Boolean(d.parent))
    .attr('fill', (d) => (d.children ? '#555' : '#999'))
    .attr('r', 4);

  node
    .append('circle')
    .classed('source', true)
    .filter((d) => Boolean(d.children))
    .attr('cx', NODE_WIDTH)
    .attr('fill', (d) => (d.children ? '#555' : '#999'))
    .attr('r', 4);

  node
    .append('rect')
    .attr('x', 0)
    .attr('y', -NODE_HEIGHT / 2)
    .attr('fill', 'white')
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
