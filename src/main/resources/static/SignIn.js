'use strict';

/*
Renders a div containing the input element
for the username
*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function SignInUsername(props) {
    return React.createElement(
        "div",
        { className: "auth-content" },
        React.createElement(
            "div",
            { className: "auth-content-label" },
            "Username"
        ),
        React.createElement("input", { className: "auth-content-input", onChange: props.onChange })
    );
}

/*
Renders a div containing the input element
for the password
*/

function SignInPassword(props) {
    return React.createElement(
        "div",
        { className: "auth-content" },
        React.createElement(
            "div",
            { className: "auth-content-label" },
            "Password"
        ),
        React.createElement("input", { type: "password", className: "auth-content-input", onChange: props.onChange })
    );
}

/*
Renders a div containing a message
*/

function SignInMessage(props) {
    return React.createElement(
        "div",
        { className: "auth-content" },
        React.createElement(
            "div",
            { className: "auth-content-message message-red" },
            props.message
        )
    );
}

/*
Renders a div containing the button for signing in.
*/

function SignInButton(props) {
    return React.createElement(
        "div",
        { className: "auth-content" },
        React.createElement(
            "div",
            { className: "auth-content-button", onClick: props.onClick },
            "Sign In"
        )
    );
}

/*
The SignIn component. Renders a div containing a form for signing in.

Handles signing in logic. When a sign in is successfull, calls props.signIn()
to change to the HomePage component.
*/

var SignIn = function (_React$Component) {
    _inherits(SignIn, _React$Component);

    function SignIn(props) {
        _classCallCheck(this, SignIn);

        var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

        _this.state = {
            username: "",
            password: "",
            message: ""
        };
        return _this;
    }

    _createClass(SignIn, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "auth-box-main" },
                React.createElement(SignInUsername, { onChange: function onChange(event) {
                        return _this2.changeUsername(event);
                    } }),
                React.createElement(SignInPassword, { onChange: function onChange(event) {
                        return _this2.changePassword(event);
                    } }),
                React.createElement(SignInMessage, { message: this.state.message }),
                React.createElement(SignInButton, { onClick: function onClick() {
                        return _this2.signIn();
                    } })
            );
        }
        /*
        Updates this.state.username
        */

    }, {
        key: "changeUsername",
        value: function changeUsername(event) {
            this.setState({
                username: event.target.value
            });
        }
        /*
        Updates this.state.password
        */

    }, {
        key: "changePassword",
        value: function changePassword(event) {
            this.setState({
                password: event.target.value
            });
        }

        /*
        Tries to start a session with the given credentials. On failure,
        displays a message. On success, calls props.signIn() to switch to
        the home page.
        */

    }, {
        key: "signIn",
        value: function signIn() {
            var _this3 = this;

            var username = this.state.username;
            var password = this.state.password;
            var credentials = new URLSearchParams();
            credentials.append("username", username);
            credentials.append("password", password);
            fetch("StartSession", {
                method: "POST",
                body: credentials
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (!result.error) {
                    if (result.hasSession) {
                        _this3.props.signIn();
                    } else {
                        _this3.invalidCredentials();
                    }
                } else {
                    _this3.errorMessage();
                }
            }).catch(function (reason) {
                _this3.errorMessage();
            });
        }
        /*
        Displays a message.
        */

    }, {
        key: "invalidCredentials",
        value: function invalidCredentials() {
            this.setState({
                message: "Invalid username and password."
            });
        }
        /*
        Displays a message.
        */

    }, {
        key: "errorMessage",
        value: function errorMessage() {
            this.setState({
                message: "There was an error signing in."
            });
        }
    }]);

    return SignIn;
}(React.Component);

export { SignIn };