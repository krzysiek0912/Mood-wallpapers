import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { isVisible: true };
    }

    handleClose = () => {
        const { closeAction } = this.props;
        this.setState({
            isVisible: false,
        });
        closeAction();
    };

    render() {
        const { isVisible } = this.state;
        const { type, children, closeAction } = this.props;
        return isVisible ? (
            <div className={`notification is-${type}`}>
                {closeAction ? (
                    <button type="button" onClick={this.handleClose} className="delete">
                        {' '}
                    </button>
                ) : null}
                {children}
            </div>
        ) : null;
    }
}
Notification.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    closeAction: PropTypes.func.isRequired,
};

export default Notification;
