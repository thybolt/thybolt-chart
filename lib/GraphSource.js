"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ArraySource = _interopRequireDefault(require("./ArraySource"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GraphSource =
/*#__PURE__*/
function (_Component) {
  _inherits(GraphSource, _Component);

  function GraphSource(props) {
    var _this;

    _classCallCheck(this, GraphSource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GraphSource).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stringToColour", function (str) {
      var hash = 0;

      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      var colour = "#";

      for (var i = 0; i < 3; i++) {
        var value = hash >> i * 8 & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
      }

      return colour;
    });

    _this.state = {};
    return _this;
  } //https://stackoverflow.com/a/16348977/1970053


  _createClass(GraphSource, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var arraySources = this.props.descriptor.y ? _toConsumableArray(Array(this.props.descriptor.y.length).keys()).map(function (axis) {
        return _react.default.createElement(_ArraySource.default, {
          axis: _this2.props.descriptor.y[axis],
          key: axis,
          data: _this2.props.data,
          index: axis,
          noDelete: _this2.props.descriptor.y.length <= 1,
          onDelete: function onDelete(index) {
            var meta = _this2.props.descriptor;
            meta.y.splice(index, 1);

            _this2.props.onChange(meta);
          },
          onChange: function onChange(axis, index) {
            var meta = _this2.props.descriptor;
            meta.y[index] = axis;

            _this2.props.onChange(meta);
          }
        });
      }) : [];
      return _react.default.createElement("div", {
        className: "graphSource",
        style: {
          borderLeft: "6px solid ".concat(this.props.color ? this.props.color : "#13949B")
        }
      }, _react.default.createElement("div", null, this.props.data && _react.default.createElement("span", null, _react.default.createElement("br", null), Object.keys(this.props.data).map(function (key) {
        return _react.default.createElement("span", {
          style: {
            padding: "3px 5px",
            background: _this2.stringToColour(key)
          },
          className: "graphSourceButtons"
        }, key);
      })), _react.default.createElement("span", {
        className: "graphControlButtons"
      }, _react.default.createElement("i", {
        onClick: this.props.closeEditor,
        className: "fas fa-times"
      }))), _react.default.createElement("br", null), _react.default.createElement("div", null, _react.default.createElement("h2", null, "X Axis"), _react.default.createElement(_ArraySource.default, {
        Xaxis: true,
        data: this.props.data,
        axis: this.props.descriptor.x,
        onChange: function onChange(axis, _) {
          var meta = _this2.props.descriptor;
          meta.x = axis;

          _this2.props.onChange(meta);
        }
      }), _react.default.createElement("hr", null), _react.default.createElement("h2", null, "Y Axes (", arraySources.length, ")"), arraySources), _react.default.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, _react.default.createElement("span", {
        onClick: function onClick() {
          var newAxis = {
            source: "return [".concat(_toConsumableArray(Array(90).keys()).map(function (_) {
              return Math.floor(Math.random() * 100);
            }), "];"),
            label: "Y".concat(new Date().getTime() % 10000),
            color: "",
            width: "2",
            dash: "0",
            size: "0",
            scale: "1",
            offset: "0",
            type: "line",
            visible: true
          };
          var meta = _this2.props.descriptor;
          meta.y.push(newAxis);

          _this2.props.onChange(meta);
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