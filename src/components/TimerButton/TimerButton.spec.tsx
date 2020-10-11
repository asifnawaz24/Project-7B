import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TimerButton from './TimerButton';

describe('TimerButton', () => {
    let container: ShallowWrapper<{}, {}, any>;

    beforeEach(() => {
        container = shallow(<TimerButton buttonAction={jest.fn()} buttonValue={""}/>);
    })

    it('should render a TimerButton component', () => {
        expect(container.find("div").length).toBeGreaterThanOrEqual(1);
    })
})