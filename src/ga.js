var loop = false; 


GA_Loop = function(){
    loop = true;
}

gradualAppearance = function(Visual_proxy, Offset, Repetition, Speed){

    var highlightcolor = Visual_proxy.style("stroke")
    var index = 0
    var repetitionflag = 0
    //Clone the firgure source 
    Visual_proxy
        .style("stroke", "none")
    var proxy_clone = Visual_proxy.select(function(){
        return this.parentNode.insertBefore(this.cloneNode(1), this.nextSibling)
    })

    //Set a interval to ensure that the effects appear one at a time according to the hierarchy
    var intervalhandler = setInterval(function(){
        proxy_clone
            .attr("class", "clonenode") 
            .style("stroke", function(d){
                if(Offset > 0){
                    if(index < Offset)
                        return "none";
                    else{
                        if((index-Offset)%2 == 0){
                            repetitionflag += 1;
                            return highlightcolor;
                        }
                        else{
                            return "none"
                        }
                        
                    }
                }
                else if(Offset <= 0){
                    return "none";
                }       
            })
    
            index += 1;

            if(repetitionflag >= Repetition+1){
                proxy_clone
                    .style("stroke", "none")
                // clearInterval(intervalhandler)
                // if(loop == true){
                //   repetitionflag = 0
                //   index = 0
                // }
            }
    }, (1.25 - Speed) * 1000)
}