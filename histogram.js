var svg = d3.select('section#histogram').append('svg')
    .attr("width", 800)
    .attr("height", 600);

var g1 =  svg.append('g')
var g2 =  svg.append('g')
    .attr("transform", "translate(0, 200)");
var g3 =  svg.append('g')
    .attr("transform", "translate(0, 400)");

var height = 180,
    width = 800,
    margin = {x: 30, y:10};
    
var data = [1,1,1,2,3,3,5,6,7,8,9,9,9,9,10,14,16,16,18,19];

var x = d3.scale.linear()
    .domain([0, 20])
    .range([0, width-margin.x]);

function draw_histogram(g, histogram, data){

    var data = histogram(data)

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var bar = g.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(data[0].dx) - 1)
        .attr("height", function(d) { return height - y(d.y); });
        
}

function draw_line(g, histogram, data){
    var data = histogram(data)
    
    console.log(data)
    
    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    
    var line = d3.svg.line()
        .x(function(d,i) { return x(d.x+(d.dx/2)); })
        .y(function(d) { return y(d.y); })
    
    g.append("svg:path").attr("d", line(data));
}

var original_histogram = d3.layout.histogram()
    .bins(x.ticks(20));

var binned_histogram = d3.layout.histogram()
    .bins(x.ticks(5));
    
draw_histogram(g3, original_histogram, data)
draw_histogram(g2, binned_histogram, data)
draw_line(g1, binned_histogram, data)



