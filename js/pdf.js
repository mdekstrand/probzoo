import * as d3 from 'd3';

const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
}
const width = 400;
const height = 300;

export async function pdfchart(dist, n) {
  if (!n) n = 1000;
  let data = await dist.densities({n});
  let x = d3.scaleLinear().domain([data.xmin, data.xmax])
                          .range([margin.left, width - margin.right]);
  let y = d3.scaleLinear().domain([0, data.ymax])
                          .range([height - margin.bottom, margin.top]);
  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", 3)
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(data.y))
  let line = d3.line().x((d) => x(d.x)).y((d) => y(d.y)).defined((d) => !isNaN(d.y));
  let svg = d3.create('svg').attr('viewBox', `0 0 ${width} ${height}`).style('display', 'block');
  svg.append('path')
     .datum(data.points)
     .attr("fill", "none")
     .attr('stroke', 'black')
     .attr('stroke-width', 1.0)
     .attr('d', line);
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);

  let elt = document.getElementById('pdf-shell');
  elt.appendChild(svg.node());
}
