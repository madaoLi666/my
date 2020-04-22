"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PI = Math.PI;
var defaultProp = {
  strokeColor: '#2db7f5',
  width: 400,
  height: 400,
  gapDegree: 150,
  // 顺时针旋转为正
  rotate: 0,
  // 颜色百分比
  percent: 0,
  textArray: []
};

var percentValid = function percentValid(percent) {
  if (percent > 100) {
    return 100;
  } else if (percent < 0) {
    return 0;
  }

  return percent;
};

var CircleProgress = /*#__PURE__*/function (_Component) {
  _inherits(CircleProgress, _Component);

  var _super = _createSuper(CircleProgress);

  function CircleProgress(_props) {
    var _this;

    _classCallCheck(this, CircleProgress);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "update", function (props) {
      var width = props.width,
          height = props.height,
          rotate = props.rotate,
          gapDegree = props.gapDegree,
          strokeColor = props.strokeColor,
          percent = props.percent,
          textArray = props.textArray;

      var ctx = _this.cp.current.getContext('2d'); // ctx.clearRect(0,0,width, height);
      // // arc(x, y, radius, startAngle, endAngle, <anticlockwise>)


      var radius = width > height ? height / 2 - 15 : width / 2 - 15; // // 这个位置需要将gapDegree转为弧度 startAngle于endAngle左端

      var startAngle = 0.5 * PI + gapDegree / 2 / 360 * 2 * PI + rotate / 360 * PI;
      var endAngle = 0.5 * PI - gapDegree / 2 / 360 * 2 * PI + rotate / 360 * PI; // // 第一段底部曲线 -- 这个考虑只画一次

      ctx.beginPath();
      ctx.strokeStyle = '#eee';
      ctx.arc(width / 2, height / 2, radius, startAngle, endAngle);
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke(); // // 渲染文字

      var lineRadian = 2 * PI - startAngle + endAngle;

      for (var i = 0; i < textArray.length; i++) {
        // js 的三角函数接收弧度
        var currentRadian = lineRadian / (textArray.length - 1) * i + startAngle;
        var cX = (radius - 35) * Math.cos(currentRadian) + width / 2;
        var cY = (radius - 35) * Math.sin(currentRadian) + height / 2;
        ctx.font = "30px Arial";
        ctx.fillStyle = "#C8C8C8";
        ctx.textAlign = "center";
        ctx.fillText(textArray[i], cX, cY);
      } // ctx.clearRect(0,0,width,height);
      // 百分比 - start不变 变后面的那一段


      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      var preEndAngle = lineRadian / 100 * percentValid(percent) + startAngle;
      ctx.arc(width / 2, height / 2, radius, startAngle, preEndAngle);
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke(); // 绘制完成 

      _this.setState({
        np: props
      });
    });

    _this.state = {
      np: {}
    };
    _this.cp = _react.default.createRef();
    return _this;
  }

  _createClass(CircleProgress, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      var _this$props = this.props,
          _this$props$strokeCol = _this$props.strokeColor,
          strokeColor = _this$props$strokeCol === void 0 ? defaultProp.strokeColor : _this$props$strokeCol,
          _this$props$width = _this$props.width,
          width = _this$props$width === void 0 ? defaultProp.width : _this$props$width,
          _this$props$height = _this$props.height,
          height = _this$props$height === void 0 ? defaultProp.height : _this$props$height,
          _this$props$gapDegree = _this$props.gapDegree,
          gapDegree = _this$props$gapDegree === void 0 ? defaultProp.gapDegree : _this$props$gapDegree,
          _this$props$rotate = _this$props.rotate,
          rotate = _this$props$rotate === void 0 ? defaultProp.rotate : _this$props$rotate,
          _this$props$percent = _this$props.percent,
          percent = _this$props$percent === void 0 ? defaultProp.percent : _this$props$percent,
          _this$props$textArray = _this$props.textArray,
          textArray = _this$props$textArray === void 0 ? defaultProp.textArray : _this$props$textArray;
      this.setState({
        np: {
          strokeColor: strokeColor,
          width: width,
          height: height,
          gapDegree: gapDegree,
          rotate: rotate,
          percent: percent,
          textArray: textArray
        }
      }, function () {
        var nowNP = Object.assign({}, _this2.state.np);
        var a = 0;
        var dis = (_this2.props.percent - nowNP.percent) / 100;
        var s = setInterval(function () {
          if (a === 100) {
            clearInterval(s);
          }

          a++;
          nowNP.percent += dis;
          self.update(nowNP);
        }, 5);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
        var nowNP = Object.assign({}, this.state.np);
        var a = 0;
        var dis = (this.props.percent - nowNP.percent) / 100;
        var s = setInterval(function () {
          if (a === 100) {
            clearInterval(s);
          }

          a++;
          nowNP.percent += dis;
          this.update(nowNP);
        }, 5);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state$np = this.state.np,
          width = _this$state$np.width,
          height = _this$state$np.height;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("canvas", {
        ref: this.cp,
        width: width,
        height: height
      }));
    }
  }]);

  return CircleProgress;
}(_react.Component);

exports["default"] = CircleProgress;
module.exports = exports['default'];

CircleProgress.propTypes = {
  strokeColor: _propTypes.default.string,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  gapDegree: _propTypes.default.number,
  // 顺时针旋转为正
  rotate: _propTypes.default.number,
  // 颜色百分比
  percent: _propTypes.default.number,
  textArray: _propTypes.default.arrayOf(_propTypes.default.string)
};