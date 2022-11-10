import { Calculator } from './Calculator.js';
import { MessageBox } from './MessageBox.js';

/*
Renders the home page.
*/

function HomePage(props) {
    return React.createElement(
        'div',
        { className: 'homepage' },
        React.createElement(
            'div',
            { className: 'homepage-top-bar' },
            React.createElement(
                'div',
                { className: 'sign-out-button', onClick: props.signOut },
                'Sign Out'
            )
        ),
        React.createElement(
            'div',
            { className: 'homepage-main' },
            React.createElement(Calculator, null),
            React.createElement(MessageBox, null)
        )
    );
}

export { HomePage };