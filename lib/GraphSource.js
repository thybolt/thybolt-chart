"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LabeledEditText =
/*#__PURE__*/
function (_Component) {
  _inherits(LabeledEditText, _Component);

  function LabeledEditText(props) {
    var _this;

    _classCallCheck(this, LabeledEditText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LabeledEditText).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(LabeledEditText, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        style: {
          marginRight: "20px"
        }
      }, _react.default.createElement("div", {
        style: {
          fontSize: "10px",
          opacity: 0.7
        }
      }, this.props.title), this.props.options ? _react.default.createElement("select", {
        value: this.props.value,
        onChange: function onChange(e) {
          _this2.props.onChange(e.target.value);
        }
      }, this.props.options.map(function (x) {
        return _react.default.createElement("option", {
          value: x
        }, x);
      })) : _react.default.createElement("input", {
        type: this.props.number ? "number" : "text",
        onChange: function onChange(e) {
          _this2.props.onChange(e.target.value);
        },
        style: {
          fontSize: "11px",
          border: "none",
          borderBottom: "1px solid #aaa",
          width: "62px"
        },
        defaultValue: this.props.value
      }));
    }
  }]);

  return LabeledEditText;
}(_react.Component);

var ArraySource =
/*#__PURE__*/
function (_Component2) {
  _inherits(ArraySource, _Component2);

  function ArraySource(props) {
    var _this3;

    _classCallCheck(this, ArraySource);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ArraySource).call(this, props));
    _this3.state = {
      source: _this3.props.Xaxis ? _this3.props.meta.source.x : _this3.props.meta.source.y[_this3.props.axis],
      xAxisVisibility: Boolean(_this3.props.meta.xAxisVisibility),
      label: _this3.props.meta.label[_this3.props.axis],
      color: _this3.props.meta.color[_this3.props.axis],
      width: _this3.props.meta.width[_this3.props.axis],
      dash: _this3.props.meta.dash[_this3.props.axis],
      size: _this3.props.meta.size[_this3.props.axis],
      scale: _this3.props.meta.scale[_this3.props.axis],
      offset: _this3.props.meta.offset[_this3.props.axis],
      type: _this3.props.meta.type[_this3.props.axis],
      visible: _this3.props.meta.visible[_this3.props.axis]
    };
    return _this3;
  }

  _createClass(ArraySource, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement("div", null, _react.default.createElement("tt", null, this.props.Xaxis ? _react.default.createElement("span", null) : _react.default.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "row"
        }
      }, _react.default.createElement(LabeledEditText, {
        onChange: function onChange(value) {
          _this4.setState({
            label: value
          });
        },
        value: this.state.label,
        title: "label"
      }), _react.default.createElement(LabeledEditText, {
        options: ["bar", "line"],
        onChange: function onChange(value) {
          _this4.setState({
            type: value
          });
        },
        value: this.state.type,
        title: "type",
        number: true
      }), _react.default.createElement(LabeledEditText, {
        onChange: function onChange(value) {
          _this4.setState({
            color: value
          });
        },
        value: this.state.color,
        title: "color"
      }), _react.default.createElement(LabeledEditText, {
        onChange: function onChange(value) {
          _this4.setState({
            width: value
          });
        },
        value: this.state.width,
        title: "width",
        number: true
      }), _react.default.createElement(LabeledEditText, {
        onChange: function onChange(value) {
          _this4.setState({
            dash: value
          });
        },
        value: this.state.dash,
        title: "dash",
        number: true
      }), _react.default.createElement(LabeledEditText, {
        onChange: function onChange(value) {
          _this4.setState({
            size: value
          });
        },
        value: this.state.size,
        title: "size",
        number: true
      }), _react.default.createElement(LabeledEditText, {
        onChange: function onChange(value) {
          _this4.setState({
            scale: value
          });
        },
        value: this.state.scale,
        title: "scale",
        number: true
      }), _react.default.createElement(LabeledEditText, {
        onChange: function onChange(value) {
          _this4.setState({
            offset: value
          });
        },
        value: this.state.offset,
        title: "offset",
        number: true
      }), _react.default.createElement(LabeledEditText, {
        options: ["true", "false"],
        onChange: function onChange(value) {
          _this4.setState({
            visible: value
          });
        },
        value: this.state.visible,
        title: "visiblity"
      })), this.props.Xaxis && _react.default.createElement("span", null, _react.default.createElement("input", {
        type: "checkbox",
        checked: this.state.xAxisVisibility,
        onChange: function onChange(e) {
          _this4.setState({
            xAxisVisibility: e.target.checked
          });
        }
      }), "X Axis Visibility")), _react.default.createElement("textarea", {
        defaultValue: this.state.source,
        onChange: function onChange(e) {
          _this4.setState({
            source: e.currentTarget.value
          });
        },
        className: "graphSourceEditor"
      }), _react.default.createElement("br", null), _react.default.createElement("tt", null, _react.default.createElement("span", {
        onClick: function onClick() {
          try {
            alert(JSON.stringify(new Function('data', _this4.state.source)(_this4.props.data))); //alert(JSON.stringify(eval( `var data=${JSON.stringify(this.props.data)};${this.state.source}`)));
            //console.log(eval( `var data=${JSON.stringify(this.props.data)};${this.state.source}`))
          } catch (error) {
            alert("Error: " + error.message);
          }
        },
        className: "graphSourceButtons",
        style: {
          background: "lightgray"
        }
      }, "TEST"), _react.default.createElement("span", {
        onClick: function onClick() {
          _this4.props.updateAxis(_this4.props.id, _this4.props.Xaxis ? -1 : _this4.props.axis, _this4.state.source, _this4.state.xAxisVisibility, _this4.state.label, _this4.state.color, _this4.state.width, _this4.state.dash, _this4.state.size, _this4.state.scale, _this4.state.offset, _this4.state.type, _this4.state.visible);
        },
        className: "graphSourceButtons",
        style: {
          background: "lightgreen"
        }
      }, "SAVE"), !this.props.Xaxis && this.props.meta.label.length > 1 && _react.default.createElement("span", {
        onClick: function onClick() {
          _this4.props.removeAxis(_this4.props.id, _this4.props.axis);
        },
        className: "graphSourceButtons",
        style: {
          background: "orange",
          float: "right"
        }
      }, "DELETE")), _react.default.createElement("br", null), _react.default.createElement("br", null));
    }
  }]);

  return ArraySource;
}(_react.Component);

