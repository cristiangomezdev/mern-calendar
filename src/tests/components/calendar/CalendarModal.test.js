import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen'
    ;
import moment from 'moment';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent,eventStartAddNew } from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew:jest.fn()

}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
    
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'hola mundo',
            notes: 'algunas notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '1234',
        name: 'Fernando'
    },
    ui: {
        modalOpen: true
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={store} >
        <CalendarModal />
    </Provider>
)


describe('CalendarModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('debe de mostrar el modal', () => {

        expect(wrapper.find('Modal').prop('isOpen')).toBe(true)

    });
    test('Debe llamar la funcion de actualizar y cerrar modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        })
        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent)
        expect(eventClearActiveEvent).toHaveBeenCalled()
    });
    test('debe de mostrar error si falta el titulo', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        })
        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);

    });
    test('debe de crear un nuevo evento', () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '1234',
                name: 'Fernando'
            },
            ui: {
                modalOpen: true
            }
        };
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        
        const wrapper = mount(
            <Provider store={store} >
                <CalendarModal />
            </Provider>
        )
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'hola pruebas'
            }
        })
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        expect(eventStartAddNew).toHaveBeenCalledWith({
            end:expect.anything(),
            start:expect.anything(),
            title:'hola pruebas',
            notes:''
        })

    });
    test('Debe de validar las fechas', () => {
            
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'hola pruebas'
            }
        })
        const hoy = new Date();
        act(()=>{
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        })
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha fin debe de ser mayor a la fecha de inicio", "error")

    });
});