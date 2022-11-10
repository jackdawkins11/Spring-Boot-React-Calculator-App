'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function CalculatorScreen(props) {
  return React.createElement(
    "div",
    { className: "calculator-top" },
    props.screenValue
  );
}

function CalculatorButton(props) {
  var classNames = "calculator-button " + props.classNames;
  return React.createElement(
    "div",
    { className: classNames,
      onClick: props.onClick },
    props.calculatorButtonValue
  );
}

/* Buttons on calculator. Stored as [ column1, column2, column3, column4 ] */
var calculatorButtonValues = [['+', '7', '4', '1', '0'], ['-', '8', '5', '2', '.'], ['*', '9', '6', '3', 'c'], ['/', '=']];

/*
Renders the calculator.
*/

function CalculatorRender(props) {
  var columns = [];
  for (var c = 0; c < 4; c++) {
    var column = [];

    var _loop = function _loop(r) {
      var button = calculatorButtonValues[c][r];
      var classNames = "";
      if (c === 3 && r == 1) {
        classNames += "equal-button";
      }
      if (r === 0) {
        classNames += " operator-button";
      }
      column.push(React.createElement(CalculatorButton, {
        key: button,
        classNames: classNames,
        calculatorButtonValue: button,
        onClick: function onClick() {
          return props.buttonClick(button);
        } }));
    };

    for (var r = 0; c < 3 && r < 5 || c === 3 && r < 2; r++) {
      _loop(r);
    }
    columns.push(React.createElement(
      "div",
      { className: "calculator-column", key: c },
      column
    ));
  }
  return React.createElement(
    "div",
    { className: "calculator-area" },
    React.createElement(
      "div",
      { className: "calculator" },
      React.createElement(CalculatorScreen, { screenValue: props.screenValue }),
      React.createElement(
        "div",
        { className: "calculator-bottom" },
        columns
      )
    )
  );
}

/*
Calculator class.
It keeps track of its state with the 'inputs' array.

len( inputs ) == 0  ==>  Waiting for first number
len( inputs ) == 1  ==>  In the process of entering the first number
len( inputs ) == 2  ==>  The first number and the operation have been entered
len( inputs ) == 3  ==>  Entering the second number

Digits and '.' can be entered in all 4 states. Ops can only
be entered in state 1. '=' can only be entered in state 3. 'c'
can be entered anytime.

*/

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this.state = {
      screen: 0
    };
    _this.inputs = [];
    _this.MAXSCREENDIGITS = 10;
    return _this;
  }

  /*
  Takes as input the character entered and updates state
  */


  _createClass(Calculator, [{
    key: "buttonPushed",
    value: function buttonPushed(button) {
      var inputStep = this.inputs.length;
      if (isDigit(button)) {
        if (inputStep === 0) {
          this.inputs.push(button);
          this.setState({ screen: this.inputs[0] });
        } else if (inputStep === 1) {
          this.inputs[0] += button;
          this.setState({ screen: this.inputs[0] });
        } else if (inputStep === 2) {
          this.inputs.push(button);
          this.setState({ screen: this.inputs[2] });
        } else if (inputStep === 3) {
          this.inputs[2] += button;
          this.setState({ screen: this.inputs[2] });
        }
      } else if (isDecPoint(button)) {
        if (inputStep === 0) {
          this.inputs.push(button);
          this.setState({ screen: this.inputs[0] });
        } else if (inputStep === 1 && !this.inputs[0].includes('.')) {
          this.inputs[0] += button;
          this.setState({ screen: this.inputs[0] });
        } else if (inputStep === 2) {
          this.inputs.push(button);
          this.setState({ screen: this.inputs[2] });
        } else if (inputStep === 3 && !this.inputs[2].includes('.')) {
          this.inputs[2] += button;
          this.setState({ screen: this.inputs[2] });
        }
      } else if (isOp(button)) {
        if (inputStep === 1) {
          this.inputs.push(button);
        }
      } else if (isEqu(button)) {
        if (inputStep === 3) {
          var calculation = doCalculation(this.inputs).toPrecision(this.MAXSCREENDIGITS);
          calculation = parseFloat(calculation);
          this.postCalculation(this.inputs, calculation);
          this.inputs = [];
          this.setState({ screen: calculation });
        }
      } else if (isClear(button)) {
        this.inputs = [];
        this.setState({ screen: 0 });
      }
    }

    /*
    Sends a calculation to the server.
    */

  }, {
    key: "postCalculation",
    value: function postCalculation(inputs, output) {
      var _this2 = this;

      var x = String(inputs[0]),
          op = inputs[1],
          y = String(inputs[2]),
          val = String(output),
          date = getDateTimeString();
      var calculation = new URLSearchParams();
      calculation.append("x", x);
      calculation.append("op", op);
      calculation.append("y", y);
      calculation.append("val", val);
      calculation.append("date", date);
      fetch("AddCalculation", {
        method: "POST",
        body: calculation
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        if (!result.error) {
          //do something
        } else {
          _this2.error("There was an error");
        }
      }).catch(function (reason) {
        _this2.error("There was an error " + reason);
      });
    }
  }, {
    key: "error",
    value: function error(message) {
      console.log(message);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(CalculatorRender, {
        screenValue: this.state.screen,
        buttonClick: function buttonClick(c) {
          return _this3.buttonPushed(c);
        } });
    }
  }]);

  return Calculator;
}(React.Component);

function isDigit(str) {
  return str.length === 1 && /[0-9]/.test(str);
}

function isDecPoint(str) {
  return str === '.';
}

function isOp(str) {
  return str.length === 1 && "+-*/".includes(str);
}

function isEqu(str) {
  return str === '=';
}

function isClear(str) {
  return str === 'c';
}

/*
Does the calculation on the given inputs array.
inputs is of the form [ number, operation, number ]
*/

function doCalculation(inputs) {
  var op = inputs[1];
  var x = parseFloat(inputs[0]);
  var y = parseFloat(inputs[2]);
  if (op === '+') {
    return x + y;
  } else if (op === '-') {
    return x - y;
  } else if (op === '*') {
    return x * y;
  } else if (op === '/') {
    return x / y;
  }
}

/*
Generates a string representation of the current time
in a MySQL datetime formate.
*/
function getDateTimeString() {
  var date = new Date();
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + " " + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0");
}

export { Calculator };