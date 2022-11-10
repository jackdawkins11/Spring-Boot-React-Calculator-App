'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function SignUpUsername(props) {
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

function SignUpPassword(props) {
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

function SignUpPasswordConfirm(props) {
    return React.createElement(
        "div",
        { className: "auth-content" },
        React.createElement(
            "div",
            { className: "auth-content-label" },
            "Confirm Password"
        ),
        React.createElement("input", { type: "password", className: "auth-content-input", onChange: props.onChange })
    );
}

function SignUpMessage(props) {
    var classNames = "auth-content-message " + props.classNames;
    return React.createElement(
        "div",
        { className: "auth-content" },
        React.createElement(
            "div",
            { className: classNames },
            props.message
        )
    );
}

function SignUpButton(props) {
    return React.createElement(
        "div",
        { className: "auth-content" },
        React.createElement(
            "div",
            { className: "auth-content-button", onClick: props.onClick },
            "Sign Up"
        )
    );
}

/*
SignUp component. Renders a form for signing up. Handles logic for signing up.
Displays a message when signing up fails or succeeds.
*/

var SignUp = function (_React$Component) {
    _inherits(SignUp, _React$Component);

    function SignUp(props) {
        _classCallCheck(this, SignUp);

        var _this = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this, props));

        _this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            message: "",
            messageClassNames: ""
        };
        return _this;
    }

    _createClass(SignUp, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var passwordStengthMessage = "*Passwords must be at least 10 characters long" + " and contain at least 1 uppercase letter, lowercase letter, number and symbol from" + " !@#$%^&*()";
            return React.createElement(
                "div",
                { className: "sign-up" },
                React.createElement(SignUpUsername, { onChange: function onChange(event) {
                        return _this2.changeUsername(event);
                    } }),
                React.createElement(SignUpPassword, { onChange: function onChange(event) {
                        return _this2.changePassword(event);
                    } }),
                React.createElement(SignUpPasswordConfirm, { onChange: function onChange(event) {
                        return _this2.changeConfirmPassword(event);
                    } }),
                React.createElement(SignUpMessage, { message: this.state.message,
                    classNames: this.state.messageClassNames }),
                React.createElement(SignUpButton, { onClick: function onClick() {
                        return _this2.signUp();
                    } }),
                React.createElement(SignUpMessage, { message: passwordStengthMessage,
                    classNames: "password-strength-message" })
            );
        }
    }, {
        key: "changeUsername",
        value: function changeUsername(event) {
            this.setState({
                username: event.target.value
            });
        }
    }, {
        key: "changePassword",
        value: function changePassword(event) {
            this.setState({
                password: event.target.value
            });
        }
    }, {
        key: "changeConfirmPassword",
        value: function changeConfirmPassword(event) {
            this.setState({
                confirmPassword: event.target.value
            });
        }
        /*
        Tries to create an account with the given credentials.
        */

    }, {
        key: "signUp",
        value: function signUp() {
            var username = this.state.username,
                password = this.state.password,
                confirmPassword = this.state.confirmPassword;
            if (username === "" || password === "") {
                this.invalidInput("All fields must be used");
            } else if (password !== confirmPassword) {
                this.invalidInput("Passwords must match");
            } else {
                this.signUpRequest(username, password);
            }
        }
        /*
        Requests the server to make an account with the given credentials.
        Displays a message on failure or success.
        */

    }, {
        key: "signUpRequest",
        value: function signUpRequest(username, password) {
            var _this3 = this;

            var credentials = new URLSearchParams();
            credentials.append("username", username);
            credentials.append("password", password);
            fetch("CreateAccount", {
                method: "POST",
                body: credentials
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (!result.error && result.createdAccount) {
                    _this3.success();
                } else if (!result.error && !result.createdAccount) {
                    _this3.invalidInput(result.message);
                } else {
                    _this3.error();
                }
            }).catch(function (reason) {
                _this3.error();
            });
        }
    }, {
        key: "success",
        value: function success() {
            this.setState({
                message: "Successfully created account",
                messageClassNames: "message-green"
            });
        }
    }, {
        key: "invalidInput",
        value: function invalidInput(message) {
            this.setState({
                message: message,
                messageClassNames: "message-red"
            });
        }
    }, {
        key: "error",
        value: function error() {
            this.setState({
                message: "There was an error signing up",
                messageClassNames: "message-red"
            });
        }
    }]);

    return SignUp;
}(React.Component);

export { SignUp };