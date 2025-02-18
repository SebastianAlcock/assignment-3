import { Component } from 'react';
import * as d3 from 'd3';

class Child1 extends Component {
  componentDidMount() {
    const data = this.props.data;

    const margin = { top: 40, right: 50, bottom: 50, left: 60 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const max_tip = d3.max(data.map((d) => +d.tip));
    const max_total_bill = d3.max(data.map((d) => +d.total_bill));

    const svg = d3.select('.container1').attr('width', width).attr('height', height).style('border', '1px solid lightgray').style('margin-bottom', '8px');

    const innerChart = svg.select('.inner_chart1').attr('transform', `translate(${margin.left}, ${margin.top})`);

    var xScale = d3.scaleLinear().domain([0, max_total_bill]).range([0, innerWidth]);
    var yScale = d3.scaleLinear().domain([0, max_tip]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', 4)
      .attr('fill', '#69b3a2')
      .attr('cx', d => xScale(+d.total_bill))
      .attr('cy', d => yScale(+d.tip));

    innerChart
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class','x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class','y-axis')
      .call(yAxis);

    innerChart.append('text')
      .attr("text-anchor", "middle")
      .attr('x', innerWidth/2)
      .attr('y', margin.top + innerHeight)
      .text('Total Bill');

    innerChart.append('text')
      .attr("text-anchor", "middle")
      .attr('x', -innerHeight/2)
      .attr('y', -35)
      .attr("transform", "rotate(-90)")
      .text('Tips');

    innerChart.append('text')
      .attr("text-anchor", "middle")
      .attr('x', innerWidth/2)
      .attr('y', -10)
      .text('Total Bill vs. Tips');
  }

  render() {
    return (
      <svg className='container1'>
        <g className='inner_chart1'></g>
      </svg>
    );
  }
}

export default Child1;