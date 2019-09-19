geometryDeformation = function(Visual_proxy, Focal, Bandwidth, Speed, Context){
                var steplist = [3,2,1,2,3,-1]
                var index = 0
                var fistfisheyeradius = 20

                var lineFunction = d3.line()
                        .x(function(d){return d.x})
                        .y(function(d){return d.y})
                        // .interpolate("linear")

                var fisheye = d3.fisheye()
                  .radius(fistfisheyeradius)
                  .center(Focal)

                var tagName = Visual_proxy._groups[0][0].tagName

                // Judge the type of the diagram source and do the corresponding operations according to the different types
                if(tagName == "rect"){
                    var rectgraph = svg.append("path")
                        .attr("class", "rectgraph")
                        
                    var x = parseInt(Visual_proxy.attr("x"))
                    var y = parseInt(Visual_proxy.attr("y"))
                    var height = parseInt(Visual_proxy.attr("height"))
                    var width =  parseInt(Visual_proxy.attr("width")); 
                    var liPoint = []
                    // Interpolate four points of the rect
                    for(var i = 0; i < 8; i++){
                      liPoint.push({"x": (x + i / 8 * width), "y": y})
                    }
                    for(var j = 0; j < 8; j++){
                      liPoint.push({"x": (x + width), "y": (y + j/8 * height)})
                    }
                    for(var k = 0; k < 8; k++){
                      liPoint.push({"x": (x + width - k/8 * width), "y": (y + height)})
                    }
                    for(var l = 0; l <= 8; l++){
                      liPoint.push({"x": x, "y": (y+height - l/8 * height)})
                    }
                }
                else if(tagName == "circle"){
                  var r = parseInt(Visual_proxy.attr("r"))
                  var cx = parseInt(Visual_proxy.attr("cx"))
                  var cy = parseInt(Visual_proxy.attr("cy"))
                  var proxy_clone = Visual_proxy.select(function(){
                    return this.parentNode.insertBefore(this.cloneNode(1), this.nextSibling)
                  })
                    .style("fill", Visual_proxy.style("fill"))
                    
                  var liPoint = []
                  var updot = {'x': cx , 'y': cy + r}
                  liPoint.push(updot)
                }
                else if(tagName == "path"){
                  var liPoint = []
                  var proxy_clone = Visual_proxy.select(function(){
                    return this.parentNode.insertBefore(this.cloneNode(1), this.nextSibling)
                  })
                  var l = Visual_proxy.node().getTotalLength()
                  console.log("length", l)
                  proxy_clone
                    .attr("point", function(d){
                        for(var i = 0; i <= l; i++){
                          liPoint.push(Visual_proxy.node().getPointAtLength(i))
                        }
                    })
                }

                //Set a interval to ensure that the effects appear one at a time according to the hierarchy
                var interval = setInterval(function(){
                  
                  //Change the radius of fisheye periodically
                  fisheye.radius( (fistfisheyeradius + Bandwidth) / steplist[index] )

                  if(tagName == "rect"){
                    var newdata = []
                    var firstnode, lastnode ;
                    rectgraph
                        .attr("d", function(d){
                          for(var liIndex in liPoint){
                            var point = liPoint[liIndex]
                            
                            if(index == steplist.length){
                              var newpoint = [point['x'], point['y']]
                            }
                            else{
                              var newpoint = fisheye([point['x'], point['y']])
                            }

                            newdata.push({'x': newpoint[0], 'y': newpoint[1]})
                          }
                          return lineFunction(newdata)
                        })
                        .style("fill", Visual_proxy.style("fill"))
                        .style("stroke", Visual_proxy.style("stroke"))
                        .style("stroke-width", Visual_proxy.style("stroke-width"))
                        
                  }
                  else if(tagName == "circle"){
                    for(var liIndex in liPoint){
                      var point = liPoint[liIndex]
                      var newpoint = fisheye([point['x'], point['y']])
                      var newr = newpoint[1] - cy;
                    }
                    proxy_clone
                      .attr("r", newr)
                    
                  }
                  else if(tagName == "path"){
                    var newdata = []
                    proxy_clone
                      .attr("d",function(d){
                        for(var liIndex in liPoint){
                          var point = liPoint[liIndex]
                          var newpoint = fisheye([point['x'], point['y']])
                          newdata.push({'x': newpoint[0], 'y': newpoint[1]})
                        }
                        return lineFunction(newdata)
                      })
                  }

                  index += 1;
                  if(index >= steplist.length){
                    index = 0
                  }
                }, (1.25 - Speed)*1000)
                // }, (35-Speed)/10*1000)

            }