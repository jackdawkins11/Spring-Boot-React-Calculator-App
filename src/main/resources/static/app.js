var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { AuthPage } from './AuthPage.js';
import { HomePage } from './HomePage.js';

/*
The root of all components. Checks for a session
with the server and then renders either the
sign in page or the home page.
*/

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            hasSession: false
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.checkSession();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.state.hasSession) {
                return React.createElement(HomePage, { signOut: function signOut() {
                        return _this2.signOut();
                    } });
            } else {
                return React.createElement(AuthPage, {
                    signIn: function signIn() {
                        _this2.checkSession();
                    }
                });
            }
        }
    }, {
        key: 'checkSession',
        value: function checkSession() {
            var _this3 = this;

            fetch("CheckSession", { method: "POST" }).then(function (response) {
                return response.json();
            }).then(function (result) {
                _this3.setState({
                    hasSession: result.hasSession
                });
            }).catch(function (reason) {
                _this3.errorMessage("There was an error checking for a session: " + reason);
            });
        }
    }, {
        key: 'signOut',
        value: function signOut() {
            var _this4 = this;

            fetch("EndSession", { method: "POST" }).then(function (response) {
                _this4.checkSession();
            }).catch(function (reason) {
                _this4.errorMessage("There was an error signing out: " + reason);
            });
        }
    }, {
        key: 'errorMessage',
        value: function errorMessage(message) {
            console.log(message);
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));