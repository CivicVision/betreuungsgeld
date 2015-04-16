(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.PointGraph = (function(superClass) {
    extend(PointGraph, superClass);

    function PointGraph(data1, options) {
      this.data = data1;
      this.options = options != null ? options : {};
      this.valueClasss = bind(this.valueClasss, this);
      this.options = _.defaults(this.options, {
        width: 900,
        height: 350,
        margin: {
          top: 40,
          right: 30,
          bottom: 10,
          left: 40
        },
        circles: {
          radius: 12,
          padding: 10
        }
      });
      this.value1Key = "key1";
      this.value2Key = "key2";
      this.valueClass1 = "value-1";
      this.valueClass2 = "value-2";
    }

    PointGraph.prototype.setValueKeys = function(value1, value2) {
      this.value1Key = value1;
      return this.value2Key = value2;
    };

    PointGraph.prototype.setValueClasses = function(valueClasses) {
      return this.valueClasses = valueClasses;
    };

    PointGraph.prototype.valueClasss = function(d, i) {
      var className, j, len, ref, value;
      ref = this.valueClasses;
      for (j = 0, len = ref.length; j < len; j++) {
        value = ref[j];
        if (indexOf.call(value.range, i) >= 0) {
          className = value.className;
        }
      }
      return className;
    };

    PointGraph.prototype.drawItem = function(graphGroup) {
      graphGroup.selectAll("circle").remove();
      graphGroup.append("circle").attr("r", this.options.circles.radius).attr("class", this.valueClasss);
      return graphGroup.exit().remove();
    };

    PointGraph.prototype.draw = function(data) {
      var graphGroup, num, teiler;
      data = (function() {
        var j, ref, results;
        results = [];
        for (num = j = ref = data[0][this.value1Key]; ref <= 1 ? j <= 1 : j >= 1; num = ref <= 1 ? ++j : --j) {
          results.push(data[0]);
        }
        return results;
      }).call(this);
      teiler = Math.floor(this.options.width / (2 * this.options.circles.radius + this.options.circles.padding));
      graphGroup = this.svgSelection.selectAll('g.multiples').data(data);
      graphGroup.enter().append("g");
      graphGroup.attr("class", "multiples").attr("transform", (function(_this) {
        return function(d, i) {
          var translateX, translateY;
          translateX = (i % teiler) * (2 * _this.options.circles.radius + _this.options.circles.padding);
          translateY = _this.options.height - (Math.ceil((i + 1) / teiler) * (_this.options.circles.padding + 2 * _this.options.circles.radius));
          return "translate(" + translateX + "," + translateY + ")";
        };
      })(this));
      return this.drawItem(graphGroup);
    };

    PointGraph.prototype.render = function(element) {
      this.element = element;
      this.createSvg();
      return this.draw(this.data);
    };

    PointGraph.prototype.update = function(data1) {
      this.data = data1;
      return this.draw(this.data);
    };

    return PointGraph;

  })(this.D3Graph);

}).call(this);
