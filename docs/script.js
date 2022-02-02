const equalStyle = {
  height: 120,
  backgroundColor: "#995ba4",
  bottom: 7,
  position: "absolute" };

const clearStyle = { backgroundColor: "#b83146" };
const equationStyle = { backgroundColor: "#b2b2b2" };
const equation = /[/*+]|[-]/;
const confirmEquation = /[x/+]$|[-]$/;
const secondConfirm = /\d[x/+][-]$|\d[-][-]$/;
const negative = /[-]/;
const dotTester = /[.]/;
const prevTester = /^[/*-+]/;


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVal: "",
      displayVal: "0",
      prevVal: "0",
      clicked: "",
      eval: false };

    this.clearCal = this.clearCal.bind(this);
    this.clickedNumber = this.clickedNumber.bind(this);
    this.operatorCheck = this.operatorCheck.bind(this);
    this.calculateEx = this.calculateEx.bind(this);
    this.decimalImp = this.decimalImp.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidUpdate() {
    this.playSound();
  }
  clearCal() {
    this.setState({
      totalVal: "",
      displayVal: "0",
      prevVal: "0",
      clicked: "",
      eval: false });

  }
  operatorCheck(e) {
    const operator = e.target.value;
    this.setState({ displayVal: operator, clicked: operator });
    if (!confirmEquation.test(this.state.totalVal) && !this.state.totalVal.includes("=")) {
      this.setState({ totalVal: this.state.totalVal + operator, prevVal: this.state.totalVal });
    } else
    if (this.state.totalVal.includes("=")) {
      this.setState({ totalVal: this.state.prevVal + operator });
    } else
    if (confirmEquation.test(this.state.totalVal) && !secondConfirm.test(this.state.totalVal)) {
      if (operator != "-") {
        this.setState({ totalVal: this.state.prevVal + operator });
      } else
      if (!secondConfirm.test(this.state.totalVal)) {
        this.setState({ totalVal: this.state.totalVal + operator });
      }
    } else
    if (secondConfirm.test(this.state.totalVal)) {
      this.setState({ totalVal: this.state.prevVal + operator });
    }
  }
  calculateEx() {
    console.log("hello?");
    let formula = this.state.totalVal.replace(/[x]/, '*');
    let negRex = /(?<![(])[-]\d+/;
    let tester = /[/*+][-]|[-][-]/;
    if (tester.test(formula)) {
      formula = formula.replace(negRex, `(${formula.match(negRex)})`);
    }
    console.log(formula);

    let answer = Math.round(1000000000000 * eval(formula)) / 1000000000000;
    answer = answer.toString();
    this.setState({ totalVal: this.state.totalVal + "=" + answer, displayVal: answer, prevVal: answer });

  }

  clickedNumber(e) {
    const clickedNum = e.target.value;
    if (this.state.displayVal == "0" && this.state.totalVal == "") {
      this.setState({ displayVal: clickedNum, totalVal: clickedNum });
    } else
    if (equation.test(this.state.clicked)) {
      this.setState({ displayVal: clickedNum, totalVal: this.state.totalVal + clickedNum, clicked: "" });
    } else
    if (this.state.displayVal != "0") {
      this.setState({ displayVal: this.state.displayVal + clickedNum, totalVal: this.state.totalVal + clickedNum });
    }
  }

  decimalImp() {
    if (!this.state.displayVal.includes(".") && this.state.totalVal != "") {
      this.setState({ totalVal: this.state.totalVal + ".", displayVal: this.state.displayVal + "." });
    } else
    if (!this.state.displayVal.includes(".") && this.state.totalVal == "") {
      this.setState({ totalVal: "0.", displayVal: "0." });
    }
  }
  playSound() {
    let x = document.getElementById("click");
    x.currentTime = 0;
    x.play();
  }


  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "calculatorBody" }, /*#__PURE__*/
      React.createElement("audio", { id: "click", src: "http://www.soundjay.com/communication/sounds/tape-recorder-close-1.mp3" }), /*#__PURE__*/
      React.createElement(OutputDisplay, { formula: this.state.totalVal }), /*#__PURE__*/
      React.createElement(InputDisplay, { currentValue: this.state.displayVal }), /*#__PURE__*/
      React.createElement(Buttons, { number: this.clickedNumber, starter: this.clearCal, operator: this.operatorCheck, calculate: this.calculateEx, decimal: this.decimalImp })));


  }}



class Buttons extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "mainButtons" }, /*#__PURE__*/
      React.createElement("button", { style: clearStyle, className: "wide", id: "clear", value: "AC", onClick: this.props.starter }, "AC"), /*#__PURE__*/
      React.createElement("button", { style: equationStyle, id: "divide", value: "/", onClick: this.props.operator }, "/"), /*#__PURE__*/
      React.createElement("button", { style: equationStyle, id: "multiply", value: "x", onClick: this.props.operator }, "x"), /*#__PURE__*/
      React.createElement("button", { id: "one", value: "1", onClick: this.props.number }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "two", value: "2", onClick: this.props.number }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "three", value: "3", onClick: this.props.number }, "3"), /*#__PURE__*/
      React.createElement("button", { style: equationStyle, id: "subtract", value: "-", onClick: this.props.operator }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "four", value: "4", onClick: this.props.number }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "five", value: "5", onClick: this.props.number }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "six", value: "6", onClick: this.props.number }, "6"), /*#__PURE__*/
      React.createElement("button", { style: equationStyle, id: "add", value: "+", onClick: this.props.operator }, "+"), /*#__PURE__*/
      React.createElement("button", { id: "seven", value: "7", onClick: this.props.number }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "eight", value: "8", onClick: this.props.number }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "nine", value: "9", onClick: this.props.number }, "9"), /*#__PURE__*/
      React.createElement("button", { className: "wide", id: "zero", value: "0", onClick: this.props.number }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "decimal", value: ".", onClick: this.props.decimal }, "."), /*#__PURE__*/
      React.createElement("button", { style: equalStyle, id: "equals", value: "=", onClick: this.props.calculate }, "=")));


  }}


class InputDisplay extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "display", className: "display1" }, this.props.currentValue));

  }}


class OutputDisplay extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "display2" }, this.props.formula));

  }}




ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.getElementById("root"));