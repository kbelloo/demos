
let margin = {top: 30, right: 30, bottom: 150, left: 30},
    width = 960 - margin.left -margin.right, 
    height = 500 - margin.top - margin.bottom;


let svg = d3.select('#viz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);


let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);


let y = d3.scaleLinear()
    .range([height, 0]);

    
d3.csv('sales.csv', (d) => {

    d.sales = +d.sales;
    return d;

  }).then((results) => {


      x.domain(results.map(d => d.flavors)); //mapping the flavors from csv file
    
    
      y.domain([0, d3.max(results, d => d.sales)])
        .nice();  //make the y-axis show 500 since it stopped at 495

      svg.append('g')
         .call(d3.axisLeft(y));

      svg.append('g')
         .attr("transform", `translate(0, ${height})`)
         .call(d3.axisTop(x))
         .selectAll("text")
         .attr('x', x.bandwidth()/2)
         .attr('y', 0)
         .attr('dy', '.35em')
         .attr('transform', 'rotate(90)')
         .attr("text-anchor", "start"); 
          
            
      createBars(results);


      let rangeSlider = document.getElementById('sales-range');

      rangeSlider.min =0;
      rangeSlider.max = d3.max(results, d => d.sales);



      rangeSlider.onchange = function() {

        let filteredData = results.filter(d => d.sales >=  rangeSlider.value);

        createBars(filteredData);

      }




  }).catch((error) => {

      throw error;

  })



  //create bars function

  function createBars(results){

     svg.selectAll('.bar-group')
          .data(results, d => d.flavors)
          .join(

              enter => {

                let bar = enter.append('g')
                .attr('class', 'bar-group')
                .style('opacity', 1);  
            
                bar.append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.flavors))
                .attr('y', d => y(0))
                .attr('width', x.bandwidth())
                .attr('height', 0)
                .style('fill', 'steelblue')
                .transition()
                .duration(750)
                .attr('y', d => y(d.sales))
                .attr('height', d => height - y(d.sales)); 


                //adding labels to bar chart

                bar.append('text')
                .text(d => d.sales)
                .attr('x', d => x(d.flavors) + (x.bandwidth()/2))
                .attr('y', d => y(d.sales) - 4)
                .attr("text-anchor", "middle")
                .style('font-family', 'sans-serif')
                .style('font-size', 10)
                .style('opacity', 0)
                .transition()
                .duration(500)
                .style('opacity', 1);
              },

              update => {

                  update.transition()
                        .duration(750)
                        .style('opacity', 1)
              },

              exit => {
                  
                   exit.transition()
                        .duration(750)
                        .style('opacity', 0.15)

              }

          )

    

  }


    