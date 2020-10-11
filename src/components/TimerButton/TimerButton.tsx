import React from 'react';
import PropTypes from 'prop-types';
import './TimerButton.css';

interface Props {
    className?: string;
    buttonAction: () => void;
    buttonValue: string;
}

const TimerButton = (props: Props) => {
    return (
        <div className={`button-container ${props.className}`} onClick={() => props.buttonAction()}>
            {props.buttonValue}
        </div>
    )
}

TimerButton.propTypes = {
    buttonAction: PropTypes.func.isRequired,
    buttonValue: PropTypes.string.isRequired,
};

export default TimerButton
