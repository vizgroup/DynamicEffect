function getGlobalMaxMinY(liData){
  var gMin, gMax;
  var liY = []
  for(var i = 0; i < liData.length; i ++){
    var data = liData[i]
    liY.push(data.minY)
    liY.push(data.maxY)
  }
  return {'globalMax': d3.max(liY), 'globalMin': d3.min(liY)};
}

function drawBoxplot(liBoxplotdata){

  var data = [];
  var boxWidth = 20, boxGap = 40;
  var globalMaxMin = getGlobalMaxMinY(liBoxplotdata)

  var boxplotsvg = d3.select('#coversvg')
                     .append('g')
   
 for(var i = 0; i < liBoxplotdata.length; i ++){
    var data = liBoxplotdata[i];
    var g = boxplotsvg
        .append('g')
        .attr('class', 'boxplot')
        .attr('data', JSON.stringify(data))
        .attr('groupid', i)
        .attr('transform', 'translate(' + i * (boxWidth + boxGap) + ',0)')
    drawaBox(i, g, data, globalMaxMin['globalMin'], globalMaxMin['globalMax'], data.minY, data.q1, data.median, data.q3, data.maxY);
  }
}

function drawaBox(i, g, d, globalMin, globalMax, ymin, yQ1, yMV, yQ3, ymax){
 
  var yScale = d3.scaleLinear()
                .domain([globalMin, globalMax])
                .range([500, 0])

   var boxWidth = 20

   var colorFunc_bottom = d3.scaleLinear()
                .domain([0, 50])
              .range(["#0570b0", "#a6bddb"]);
   
   var colorFunc_up = d3.scaleLinear()
                .domain([0, 50])
              .range(["#d7301f", "#fdbb84"]);

  colorFunc = ['#66c2a5', '#fc9d62', '#8da0cb', '#e78ac3', '#a6d854']

  //rect
  g.append('rect')
   .attr('class', 'box')
   .attr('width', boxWidth)
   .attr('height', function(){
    return yScale(yQ1) - yScale(yQ3);
   })
   .attr('x', function(){
    return 0
   })
   .attr('y', function(){
    return yScale(yQ3);
   })
   .style('fill', function(){
    return colorFunc[Math.floor(i/2)]
  })
   .style('stroke', 'black');

   var step = 7
   var shinkRatio = 0.4
              
   //median line
   g.append('line')
    .attr('class', 'mline')
    .attr('x1', 0)
    .attr('y1', yScale(yMV))
    .attr('x2', boxWidth)
    .attr('y2', yScale(yMV))
    .style('stroke', 'black')
    .style('stroke-width', '3px');

    //whisker line
    g.append('line')
     .attr('class', 'whisker')   
     .attr('x1', boxWidth/2.)
     .attr('x2', boxWidth/2.)
     .attr('y1', yScale(yQ3))
     .attr('y2', yScale(ymax))
     .style('stroke', 'black')
     .style('stroke-dasharray', '5 5');
    //whisker line
    g.append('line')
     .attr('class', 'whisker')
     .attr('x1', boxWidth/2.)
     .attr('x2', boxWidth/2.)
     .attr('y1', yScale(yQ1))
     .attr('y2', yScale(ymin))
     .style('stroke', 'black')
     .style('stroke-dasharray', '5 5');
    g.append('line')
     .attr('class', 'whisker')
     .attr('x1', 0)
     .attr('x2', boxWidth)
     .attr('y1', yScale(ymin))
     .attr('y2', yScale(ymin))
     .style('stroke', 'black');
    g.append('line')
     .attr('class', 'whisker')
     .attr('x1', 0)
     .attr('x2', boxWidth)
     .attr('y1', yScale(ymax))
     .attr('y2', yScale(ymax))
     .style('stroke', 'black');
}
