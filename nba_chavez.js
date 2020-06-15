var svg = d3
    .select("#chChavez")
    .append("svg");
​
var data = [
    { "Player": "Gorgui Dieng", "Rating": 76, "Salary": 16229213 },
    { "Player": "Dewayne Dedmon", "Rating": 76, "Salary": 1333334 },
    { "Player": "Jae Crowder", "Rating": 76, "Salary": 7815533 },
    { "Player": "Kentavious Pope", "Rating": 76, "Salary": 8089282 },
    { "Player": "Jalen Brunson", "Rating": 76, "Salary": 1416852 },
    { "Player": "Miles Bridges", "Rating": 76, "Salary": 3755400 },
    { "Player": "Jeff Green", "Rating": 76, "Salary": 3405180 },
    { "Player": "Rodney Hood", "Rating": 76, "Salary": 5718000 },
    { "Player": "Kevin Huerter", "Rating": 76, "Salary": 2636280 },
    { "Player": "Jonathan Isaac", "Rating": 76, "Salary": 5806440 },
    { "Player": "Josh Jackson", "Rating": 76, "Salary": 7059480 },
    { "Player": "Frank Kaminsky", "Rating": 76, "Salary": 4767000 }
]
​
var margin = { top: 50, right: 50, bottom: 50, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
​
var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .08);
​
var x = d3.scale.linear()
    .range([0, width]);
​
y.domain(data.map(function (d) { return d.Player; }));
x.domain([d3.min(data, function (d) { return d.Rating; }), d3.max(data, function (d) { return d.Salary; })]);
​
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(7);
​
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
// Append SVG element
​
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
​
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("x", width - 75)
    .attr("dx", ".71em")
    .attr("dy", "-.71em")
    .text("Ratings vs Salaries in Mill");
​
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
​
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("y", function (d) { return y(d.Player); })
    .attr("height", y.rangeBand())
    .attr("x", function (d) { return x(d.Rating); })
    .attr("width", function (d) { return x(d.Salary) - x(d.Rating) });
​
// add legend
var legend = svg.append("g")
    .attr("class", "legend")
​
legend
    .append("rect")
    .attr("x", width - margin.left)
    .attr("y", -10)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function (d) {
        return '#3498db';
    })
​
legend
    .append("text")
    .attr("x", width - margin.left + 15)
    .attr("y", 0)
    .text("Median Players Rating+Salary");
​
​
var tooltip = d3.select("body")
    .append('div')
    .attr('class', 'tooltip');
​
tooltip.append('div')
    .attr('class', 'Player');
tooltip.append('div')
    .attr('class', 'Salaries');
​
svg.selectAll(".bar")
    // Create "mouseover" event listener
    .on('mouseover', function (d) {
​
        tooltip.select('.Player').html("<b>" + d.Player + "</b>");
        tooltip.select('.Salaries').html("Rating " + d.Rating + " to " + "Salary " + "$" + d.Salary);
​
        tooltip.style('display', 'block');
        tooltip.style('opacity', 2);
​
    })
    .on('mousemove', function (d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
            .style('left', (d3.event.layerX - 25) + 'px');
    })
    //  Create "mouseout" event listener
    .on('mouseout', function () {
        tooltip.style('display', 'none');
        tooltip.style('opacity', 0);
    });