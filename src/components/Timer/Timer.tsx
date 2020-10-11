import React, { Component } from 'react'
import TimerButton from '../TimerButton/TimerButton';
import './Timer.css';
import TimerForm from '../TimerForm/TimerForm';

interface Props {

}
interface State {
    minutes: number;
    seconds: number;
    milliseconds: number;
    defaultState: {
        minutes: number,
        seconds: number,
        milliseconds: number
    },
    previousState: {
        minutes: number,
        seconds: number,
        milliseconds: number
    }
    isOn: boolean;
    isSet: boolean;
    isRinging: boolean;
}

class Timer extends Component<Props, State> {
    myInterval: number = 0;
    audio = new Audio(require("./alarm_beeps.mp3"));
    /**
     *
     */
    constructor(props: Props) {
        super(props);
        this.state = {
            minutes: 5,
            seconds: 0,
            milliseconds: 0,
            defaultState: {
                minutes: 5,
                seconds: 0,
                milliseconds: 0
            },
            previousState: {
                minutes: 5,
                seconds: 0,
                milliseconds: 0
            },
            isOn: false,
            isSet: true,
            isRinging: false
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.setDefaultValue = this.setDefaultValue.bind(this);
        this.setRinging = this.setRinging.bind(this);
    }

    startTimer = () => {
        // console.log('Starting timer.');
        if (this.state.isOn === true)
            return;
        
        this.myInterval = window.setInterval(() => {
            const { seconds, minutes, milliseconds } = this.state;

            if (milliseconds > 0)
                this.setState(({milliseconds}) => ({
                    milliseconds: milliseconds - 1
                }))
            
            if (milliseconds === 0) {
                if (seconds > 0)
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1,
                        milliseconds: 99
                    }));
                
                if (seconds === 0) {
                    if (minutes === 0) {
                        this.setRinging(true);
                        clearInterval(this.myInterval);
                    } else {
                        this.setState(({minutes}) => ({
                            minutes: minutes - 1,
                            seconds: 59,
                            milliseconds: 99
                        }))
                    }
                }
            }
            
        }, 10);
        this.setState({isOn: true})
    }
    
    stopTimer = () => {
        // console.log('Stopping timer.');
        clearInterval(this.myInterval)
        this.setRinging(false);
        this.setState({ isOn: false });
    }

    resetTimer = () => {
        // console.log('Resetting timer.');
        this.stopTimer();
        this.setState({
            minutes: this.state.defaultState.minutes,
            seconds: this.state.defaultState.seconds,
            milliseconds: this.state.defaultState.milliseconds,
})
    }

    setTimer = (set: boolean, changeSetting: boolean) => {
        if (set) {
            if (changeSetting) {
                this.setState({
                    isSet: set,
                    minutes: this.state.defaultState.minutes,
                    seconds: this.state.defaultState.seconds,
                    milliseconds: this.state.defaultState.milliseconds,
                    previousState: this.state.defaultState
                })
            } else {
                this.setState({
                    isSet: set,
                    defaultState: this.state.previousState
                })
            }
        } else {
            this.stopTimer();
            this.setState({
                isSet: set,
                previousState: this.state.defaultState
            })
        }
    }

    setDefaultValue = (time: number, hand: 'minute' | 'second' | 'millisecond') => {
        if (hand === 'minute') {
            if (time > 99)
                time = 99
            else if (time < 0)
                time = 0;
            
            this.setState({
                defaultState: {
                    minutes: time,
                    seconds: this.state.defaultState.seconds,
                    milliseconds: this.state.defaultState.milliseconds
                }
            })
        } else if (hand === "second") {
            if (time > 59)
                time = 59;
            else if (time < 0)
                time = 0;

            this.setState({
                defaultState: {
                    minutes: this.state.defaultState.minutes,
                    seconds: time,
                    milliseconds: this.state.defaultState.milliseconds
                }
            })
        } else if (hand === "millisecond") {
            if (time > 99)
                time = 99
            else if (time < 0)
                time = 0;

            this.setState({
                defaultState: {
                    minutes: this.state.defaultState.minutes,
                    seconds: this.state.defaultState.seconds,
                    milliseconds: time
                }
            })
        }
        // console.log(time)
    }

    setRinging = async (value: boolean) => {
        if (value) {
            // this.audio.crossOrigin = 'anonymous';
            this.audio.play();
        } else {
            // this.audio.crossOrigin = 'anonymous';
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        this.setState({
            isRinging: value
        })
    }

    render = () => {
        const { minutes, seconds, milliseconds } = this.state;

        if (this.state.isSet) {
            return (
                <div className='timer-container'>
                    <div className={`timer-display ${this.state.isRinging? 'timer-alert-display' :null }`}>
                        <span className='change-timer' onClick={() => this.setTimer(false, false)}>
                        <span className='timer-minute-display'>{minutes}</span>:<span className='timer-second-display' >{seconds < 10 ? `0${seconds}` : seconds}</span>.<span className='timer-millisecond-display'>{milliseconds < 10 ? `0${milliseconds}` : milliseconds}</span>
                        </span>
                    </div>
                    <div className='timer-button-container'>
                        {this.state.isRinging ? <TimerButton className='stop-timer' buttonAction={this.resetTimer} buttonValue={'Stop'} /> : (this.state.isOn ? <TimerButton className='stop-timer' buttonAction={this.stopTimer} buttonValue={'Stop'} /> : <TimerButton className='start-timer' buttonAction={this.startTimer} buttonValue={'Start'} /> ) }
                        
                        { this.state.isRinging ? null : <TimerButton className='reset-timer' buttonAction={this.resetTimer} buttonValue={'Reset'}/> }
                        
                    </div>
                </div>
            )            
        } else {
            return (
                <div className='timer-container'>
                <div className='timer-display-2'>
                        <TimerForm name='timer-input-minute' defaultValue={this.state.defaultState.minutes} max={99} min={1} onChange={(e) => this.setDefaultValue(+e.target.value, "minute")} />:<TimerForm name='timer-input-second' defaultValue={this.state.defaultState.seconds} max={59} min={0} onChange={(e) => this.setDefaultValue(+e.target.value, "second")} />.00
                </div>
                <div className='timer-button-container'>
                <TimerButton className='set-timer' buttonAction={() => this.setTimer(true, true)} buttonValue={'Set'}/>
                <TimerButton className='cancel-timer' buttonAction={() => this.setTimer(true, false)} buttonValue={'Cancel'}/>
            </div>
                </div>
            );
        }
    }
}

export default Timer


// import React from 'react';
// import TimerButton from '../TimerButton/TimerButton'
// import './Timer.css';

// interface Props {
//     // minutes: number;
//     // seconds: number;
//     // isOn: boolean;
// }

// const Timer = (props: Props) => {
//     // const [minutes, setMinutes] = useState(25);
//     // const [seconds, setSeconds] = useState(0);
//     // const [isOn, setIsOn] = useState(false);

//     const startTimer = () => {
//         console.log('Start Timer');
//     }
    
//     const stopTimer = () => {
//         console.log('Stop Timer');
//     }
    
//     const resetTimer = () => {
//         console.log('Reset Timer');
//     }
    

//     return (
//         <div className='timer-container'>
//             <div className='timer-display'></div>
//             <div className='timer-button-container'>
//                 <TimerButton className='start-timer' buttonAction={startTimer} buttonValue={'Start'}/>
//                 <TimerButton className='stop-timer' buttonAction={stopTimer} buttonValue={'Stop'}/>
//                 <TimerButton className='reset-timer' buttonAction={resetTimer} buttonValue={'Reset'}/>
//             </div>
//         </div>
//     )
// }

// export default Timer;