var GraphSource =
/*#__PURE__*/
function (_Component3) {
  _inherits(GraphSource, _Component3);

  function GraphSource(props) {
    var _this5;

    _classCallCheck(this, GraphSource);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(GraphSource).call(this, props));
    _this5.state = {};
    return _this5;
  }

  _createClass(GraphSource, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      var arraySources = _toConsumableArray(Array(this.props.meta.source.y.length).keys()).map(function (axis) {
        return _react.default.createElement(ArraySource, _extends({}, _this6.props, {
          axis: axis
        }));
      });

      return _react.default.createElement("div", {
        className: "graphSource"
      }, _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement("b", null, "Data available:"), " ", Object.keys(this.props.data).join(" ,")), _react.default.createElement("span", {
        className: "graphControlButtons"
      }, _react.default.createElement("i", {
        onClick: this.props.closeEditor,
        className: "fas fa-times"
      }))), _react.default.createElement("br", null), _react.default.createElement("div", null, _react.default.createElement(ArraySource, _extends({}, this.props, {
        Xaxis: true,
        meta: this.props.meta
      })), arraySources), _react.default.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, _react.default.createElement("span", {
        onClick: function onClick() {
          _this6.props.addAxis(_this6.props.id);
        },
        className: "graphSourceButtons",
        style: {
          background: "skyblue",
          padding: "5px 21px"
        }
      }, "ADD")));
    }
  }]);

  return GraphSource;
}(_react.Component);

var _default = GraphSource;
exports.default = _default;