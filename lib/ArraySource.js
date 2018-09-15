"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _LabeledEditText = _interopRequireDefault(require("./LabeledEditText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ArraySource =
/*#__PURE__*/
function (_Component) {
  _inherits(ArraySource, _Component);

  function ArraySource(props) {
    var _this;

    _classCallCheck(this, ArraySource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArraySource).call(this, props));
    _this.state = _objectSpread({}, _this.props.axis, {
      unsaved: false
    });
    return _this;
  }

  _createClass(ArraySource, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        style: {
          background: this.state.visible === false ? "#ddd" : "transparent"
        }
      }, _react.default.createElement("tt", null, this.props.Xaxis ? _react.default.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "row"
        }
      }, _react.default.createElement(_LabeledEditText.default, {
        options: [true, false],
        onChange: function onChange(value) {
          _this2.setState({
            xAxisVisible: JSON.parse(value),
            unsaved: true
          });
        },
        value: this.state.xAxisVisible,
        key: "xAxisVisible",
        title: "xAxisVisible"
      }), _react.default.createElement(_LabeledEditText.default, {
        options: [true, false],
        onChange: function onChange(value) {
          _this2.setState({
            yAxisVisible: JSON.parse(value),
            unsaved: true
          });
        },
        value: this.state.yAxisVisible,
        key: "yAxisVisible",
        title: "yAxisVisible"
      }), _react.default.createElement(_LabeledEditText.default, {
        options: [true, false],
        onChange: function onChange(value) {
          _this2.setState({
            horizontalGrid: JSON.parse(value),
            unsaved: true
          });
        },
        value: this.state.horizontalGrid,
        key: "horizontalGrid",
        title: "horizontalGrid"
      }), _react.default.createElement(_LabeledEditText.default, {
        options: [true, false],
        onChange: function onChange(value) {
          _this2.setState({
            verticalGrid: JSON.parse(value),
            unsaved: true
          });
        },
        value: this.state.verticalGrid,
        key: "verticalGrid",
        title: "verticalGrid"
      }), _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            tickAngle: value,
            unsaved: true
          });
        },
        value: this.state.tickAngle,
        key: "tickAngle",
        title: "tickAngle",
        number: true
      })) : _react.default.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "row",
          width: "25%"
        }
      }, _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            label: value,
            unsaved: true
          });
        },
        value: this.state.label,
        key: "label",
        title: "label"
      }), _react.default.createElement(_LabeledEditText.default, {
        options: ["line", "bar"],
        onChange: function onChange(value) {
          _this2.setState({
            type: value,
            unsaved: true
          });
        },
        value: this.state.type,
        key: "type",
        title: "type"
      }), _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            color: value,
            unsaved: true
          });
        },
        value: this.state.color,
        key: "color",
        title: "color"
      }), _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            width: value,
            unsaved: true
          });
        },
        value: this.state.width,
        key: "width",
        title: "width",
        number: true
      }), _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            dash: value,
            unsaved: true
          });
        },
        value: this.state.dash,
        key: "dash",
        title: "dash"
      }), _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            size: value,
            unsaved: true
          });
        },
        value: this.state.size,
        key: "size",
        title: "size",
        number: true
      }), _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            scale: value,
            unsaved: true
          });
        },
        value: this.state.scale,
        key: "scale",
        title: "scale",
        number: true
      }), _react.default.createElement(_LabeledEditText.default, {
        onChange: function onChange(value) {
          _this2.setState({
            offset: value,
            unsaved: true
          });
        },
        value: this.state.offset,
        key: "offset",
        title: "offset",
        number: true
      }), _react.default.createElement(_LabeledEditText.default, {
        options: [true, false],
        onChange: function onChange(value) {
          _this2.setState({
            visible: JSON.parse(value),
            unsaved: true
          });
        },
        value: this.state.visible,
        key: "visible",
        title: "visible"
      }))), _react.default.createElement("textarea", {
        style: {
          background: "transparent"
        },
        defaultValue: this.state.source,
        onChange: function onChange(e) {
          _this2.setState({
            source: e.currentTarget.value,
            unsaved: true
          });
        },
        className: "graphSourceEditor"
      }), _react.default.createElement("br", null), _react.default.createElement("tt", null, _react.default.createElement("span", {
        onClick: function onClick() {
          try {
            var clout = new Function("data", _this2.state.source)(_this2.props.data);
            alert(JSON.stringify(clout));
            console.log(clout);
          } catch (error) {
            alert("Error: " + error.message);
            console.log(error);
          }
        },
        className: "graphSourceButtons",
        style: {
          background: "lightgray"
        }
      }, "TEST"), _react.default.createElement("span", {
        onClick: function onClick() {
          _this2.setState({
            unsaved: false
          });

          _this2.props.onChange(_this2.state, _this2.props.index);
        },
        className: "graphSourceButtons",
        style: {
          background: "lightgreen"
        }
      }, "SAVE", this.state.unsaved ? "*" : ""), !this.props.Xaxis && !this.props.noDelete && _react.default.createElement("span", {
        onClick: function onClick() {
          _this2.props.onDelete(_this2.props.index);
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

var _default = ArraySource;
exports.default = _default;