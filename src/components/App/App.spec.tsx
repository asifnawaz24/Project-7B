import React, { Component } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';
import Timer from '../Timer/Timer';

describe('App', () => {
    let container: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

    beforeEach(() => {
        container = shallow(<App />);        
    })

    it('Should render a <div/>', () => {
        expect(container.find('div').length).toEqual(1);
    })

    it('Should render a Timer component', () => {
        expect(container.containsMatchingElement(<Timer />)).toEqual(true);
    })
})