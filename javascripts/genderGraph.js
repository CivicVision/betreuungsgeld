(function() {
  $(function() {
    var data, genderGraph, height, j, margin, options, padding, results, valueClasses, width;
    padding = 10;
    height = 200;
    width = $('#bundeslaender').width() - padding;
    data = [
      {
        sum: 100,
        muetter: 95
      }
    ];
    margin = {
      top: 10,
      right: 10,
      left: 10,
      bottom: 10
    };
    options = {
      height: height,
      width: width,
      margin: margin,
      circles: {
        radius: 15,
        padding: 0
      }
    };
    genderGraph = new PointGraph(data, options);
    genderGraph.drawItem = function(graphGroup) {
      graphGroup.selectAll("image").remove();
      graphGroup.append("image").attr("r", this.options.circles.radius).attr("class", this.valueClasss).attr("xlink:href", (function(_this) {
        return function(d, i) {
          return "images/" + (_this.valueClasss(d, i)) + ".png";
        };
      })(this)).attr("height", this.options.circles.radius * 2).attr("width", this.options.circles.radius * 2);
      return graphGroup.exit().remove();
    };
    genderGraph.setValueKeys("sum", "muetter");
    valueClasses = [
      {
        range: [0, 1, 2, 3, 4],
        className: "male"
      }, {
        range: (function() {
          results = [];
          for (j = 5; j < 100; j++){ results.push(j); }
          return results;
        }).apply(this),
        className: "female"
      }
    ];
    genderGraph.setValueClasses(valueClasses);
    return genderGraph.render("#percent-gender-chart");
  });

}).call(this);
