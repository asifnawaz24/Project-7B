import React, { ChangeEvent } from 'react';
import './TimerForm.css';

interface Props {
    defaultValue: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name?: string;
    max: number;
    min: number;
}

const TimerForm = (props: Props) => {
    return (
        <input type='number' size={2} max={props.max} min={props.min} className={props.className} value={props.defaultValue} onChange={props.onChange}/>
    )
}

export default TimerForm
