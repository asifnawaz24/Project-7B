import React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import Timer from './Timer';

describe('Timer', () => {
    let container: ShallowWrapper<{}, {}, any>;

    beforeEach(() => {
        container = shallow(<Timer />);
    });

    it('should render a <div />', () => {
        expect(container.find("div").length).toBeGreaterThanOrEqual(1)
    });

    it('should render an instance of TimerButton component', () => {
        expect(container.find("TimerButton").length).toEqual(2);
    })
});

describe('mounted Timer', () => {
    let container: ReactWrapper<{}, {}, any>;
    
    beforeEach(() => {
        container = mount(<Timer />);
    });
    
    it('invokes the startTimer when the start button is clicked', () => {
        const spy = jest.spyOn(container.instance(), 'startTimer');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        container.find('.start-timer').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('invokes the stopTimer when the stop button is clicked after start ', () => {
        const spy = jest.spyOn(container.instance(), 'stopTimer');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        container.find('.start-timer').first().simulate('click');
        container.find('.stop-timer').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('invokes the resetTimer when the reset button is clicked', () => {
        // console.log(container.debug());
        // console.log(container.instance());
        const spy = jest.spyOn(container.instance(), 'resetTimer');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        container.find('.reset-timer').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('invokes the setTimer when the timer display is clicked', () => {
        // console.log(container.debug());
        // console.log(container.instance());
        const spy = jest.spyOn(container.instance(), 'setTimer');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        container.find('.change-timer').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('should change isOn state to True when start button is clicked', () => {
        container.instance().forceUpdate();
        container.find('.start-timer').first().simulate('click');
        expect(container.instance().state.isOn).toEqual(true);
    });
    
    it('should change isOn state to False when stop button is clicked', () => {
        container.instance().forceUpdate();
        container.find('.start-timer').first().simulate('click');
        container.find('.stop-timer').first().simulate('click');
        expect(container.instance().state.isOn).toEqual(false);
    })
    
    it('should change isOn state to false when reset Button is clicked', () => {
        container.instance().forceUpdate();
        container.find('.reset-timer').first().simulate('click');
        expect(container.instance().state.isOn).toEqual(false);
        expect(container.instance().state.seconds).toEqual(0);
        expect(container.instance().state.minutes).toEqual(5);
        expect(container.instance().state.milliseconds).toEqual(0);
    })
    
});

describe('mounted Timer settings', () => {
    let container: ReactWrapper<{}, {}, any>;
    
    beforeEach(() => {
        container = mount(<Timer />);
        container.instance().forceUpdate();
        container.find('.change-timer').first().simulate('click');
    });
    
    it('should render an instance of TimerButton and TimerForm when component ', () => {
        expect(container.instance().state.isSet).toEqual(false);
        expect(container.find("TimerForm").length).toEqual(2);
        expect(container.find("TimerButton").length).toEqual(2);
    });

    it('should call setDefaultValue when timer-input-minute is changed', () => {
        const spy = jest.spyOn(container.instance(), 'setDefaultValue');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        // console.log(container.find({ name: 'timer-input-minute' }).debug());
        container.find({ name: 'timer-input-minute' }).first().simulate('change', { target: { value: 5 } });
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('should call setDefaultValue when timer-input-second is changed', () => {
        const spy = jest.spyOn(container.instance(), 'setDefaultValue');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        // console.log(container.find({ name: 'timer-input-second' }).debug());
        container.find({ name: 'timer-input-second' }).first().simulate('change', { target: { value: 5 } });
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('should change DefaultValue.minute when timer-input-minute is changed', () => {
        expect(container.instance().state.defaultState.minutes).toEqual(5)
        container.find({ name: 'timer-input-minute' }).first().simulate('change', { target: { value: 6 } });
        expect(container.instance().state.defaultState.minutes).toEqual(6)
        
    });
    
    it('should change DefaultValue.minute when timer-input-minute is changed and should not go greater than 99', () => {
        expect(container.instance().state.defaultState.minutes).toEqual(5);
        container.find({ name: 'timer-input-minute' }).first().simulate('change', { target: { value: 100 } });
        expect(container.instance().state.defaultState.minutes).toEqual(99);
    });

    it('should change DefaultValue.minute when timer-input-minute is changed and should not go less than 0', () => {
        expect(container.instance().state.defaultState.minutes).toEqual(5);
        container.find({ name: 'timer-input-minute' }).first().simulate('change', { target: { value: -1 } });
        expect(container.instance().state.defaultState.minutes).toEqual(0);
    });

    it('should change DefaultValue.second when timer-input-second is changed', () => {
        expect(container.instance().state.defaultState.seconds).toEqual(0)
        container.find({ name: 'timer-input-second' }).first().simulate('change', { target: { value: 1 } });
        expect(container.instance().state.defaultState.seconds).toEqual(1)

    });

    it('should change DefaultValue.second when timer-input-second is changed and should not go greater than 59', () => {
        expect(container.instance().state.defaultState.seconds).toEqual(0)
        container.find({ name: 'timer-input-second' }).first().simulate('change', { target: { value: 60 } });
        expect(container.instance().state.defaultState.seconds).toEqual(59);
    });

    it('should change DefaultValue.second when timer-input-second is changed and should not go less than 0', () => {
        expect(container.instance().state.defaultState.seconds).toEqual(0)
        container.find({ name: 'timer-input-second' }).first().simulate('change', { target: { value: -1 } });
        expect(container.instance().state.defaultState.seconds).toEqual(0);
    });
    
    it('should change defaultValue and keep it after set is clicked', () => {
        expect(container.instance().state.defaultState.minutes).toEqual(5)
        expect(container.instance().state.defaultState.seconds).toEqual(0)
        expect(container.instance().state.defaultState.milliseconds).toEqual(0)
        container.find({ name: 'timer-input-minute' }).first().simulate('change', { target: { value: 1 } });
        container.find({ name: 'timer-input-second' }).first().simulate('change', { target: { value: 0 } });
        container.find('.set-timer').first().simulate('click');
        expect(container.instance().state.defaultState.minutes).toEqual(1)
        expect(container.instance().state.defaultState.seconds).toEqual(0)
        expect(container.instance().state.defaultState.milliseconds).toEqual(0)
    });
    
    it('should change defaultValue and discard it after cancel is clicked', () => {
        expect(container.instance().state.previousState.minutes).toEqual(5)
        expect(container.instance().state.previousState.seconds).toEqual(0)
        expect(container.instance().state.previousState.milliseconds).toEqual(0)
        container.find({ name: 'timer-input-minute' }).first().simulate('change', { target: { value: 1 } });
        container.find({ name: 'timer-input-second' }).first().simulate('change', { target: { value: 0 } });
        container.find('.set-timer').first().simulate('click');
        expect(container.instance().state.previousState.minutes).toEqual(container.instance().state.defaultState.minutes)
        expect(container.instance().state.previousState.seconds).toEqual(container.instance().state.defaultState.seconds)
        expect(container.instance().state.previousState.milliseconds).toEqual(container.instance().state.defaultState.milliseconds)
    });

});

describe('mounted Timer ring', () => {
    let container: ReactWrapper<{}, {}, any>;
    
    beforeEach(() => {
        container = mount(<Timer />);
        container.instance().setState({ minutes: 0, seconds: 1, milliseconds: 0 });
        container.debug();
        container.find('.start-timer').first().simulate('click');
        container.instance().forceUpdate();
        setTimeout(() => {
            expect(container.instance().state.minutes).toEqual(0);
            expect(container.instance().state.seconds).toEqual(0);
            expect(container.instance().state.milliseconds).toEqual(0);
        }, 1100);
    });

    

    it('timer display should have alert class when timer hits 0', () => {
        setTimeout(() => {
            expect(container.find('.timer-display').hasClass('timer-alert-display')).toEqual(true);
        }, 1100);
    });

    it('should render 1 TimerButton when time is up', () => {
        setTimeout(() => {
            expect(container.find("TimerButton").length).toEqual(1);
        }, 1100);
    });

    it('should isRinging to true when time is up', () => {
        setTimeout(() => {
            expect(container.instance().state.isRinging).toEqual(true);
        }, 1100);
    });

    it('should isRinging to true when time is up and back to false when stopTimer is pressed', () => {
        setTimeout(() => {
            expect(container.instance().state.isRinging).toEqual(true);
            container.find('.stop-timer').simulate('click');
            expect(container.instance().state.isRinging).toEqual(false);
        }, 1100);
    });

});