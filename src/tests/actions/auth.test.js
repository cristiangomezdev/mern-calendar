import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin, startRegister,startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2',()=>({
    fire:jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn();
let token='';
describe('Pruebas en auth', () => {
    beforeEach(()=>{
        store = mockStore(initState)
        jest.clearAllMocks
    })
    test('startLogin', async() => {
        await store.dispatch(startLogin('gomez1@gmail.com','123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:expect.any(String),
                name:expect.any(String)
            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token',expect.any(String))
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number))
        token = localStorage.setItem.mock.calls[0][1]
    });
    test('startLogin Incorrecto', async() => {
        await store.dispatch(startLogin('gomez@gmail.com','123456'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error','El usuario no existe con esas credenciales','error');

        await store.dispatch(startLogin('gomez1@gmail.com','123456789'));
        actions = store.getActions();
        expect(Swal.fire).toHaveBeenCalledWith('Error','Password incorrecto','error');
    });
    test('startRegister correcto', async() => {
        fetchModule.fetchSinToken = jest.fn(()=>({
            json(){
                return{
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'ABC12341234'
                }
            }
        }))
        await store.dispatch(startRegister('test@test.com','123456','test'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'carlos'
            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token','ABC12341234')
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number))
        
    });
    test('StartChecking', async() => {
        fetchModule.fetchConToken = jest.fn(()=>({
            json(){
                return{
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'ABC123ABC123'
                }
            }
        }))
        await store.dispatch(startChecking());

        const actions = store.getActions();
        console.log(actions)
        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{

                uid:'123',
                name:'carlos'
               
            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token','ABC12341234')

    });
});