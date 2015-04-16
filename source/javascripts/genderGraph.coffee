$ ->
  padding = 10
  height = 200
  width = $('#bundeslaender').width() - padding
  data = [{sum: 100, muetter: 95}]
  margin = { top: 10, right: 10, left: 10, bottom: 10 }
  options = { height: height,  width: width, margin: margin, circles: { radius: 15, padding: 0 }}
  genderGraph = new PointGraph(data, options)
  genderGraph.drawItem = (graphGroup) ->
    graphGroup.selectAll("image").remove()
    graphGroup
      .append("image")
      .attr("r",@options.circles.radius)
      .attr("class",@valueClasss)
      .attr("xlink:href", (d,i) => "images/#{@valueClasss(d,i)}.png")
      .attr("height", @options.circles.radius*2)
      .attr("width", @options.circles.radius*2)
    graphGroup.exit().remove()
  genderGraph.setValueKeys("sum","muetter")
  valueClasses = [ {
    range: [0...5]
    className: "male"
  },
  {
    range: [5...100]
    className: "female"
  } ]
  genderGraph.setValueClasses(valueClasses)
  genderGraph.render("#percent-gender-chart")
