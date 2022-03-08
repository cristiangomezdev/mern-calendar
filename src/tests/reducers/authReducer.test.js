import {authReducer} from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
    checking:false
}
describe('Pruebas en authReducer.js', () => {
    test('debe retornar estaod por defecto', () => {
        
        const action = {};
        const state = authReducer(initState,action);

        expect(state).toEqual(initState);
    });
    test('debe de autenticar el usuario', () => {
        const action = {
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'cris'
            }
        }
        const state = authReducer(initState,action);

        expect(state).toEqual({checking:false,uid:'123',name:'cris'})
    });
});