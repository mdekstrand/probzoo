import * as d3 from 'd3';
import h from 'hyperscript';

const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
}
const width = 400;
const height = 300;

class FunctionGraph {
  constructor() {
    this.svg = d3.create('svg').attr('viewBox', `0 0 ${width} ${height}`).style('display', 'block');
    this.x = d3.scaleLinear()
      .range([margin.left, width - margin.right]);
    this.y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top]);
    this.line = d3.line().x((d) => this.x(d.x)).y((d) => this.y(d.y)).defined((d) => !isNaN(d.y));
    this.path = this.svg.append('path');
    this.xg = this.svg.append('g');
    this.yg = this.svg.append('g');

    this.update = this.update.bind(this);
  }

  update(data) {
    this.x = this.x.domain([data.xmin, data.xmax]);
    this.y = this.y.domain([0, data.ymax]);
    this.xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(this.x).ticks(width / 80).tickSizeOuter(0))
    this.yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(this.y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", 3)
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(data.y));
    this.path = this.path
      .datum(data.points)
      .attr("fill", "none")
      .attr('stroke', 'black')
      .attr('stroke-width', 1.0)
      .attr('d', this.line);
    this.xg = this.xg.call(this.xAxis);
    this.yg = this.yg.call(this.yAxis);
  }
}

class PDF {
  constructor(dist, n) {
    this.n = n || 1000;
    this.dist = dist;
    this.graph = new FunctionGraph();
  }

  async update() {
    let data = await this.dist.densities({n: this.n});
    this.graph.update(data);
  }

  _param(name, p) {
    let pdf = this;
    console.log('%s: %s', name, p.lowerBound);
    return h('label.param', [
      p.label, ' ',
      h('input', {
        type: 'number',
        step: 'any',
        name: `pdf-${name}`,
        value: this.dist[name],
        min: p.lowerBound,
        max: p.upperBound,
        onchange(evt) {
          evt.preventDefault();
          pdf.dist[name] = parseFloat(this.value);
          pdf.update()
        }
      })
    ]);
  }

  html() {
    return h('div#pdf-shell', [
      this.graph.svg.node(),
      h('form.pdf-params', Object.entries(this.dist.params).map(([name, p]) => {
        return this._param(name, p);
      }))
    ])
  }
}

export async function pdfchart(distClass, n) {
  let dist = new distClass();
  let pdf = new PDF(dist, n);
  document.getElementById('pdf-shell').replaceWith(pdf.html());
  pdf.update();
  return pdf;
}
