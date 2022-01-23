const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const {isDateVal} = require('../helpers/isDateVal');
//todas tienen que pasar por validacion de jwt
//obtener eventos
router.use(validarJWT);

router.get('/', validarJWT, getEventos)

//crear un nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDateVal),
        check('end','Fecha de finalizacion es obligatoria').custom(isDateVal),
        validarCampos
    ],
    crearEvento);

//actualizar evento
router.put('/:id', validarJWT, actualizarEvento)

//borrar evento
router.delete('/:id', validarJWT, eliminarEvento)

module.exports = router;