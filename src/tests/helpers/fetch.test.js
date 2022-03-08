import { fetchSinToken,fetchConToken } from "../../helpers/fetch";

describe('Pruebas en fetch', () => {
    let token = '';
    test('fetchSintoken debe de funcionar ', async() => {
        const resp = await fetchSinToken('auth',{email:'gomez1@gmail.com',password:'123456'},'POST');

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);
        token=body.token;
    });
    test('fetchContoken debe de funcionar ', async() => {
        localStorage.setItem('token',token);
        const resp = await fetchConToken('events/61edb3c544ef4f9dfed93c3d',{},'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Evento no existe por ese Id');

    });
});