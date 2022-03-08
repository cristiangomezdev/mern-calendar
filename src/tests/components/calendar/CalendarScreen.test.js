import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import {act} from '@testing-library/react'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import {CalendarScreen} from '../../../components/calendar/CalendarScreen'
;
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive,eventStartLoading } from '../../../actions/events';

 jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
})) 
Storage.prototype.setItem = jest.fn();


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar:{
        events:[]
    },
    auth:{
        uid:'1234',
        name:'Fernando'
    },
    ui:{
        modalOpen:false
    }
};
const store = mockStore( initState );
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store } >
        <CalendarScreen />
    </Provider>
)



describe('CalendarScreen', () => {
    test('snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('Interacciones con el calendario', () => {
        const calendar = wrapper.find('Calendar')

        const calendarMessages = calendar.prop('messages');
        
        expect(calendarMessages).toEqual(messages)

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({type:types.uiOpenModal})
        calendar.prop('onSelectEvent')({start:'hola'});
        expect(eventSetActive).toHaveBeenCalledWith({start:'hola'})
    act(()=>{
        calendar.prop('onView')('week');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastView','week')
    })
        
    });
});