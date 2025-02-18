import { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component {
  componentDidMount() {
    const data = this.props.data;

    const processed_data = [
      { day: 'Sun', avg: d3.mean(data.filter((d) => d.day === 'Sun').map((d) => +d.tip)) },
      { day: 'Sat', avg: d3.mean(data.filter((d) => d.day === 'Sat').map((d) => +d.tip)) },
      { day: 'Thur', avg: d3.mean(data.filter((d) => d.day === 'Thur').map((d) => +d.tip)) },
      { day: 'Fri', avg: d3.mean(data.filter((d) => d.day === 'Fri').map((d) => +d.tip)) }
    ];

    const max_tip_avg = d3.max(processed_data.map((d) => +d.avg));

    console.log(processed_data)

    const margin = { top: 40, right: 50, bottom: 50, left: 60 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select('.container2').attr('width', width).attr('height', height).style('border', '1px solid lightgray');

    const innerChart = svg.select('.inner_chart2').attr('transform', `translate(${margin.left}, ${margin.top})`);

    var xScale = d3.scaleBand().domain(['Sun', 'Sat', 'Thur', 'Fri']).range([0, innerWidth]);
    var yScale = d3.scaleLinear().domain([0, max_tip_avg]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll('rect')
      .data(processed_data)
      .join('rect')
      .attr('width', xScale.bandwidth() - 30)
      .attr('height', d => innerHeight - yScale(d.avg))
      .attr('fill', '#69b3a2')
      .attr('x', d => xScale(d.day) + 15)
      .attr('y', d => yScale(d.avg));

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
      .text('Day');

    innerChart.append('text')
      .attr("text-anchor", "middle")
      .attr('x', -innerHeight/2)
      .attr('y', -35)
      .attr("transform", "rotate(-90)")
      .text('Average Tip');

    innerChart.append('text')
      .attr("text-anchor", "middle")
      .attr('x', innerWidth/2)
      .attr('y', -10)
      .text('Average Tip by Day');
  }

  render() {
    return (
      <svg className='container2'>
        <g className='inner_chart2'></g>
      </svg>
    );
  }
}

export default Child2;