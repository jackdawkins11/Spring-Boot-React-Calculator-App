var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { SignIn } from './SignIn.js';
import { SignUp } from './SignUp.js';

/*
Renders the tab bar on the authorization page.
*/

function TabBar(props) {
    var signInClasses = "tab " + (props.signInTab ? "tab-active" : "tab-inactive");
    var signUpClasses = "tab " + (!props.signInTab ? "tab-active" : "tab-inactive");
    return React.createElement(
        'div',
        { className: 'tab-bar' },
        React.createElement(
            'div',
            { className: signInClasses, onClick: function onClick() {
                    return props.tabClick(true);
                } },
            ' SIGN IN '
        ),
        React.createElement(
            'div',
            { className: signUpClasses, onClick: function onClick() {
                    return props.tabClick(false);
                } },
            ' SIGN UP '
        )
    );
}

/*
Renders the authorization page.
*/

function AuthPageRender(props) {
    return React.createElement(
        'div',
        { className: 'auth-page' },
        React.createElement(
            'div',
            { className: 'auth-box' },
            React.createElement(TabBar, { tabClick: props.tabClick,
                signInTab: props.signInTab }),
            props.innerAuthBox
        )
    );
}

/*
Maintains state and handles logic for the authorization page.
Renders the authorization page using AuthPageRender.
*/

var AuthPage = function (_React$Component) {
    _inherits(AuthPage, _React$Component);

    function AuthPage(props) {
        _classCallCheck(this, AuthPage);

        var _this = _possibleConstructorReturn(this, (AuthPage.__proto__ || Object.getPrototypeOf(AuthPage)).call(this, props));

        _this.state = {
            signInTab: true
        };
        return _this;
    }

    _createClass(AuthPage, [{
        key: 'tabClick',
        value: function tabClick(isSignInTab) {
            this.setState({ signInTab: isSignInTab });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var innerAuthBox = void 0;
            if (this.state.signInTab) {
                innerAuthBox = React.createElement(SignIn, { signIn: this.props.signIn });
            } else {
                innerAuthBox = React.createElement(SignUp, null);
            }
            return React.createElement(AuthPageRender, {
                tabClick: function tabClick(b) {
                    return _this2.tabClick(b);
                },
                signInTab: this.state.signInTab,
                innerAuthBox: innerAuthBox });
        }
    }]);

    return AuthPage;
}(React.Component);

export { AuthPage };