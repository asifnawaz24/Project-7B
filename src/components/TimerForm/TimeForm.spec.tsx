import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TimerForm from './TimerForm';

describe('TimerButton', () => {
    let container: ShallowWrapper<{}, {}, any>;

    beforeEach(() => {
        container = shallow(<TimerForm defaultValue={0} onChange={jest.fn()} />);
    })

    it('should render a TimerForm component', () => {
        expect(container.find("input").length).toBeGreaterThanOrEqual(1);
    })
})