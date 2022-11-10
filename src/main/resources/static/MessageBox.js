'use strict';

/*
The following 2 functions render inner parts
of a message.
*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function MessageLeft(props) {
    return React.createElement(
        "div",
        { className: "message-left" },
        React.createElement(
            "div",
            { className: "message-avatar" },
            props.avatarChar
        )
    );
}

function MessageRight(props) {
    return React.createElement(
        "div",
        { className: "message-right" },
        React.createElement(
            "div",
            { className: "message-header" },
            React.createElement(
                "div",
                { className: "message-name" },
                props.messageSenderName
            ),
            React.createElement(
                "div",
                { className: "message-time" },
                props.messageTime
            )
        ),
        React.createElement(
            "div",
            { className: "message-content" },
            props.messageContent
        )
    );
}

/*
Renders a single message.
*/
function Message(props) {
    return React.createElement(
        "div",
        { className: "message " + props.parity },
        React.createElement(MessageLeft, { avatarChar: props.avatarChar }),
        React.createElement(MessageRight, { messageSenderName: props.messageSenderName,
            messageTime: props.messageTime,
            messageContent: props.messageContent })
    );
}

/*
Renders the MessageBox.
*/
function MessageBoxRender(props) {
    var rows = props.messages.map(function (message, idx) {
        var parity = idx % 2 == 0 ? 'even' : 'odd';
        return React.createElement(Message, { key: idx,
            avatarChar: message.avatarChar,
            messageSenderName: message.messageSenderName,
            messageTime: message.messageTime,
            messageContent: message.messageContent,
            parity: parity });
    });
    return React.createElement(
        "div",
        { className: "message-box" },
        " ",
        rows,
        " "
    );
}

/*
MessageBox class.

Keeps an updated list of the last 10 calculations. Renders the
MessageBox.
*/

var MessageBox = function (_React$Component) {
    _inherits(MessageBox, _React$Component);

    function MessageBox(props) {
        _classCallCheck(this, MessageBox);

        var _this = _possibleConstructorReturn(this, (MessageBox.__proto__ || Object.getPrototypeOf(MessageBox)).call(this, props));

        _this.state = {
            messages: []
        };
        return _this;
    }

    _createClass(MessageBox, [{
        key: "render",
        value: function render() {
            return React.createElement(MessageBoxRender, { messages: this.state.messages });
        }
        /*
        Calls getMessages() every half second.
        */

    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.messageRefresher = setInterval(function () {
                return _this2.getMessages();
            }, 500);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.messageRefresher);
        }
        /*
        Gets the last 10 calculations from the server.
        */

    }, {
        key: "getMessages",
        value: function getMessages() {
            var _this3 = this;

            fetch("GetLast10Calculations", { method: "POST" }).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.error) {
                    console.log("Error getting calculations");
                } else {
                    var messages = result.calculations.map(calculationToMessage);
                    _this3.setState({
                        messages: messages
                    });
                }
            }).catch(function (reason) {
                console.log(reason);
            });
        }
    }]);

    return MessageBox;
}(React.Component);

/*
Transforms a calculation from the database into a form suitable
for displaying.

The input, 'calculation', has the form
    calculation[ 'Username' ] = (string) the username associated with the calculation
    calculation[ 'Date' ] = (string) MySQL datetime string for when the calculation was made
    calculation[ 'X' ] = (string) the first number in the calculation
    calculation[ 'Op' ] = (string) the operation in the calculation
    calculation[ 'Y' ] = (string) the second number in the calculation
    calculation[ 'Val' ] = (string) the output of the calculation

The output is an object containing the following
    messageSenderName (string) the username associated with the calculation
    avatarChar (string) the first letter of the username
    messageTime (string) string representation of the time of day the calculation was made
    messageContent (string) string displaying the calculation

*/


function calculationToMessage(calculation) {
    var username = calculation['Username'];
    var time = new Date(calculation['Date'].replace(/-/g, '/'));
    var content = calculation['X'] + ' ' + calculation['Op'] + ' ' + calculation['Y'] + " = " + calculation['Val'];
    var avatarChar = username[0].toUpperCase();
    var hours = time.getHours() % 12;
    if (hours == 0) {
        hours = 12;
    }
    var minutes = String(time.getMinutes()).padStart(2, "0");
    var partOfDay = time.getHours() >= 12 ? "PM" : "AM";
    time = String(hours) + ":" + String(minutes) + " " + partOfDay;
    return {
        messageSenderName: username,
        avatarChar: avatarChar,
        messageTime: time,
        messageContent: content
    };
}

export { MessageBox };