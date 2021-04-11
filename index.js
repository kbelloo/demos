
let margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left -margin.right, 
    height = 500 - margin.top - margin.bottom;


let svg = d3.select('#viz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);



  d3.csv('sales.csv', (d) => {

    d.sales = +d.sales;
    return d;

  }).then((results) => {

    console.log(results);

  }).catch((error) => {
      throw error;
  })


    