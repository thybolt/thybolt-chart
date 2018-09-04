"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactVis = require("react-vis");

var _reactTable = _interopRequireDefault(require("react-table"));

var _GraphScroll = _interopRequireDefault(require("./GraphScroll"));

var _reactSpinners = require("react-spinners");

require("react-table/react-table.css");

require("./Graph.css");

require("react-vis/dist/style.css");

var _GraphSource = _interopRequireDefault(require("./GraphSource"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ThyboltChart =
/*#__PURE__*/
function (_Component) {
  _inherits(ThyboltChart, _Component);

  function ThyboltChart(props) {
    var _this;

    _classCallCheck(this, ThyboltChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThyboltChart).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "DEFAULT_NVALUES", 0.1);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "DEFAULT_ZOOM_FACTOR", 0.05);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "DEFAULT_OFFSET", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "SCROLL_FACTOR", 0.2);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stale", true);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_xydata", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_xydataUnscaled", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "typeToChart", {
      line: _reactVis.LineMarkSeries,
      bar: _reactVis.VerticalRectSeries
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleChart", function () {
      _this.setState({
        graphMode: !_this.state.graphMode
      });

      _this.stale = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetScales", function () {
      _this.setState({
        translationOffset: _this.DEFAULT_OFFSET,
        nvalues: _this.DEFAULT_NVALUES,
        hoverValue: null
      });

      _this.stale = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showSettings", function () {
      _this.setState({
        settingsVisible: true
      });

      _this.stale = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "zoomIn", function () {
      var nvalues = _this.state.nvalues - _this.DEFAULT_ZOOM_FACTOR;
      var totalSize = Math.floor(nvalues * _this.state.xydata[0].length);

      if (totalSize > 2 && nvalues < 1.0) {
        _this.setState({
          nvalues: nvalues
        });

        _this.stale = true;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "zoomOut", function () {
      var nvalues = _this.state.nvalues + _this.DEFAULT_ZOOM_FACTOR;
      var totalSize = Math.floor(nvalues * _this.state.xydata[0].length);

      if (totalSize > 2 && nvalues < 1.0) {
        _this.setState({
          nvalues: nvalues
        });

        _this.stale = true;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "seekLeft", function () {
      var windowSize = Math.floor(_this.state.nvalues * _this.state.xydata[0].length);
      var translationOffset = _this.state.translationOffset + Math.floor(_this.state.nvalues * _this.state.xydata[0].length * _this.SCROLL_FACTOR);

      if (translationOffset + windowSize > _this.state.xydata[0].length) {
        translationOffset = _this.state.xydata[0].length - windowSize;
      }

      _this.setState({
        translationOffset: translationOffset
      });

      _this.stale = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "seekRight", function () {
      var windowSize = Math.floor(_this.state.nvalues * _this.state.xydata[0].length);
      var translationOffset = _this.state.translationOffset - Math.floor(_this.state.nvalues * _this.state.xydata[0].length * _this.SCROLL_FACTOR);

      if (translationOffset + windowSize < windowSize) {
        translationOffset = 0;
      }

      _this.setState({
        translationOffset: translationOffset
      });

      _this.stale = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWheel", function (e) {
      _this.setState({
        crosshairValues: []
      });

      if (!e.altKey) {
        if (e.deltaY > 0) {
          _this.seekRight();
        } else {
          _this.seekLeft();
        }
      } else {
        if (e.deltaY > 0) {
          _this.zoomIn();
        } else {
          _this.zoomOut();
        }
      }

      console.log('wheeeel');
      e.preventDefault();
      return false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onNearestX", function (value, _ref) {
      var index = _ref.index;

      _this.setState({
        crosshairValues: _this.state.xydataUnscaled.map(function (d) {
          return {
            x: _this.state.xydataUnscaled[0].length - (_this.state.translationOffset + index + 1),
            y: d[_this.state.translationOffset + index].y
          };
        })
      });

      _this.stale = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseLeave", function () {
      _this.setState({
        crosshairValues: []
      });

      _this.stale = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "data", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "charts", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "labels", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "tableCols", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "tableData", []);

    _this.state = {
      graphMode: true,
      xydata: [[]],
      xydataUnscaled: [[]],
      crosshairValues: [],
      settingsVisible: false,
      nvalues: _this.DEFAULT_NVALUES,
      // only display 10% of all values
      translationOffset: _this.DEFAULT_OFFSET,
      hoverValue: null,
      legendHover: -1
    };
    return _this;
  }

  _createClass(ThyboltChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.meta) {
        // setInterval(() => {
        try {
          var _tempx = new Function("data", this.props.meta.source.x)(this.props.data); //eval(`var data=${JSON.stringify(this.props.data)};${this.props.meta.source.x}`);


          var _tempy = [];

          for (var i = 0; i < this.props.meta.source.y.length; i++) {
            _tempy.push(new Function("data", this.props.meta.source.y[i])(this.props.data)); //_tempy.push(eval(`var data=${JSON.stringify(this.props.data)};${this.props.meta.source.y[i]}`));

          }

          this._xydata = [];
          this._xydataUnscaled = [];

          for (var _i = 0; _i < this.props.meta.source.y.length; _i++) {
            this._xydata.push([]);

            this._xydataUnscaled.push([]);

            for (var j = 0; j < _tempx.length; j++) {
              var value = _tempy[_i][j] * parseFloat(this.props.meta.scale[_i]) + parseFloat(this.props.meta.offset[_i]);
              var valueUnscaled = _tempy[_i][j];
              if (!value) value = _tempy[_i][j];

              this._xydata[_i].unshift({
                x0: _tempx[j] + parseFloat(this.props.meta.width[_i]) * 0.01,
                x: _tempx[j],
                y: value
              });

              this._xydataUnscaled[_i].unshift({
                x: _tempx[j],
                y: valueUnscaled
              });
            }
          }

          this.setState({
            xydata: this._xydata,
            xydataUnscaled: this._xydataUnscaled
          });
        } catch (error) {
          console.log(error);
        } // }, 100000);

      } else {
        this.setState({
          xydata: this.props.xydata
        });
      }

      this.stale = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.stale) {
        this.data = [];
        this.tableCols = this.props.meta.label.map(function (label) {
          return {
            Header: label,
            accessor: label
          };
        });
        this.tableData = Array(this.state.xydata[0].length);
        this.charts = [];
        this.labels = [];

        if (this.state.xydata) {
          var _loop = function _loop(ch) {
            var i = 0;

            _this2.state.xydataUnscaled[ch].forEach(function (point) {
              if (_this2.tableData[i]) _this2.tableData[i][_this2.props.meta.label[ch]] = point.y;else _this2.tableData[i] = _defineProperty({}, _this2.props.meta.label[ch], point.y);
              i += 1;
            });

            _this2.labels.push(_react.default.createElement("div", {
              key: _this2.props.meta.label[ch]
            }, _react.default.createElement("b", {
              style: {
                whiteSpace: "nowrap"
              }
            }, _this2.props.meta.label[ch], ":\xA0"), _this2.state.crosshairValues[ch] ? _this2.state.crosshairValues[ch].y : ""));

            if (_this2.state.xydata[ch].length < 300 * _this2.DEFAULT_NVALUES) {
              _this2.data.push(_this2.state.xydata[ch]);
            } else {
              _this2.data.push(_this2.state.xydata[ch].slice(_this2.state.translationOffset, _this2.state.translationOffset + Math.floor(_this2.state.nvalues * _this2.state.xydata[ch].length)));
            }

            color = _this2.props.meta.color[ch] ? _this2.props.meta.color[ch] : undefined;

            if (_this2.state.legendHover != -1) {
              if (_this2.state.legendHover != ch) color = "rgba(200,200,200,0.2)";
            }

            if (_this2.props.meta.visible[ch] === "true") {
              if (_this2.props.meta.type[ch] === "line") _this2.charts.push(_react.default.createElement(_reactVis.LineMarkSeries, {
                key: _this2.props.meta.label[ch],
                strokeDasharray: _this2.props.meta.dash[ch],
                strokeWidth: parseFloat(_this2.props.meta.width[ch]),
                size: _this2.props.meta.size[ch] ? _this2.props.meta.size[ch] : 0,
                color: color,
                animation: false,
                getNull: function getNull(d) {
                  return d.y;
                },
                onNearestX: _this2.onNearestX,
                data: _this2.data[ch]
              }));else _this2.charts.push(_react.default.createElement(_reactVis.VerticalRectSeries, {
                key: _this2.props.meta.label[ch],
                strokeDasharray: _this2.props.meta.dash[ch],
                strokeWidth: _this2.props.meta.width[ch],
                size: _this2.props.meta.size[ch] ? _this2.props.meta.size[ch] : 0,
                color: color,
                animation: false,
                onNearestX: _this2.onNearestX,
                data: _this2.data[ch]
              }));
            }
          };

          for (var ch = 0; ch < this.state.xydata.length; ch++) {
            var color;

            _loop(ch);
          }

          this.stale = false;
        }
      }

      try {
        return _react.default.createElement(_react.default.Fragment, null, this.state.settingsVisible && _react.default.createElement(_GraphSource.default, _extends({}, this.props, {
          closeEditor: function closeEditor() {
            _this2.setState({
              settingsVisible: false
            });

            _this2.forceUpdate();

            _this2.stale = true;
          }
        })), _react.default.createElement("div", {
          className: "graphControl"
        }, this.state.graphMode && _react.default.createElement("span", null, _react.default.createElement("span", {
          style: {
            opacity: this.data[0].length === 0 ? 0.0 : 1.0
          }
        }, _react.default.createElement(_GraphScroll.default, {
          max: this.state.xydata[0].length,
          seek: this.state.translationOffset,
          window: this.data[0].length,
          color: this.props.color ? this.props.color : "#13949B"
        }))), _react.default.createElement("span", {
          onClick: this.toggleChart,
          className: "graphControlButtons"
        }, this.state.graphMode ? _react.default.createElement("i", {
          className: "fas fa-table"
        }) : _react.default.createElement("i", {
          className: "fas fa-chart-area"
        })), _react.default.createElement("span", {
          onClick: this.showSettings,
          className: "graphControlButtons"
        }, _react.default.createElement("i", {
          className: "fas fa-wrench"
        })), _react.default.createElement("span", {
          onClick: this.resetScales,
          className: "graphControlButtons"
        }, this.state.graphMode ? _react.default.createElement("i", {
          className: "fas fa-redo"
        }) : ""), "\xA0", _react.default.createElement("span", {
          style: {
            display: this.data[0].length === 0 ? "none" : "inline"
          },
          onClick: this.seekRight,
          className: "graphControlButtons"
        }, this.state.graphMode ? _react.default.createElement("i", {
          className: "fas fa-chevron-right"
        }) : ""), _react.default.createElement("span", {
          style: {
            display: this.data[0].length === 0 ? "none" : "inline"
          },
          onClick: this.zoomIn,
          className: "graphControlButtons"
        }, this.state.graphMode ? _react.default.createElement("i", {
          className: "fas fa-search-plus"
        }) : ""), _react.default.createElement("span", {
          style: {
            display: this.data[0].length === 0 ? "none" : "inline"
          },
          onClick: this.zoomOut,
          className: "graphControlButtons"
        }, this.state.graphMode ? _react.default.createElement("i", {
          className: "fas fa-search-minus"
        }) : ""), _react.default.createElement("span", {
          style: {
            display: this.data[0].length === 0 ? "none" : "inline"
          },
          onClick: this.seekLeft,
          className: "graphControlButtons"
        }, this.state.graphMode ? _react.default.createElement("i", {
          className: "fas fa-chevron-left"
        }) : "")), _react.default.createElement("div", {
          className: "graph"
        }, _react.default.createElement("span", {
          className: "graphSpinner"
        }, _react.default.createElement(_reactSpinners.BarLoader, {
          loading: this.data[0].length === 0 && this.state.graphMode,
          color: this.props.color ? this.props.color : "#13949B"
        })), this.state.graphMode ? _react.default.createElement("div", {
          style: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "inherit"
          }
        }, _react.default.createElement(_reactVis.FlexibleXYPlot, {
          onWheel: this.handleWheel,
          onMouseLeave: this.onMouseLeave
        }, _react.default.createElement(_reactVis.HorizontalGridLines, null), this.props.meta.xAxisVisibility && _react.default.createElement(_reactVis.VerticalGridLines, null), this.props.meta.xAxisVisibility && _react.default.createElement(_reactVis.YAxis, null), this.props.meta.xAxisVisibility && _react.default.createElement(_reactVis.XAxis, null), this.charts, _react.default.createElement(_reactVis.Crosshair, {
          style: {
            line: {
              width: "1px",
              background: "#2c3e50"
            }
          },
          values: this.state.crosshairValues
        }, _react.default.createElement("div", {
          className: "crosshair"
        }, _react.default.createElement("tt", {
          style: {
            whiteSpace: "nowrap"
          }
        }, this.labels)))), _react.default.createElement(_reactVis.DiscreteColorLegend, {
          height: 60,
          orientation: "horizontal",
          onItemMouseEnter: function onItemMouseEnter(item, index, event) {
            _this2.setState({
              legendHover: index
            });

            _this2.stale = true;
          },
          onItemMouseLeave: function onItemMouseLeave(item, index, event) {
            _this2.setState({
              legendHover: -1
            });

            _this2.stale = true;
          },
          items: Object.keys(this.props.meta.label).map(function (x) {
            if (!_this2.props.meta.color[x]) return {
              title: _this2.props.meta.label[x]
            };else return {
              title: _this2.props.meta.label[x],
              color: _this2.props.meta.color[x]
            };
          })
        })) : _react.default.createElement(_reactTable.default, {
          data: this.tableData,
          columns: this.tableCols,
          defaultPageSize: 50,
          style: {
            width: "calc(100% - 10px)",
            height: "calc(100% - 30px)",
            zoom: 0.7
          },
          className: "-striped -highlight dash-chart"
        })));
      } catch (error) {
        return _react.default.createElement("div", null, "ThyboltChart: ", JSON.stringify(error));
      }
    }
  }]);

  return ThyboltChart;
}(_react.Component);

ThyboltChart.propTypes = {
  id: _propTypes.default.string,
  updateAxis: _propTypes.default.func,
  removeAxis: _propTypes.default.func,
  addAxis: _propTypes.default.func,
  meta: _propTypes.default.shape({
    color: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    dash: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    label: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    offset: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    scale: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    size: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    source: _propTypes.default.shape({
      x: _propTypes.default.string.isRequired,
      y: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired
    }).isRequired,
    title: _propTypes.default.string.isRequired,
    type: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    visible: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
    width: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired
  }).isRequired,
  data: _propTypes.default.object,
  color: _propTypes.default.string
};
var _default = ThyboltChart;
exports.default = _default;