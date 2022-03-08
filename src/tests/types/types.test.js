import { types } from "../../types/types";

describe('Pruebas en types', () => {
    test('Los types deben ser iguales', () => {
        expect(types).toEqual({

            uiOpenModal:'[ui] Open Modal',
            uiCloseModal:'[ui] Close modal',
            eventLogout:'[event] Logout event',
            eventStartAddNew:'[event] Start add new',
            eventAddNew:'[event] Add new',
            eventSetActive:'[event] Set Active',
            eventClearActiveEvent:'[event] Clear active event',
            eventUpdated:'[event] Event updated',
            eventDeleted:'[event] Event deleted',
            eventLoaded: '[event] Events loaded',
        
            
            authCheckingFinish:'[auth] finish checking login state',
            authStartLogin:'[auth] start login',
            authLogin:'[auth] Login',
            authStartRegister:'[auth] Start Register',
            authStartStartTokenRenew:'[auth] Start token renew',
            authLogout:'[auth] Logout'
        })
    });
});