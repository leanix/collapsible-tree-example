import * as d3 from 'd3';

import { MARGIN, NODE_HEIGHT, NODE_WIDTH, WIDTH } from '@app/constants';
import { getLinkLine } from '@app/helpers';
import { IData } from '@app/models';

const svg = d3
  .select('#app')
  .append('svg')
  .style('font', '10px sans-serif')
  .style('user-select', 'none');

const gLink = svg
  .append('g')
  .attr('fill', 'none')
  .attr('stroke', '#555')
  .attr('stroke-opacity', 0.4)
  .attr('stroke-width', 1.5);

const gNode = svg
  .append('g')
  .attr('cursor', 'pointer')
  .attr('pointer-events', 'all');

export const render = (root: d3.HierarchyNode<IData>) => {
  // Compute the new tree layout.
  const rootTree = d3.tree<IData>().nodeSize([NODE_HEIGHT + 10, WIDTH / 6])(root);

  const nodes = rootTree.descendants().reverse();
  const links = rootTree.links();

  let left = rootTree;
  let right = rootTree;
  rootTree.eachBefore((d) => {
    if (d.x < left.x) {
      left = d;
    }
    if (d.x > right.x) {
      right = d;
    }
  });

  const height = right.x - left.x + MARGIN.top + MARGIN.bottom;

  svg.attr('viewBox', [-MARGIN.left, left.x - MARGIN.top, WIDTH, height].join(' '));

  // Update the nodes…
  const node = gNode.selectAll<SVGGElement, d3.HierarchyNode<IData>>('g').data(nodes, (d) => d.data.name);

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .append('g')
    .attr('transform', (d) => {
      const x = d.parent ? d.parent.x : 0;
      const y = d.parent ? d.parent.y : 0;
      return `translate(${y},${x})`;
    })
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
    .on('click', (item) => {
      root.descendants().forEach((d) => {
        if (d.data.name === item.data.name) {
          d.children = d.children ? undefined : d.data._children;
        }
      });
      render(root);
    })
    .on('mouseover', (d, i, items) => {
      if (d.data._children) {
        d3.select(items[i])
          .select('rect')
          .attr('fill', '#999');

        d3.select(items[i])
          .select('circle.source')
          .attr('r', 5);

        d3.selectAll<SVGPathElement, d3.HierarchyPointLink<IData>>('path.link')
          .filter((linkNode) => {
            return linkNode.source.data.name === d.data.name;
          })
          .attr('stroke-width', 4);
      }
    })
    .on('mouseout', (d, i, items) => {
      if (d.data._children) {
        d3.select(items[i])
          .select('rect')
          .attr('fill', 'white');

        d3.select(items[i])
          .select('circle.source')
          .attr('r', 4);

        d3.selectAll<SVGPathElement, d3.HierarchyPointLink<IData>>('path.link')
          .filter((linkNode) => {
            return linkNode.source.data.name === d.data.name;
          })
          .attr('stroke-width', 1.5);
      }
    });

  nodeEnter
    .append('circle')
    .classed('target', true)
    .filter((d) => Boolean(d.parent))
    .attr('fill',  '#999')
    .attr('r', 4);

  nodeEnter
    .append('circle')
    .classed('source', true)
    .filter((d) => Boolean(d.data._children))
    .attr('cx', NODE_WIDTH)
    .attr('fill', (d) => (d.data._children ? '#555' : '#999'))
    .attr('r', 4);

  nodeEnter
    .append('rect')
    .attr('x', 0)
    .attr('y', -NODE_HEIGHT / 2)
    .attr('fill', 'white')
    .attr('width', NODE_WIDTH)
    .attr('rx', 6)
    .attr('height', NODE_HEIGHT)
    .attr('stroke-width', 2)
    .attr('stroke', (d) => (d.data._children ? '#555' : '#999'));

  nodeEnter
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', 6)
    .attr('text-anchor', 'start')
    .text((d) => d.data.name)
    .clone(true)
    .lower()
    .attr('stroke', 'white');

  // Transition nodes to their new position.
  const nodeUpdate = node
    .merge(nodeEnter)
    .attr('transform', (d) => `translate(${d.y},${d.x})`)
    .attr('fill-opacity', 1)
    .attr('stroke-opacity', 1);

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit<d3.HierarchyPointNode<IData>>()
    .remove()
    .attr('transform', (d) => {
      const x = d.parent ? d.parent.x : 0;
      const y = d.parent ? d.parent.y : 0;
      return `translate(${y},${x})`;
    })
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0);

  // Update the links…
  const link = gLink
    .selectAll<SVGPathElement, d3.HierarchyPointLink<IData>>('path')
    .data(links, (d) => d.target.data.name);

  // Enter any new links at the parent's previous position.
  const linkEnter = link
    .enter()
    .append('path')
    .classed('link', true)
    .attr('d', (d) => {
      const x = d.source ? d.source.x : 0;
      const y = d.source ? d.source.y : 0;
      const o = { ...d.source, x, y };
      return getLinkLine({ source: o, target: o });
    });

  // Transition links to their new position.
  link.merge(linkEnter).attr('d', (d) => getLinkLine({ ...d, source: { ...d.source, y: d.source.y + NODE_WIDTH } }));

  // Transition exiting nodes to the parent's new position.
  link
    .exit<d3.HierarchyPointLink<IData>>()
    .remove()
    .attr('d', (d) => {
      const x = d.source ? d.source.x : 0;
      const y = d.source ? d.source.y : 0;
      const o = { ...d.source, x, y };
      return getLinkLine({ source: o, target: o });
    });
};
