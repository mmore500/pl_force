var svg = d3.select("#vis").append("svg").attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 600 600")
   //class to make it responsive
   .classed("svg-content-responsive", true);
;
var
    width = 600,
    height = 600;

var defs = svg.append('svg:defs');
    
    var imgUrl =  "http://svgshare.com/i/1Ka.svg";

    
    defs
        .append("pattern")
        .attr("id", "box")
        .attr('patternUnits', 'userSpaceOnUse')
        .attr("width", width)
        .attr("height", height)
        .append("image")
        .attr("xlink:href", imgUrl)
        .attr("width", 4*width/7)
        .attr("x", width/6)
        .attr("y", height/3);

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "url(#box)");


var color = d3.scaleOrdinal(d3.schemeCategory20);

var iconsize = width/10;


defs.append("svg:pattern")
    .attr("id", "phone-icon")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", "http://svgshare.com/i/1JF.svg")
    .attr("width", iconsize)
    .attr("height", iconsize)
    .attr("x", 50)
    .attr("y", 50);
    
defs.append("svg:pattern")
    .attr("id", "mail-icon")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", "http://svgshare.com/i/1Jb.svg")
    .attr("width", iconsize)
    .attr("height", iconsize)
    .attr("x", 50)
    .attr("y", 50);
    
defs.append("svg:pattern")
    .attr("id", "laptop-icon")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", "http://svgshare.com/i/1Jc.svg")
    .attr("width", iconsize)
    .attr("height", iconsize)
    .attr("x", 50)
    .attr("y", 50);
    
defs.append("svg:pattern")
    .attr("id", "papers-icon")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", "http://svgshare.com/i/1KF.svg")
    .attr("width", iconsize)
    .attr("height", iconsize)
    .attr("x", 50)
    .attr("y", 50);

defs.append("svg:pattern")
    .attr("id", "calendar-icon")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", "http://svgshare.com/i/1JQ.svg")
    .attr("width", iconsize)
    .attr("height", iconsize)
    .attr("x", 50)
    .attr("y", 50);

var manyBody = d3.forceManyBody();
manyBody.strength(-80000/width);

var linkForce = d3.forceLink().id(function(d) { return d.id; });
linkForce.distance(100);

var simulation = d3.forceSimulation()
    .force("link", linkForce)
    .force("charge", manyBody)
    .force("center", d3.forceCenter(width / 3, height / 3));

simulation.velocityDecay(0.03);
simulation.alpha(0.02);

d3.json("data.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", function(d) {return 100;})
      .style("fill", function(d) {
        return "url(#" + d.id + "-icon)";
      });

  node.append("title")
    .text(function(d) { return d.id; });


  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);
      
  


  function ticked() {
    
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        
    node
            .attr("transform", function(d) {
                return "translate(" + d.x + ", " + d.y + ")";
            });

  
  simulation.alphaTarget(0.01).restart();
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
