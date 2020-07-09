import { ContinuousDistribution } from './distribution';
import * as d3 from 'd3';

const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
}
const width = 400;
const height = 400;

export async function pdfchart(dist: ContinuousDistribution, n: number = 1000) {
  let data = await dist.densities({n});
  let line = d3.line();
  let x = d3.scaleLinear().domain([data.xmin, data.xmax])
                          .range([margin.left, width - margin.right]);
  let y = d3.scaleLinear().domain([data.ymin, data.ymax])
                          .range([height - margin.bottom, margin.top]);

  let svg = d3.create('svg').attr('viewBox', `0 0 ${width} ${height}`).style('display', 'block');
  svg.append('path')
     .datum(data.points)
     .attr("fill", "none")
     .attr('stroke', 'black')
     .attr('stroke-width', 1.5)
     .attr('d', line);

  let elt = document.getElementById('pdf-shell');
  elt.appendChild(svg.node());
}
