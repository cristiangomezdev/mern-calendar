const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();


//crear servidor express
const app = express();

dbConnection();

//CORS
app.use(cors())
//directorio publico
app.use(express.static('public'));

//lectura parseo del body
app.use(express.json())
//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//Todo:auth // crear,login,renw
//Todo crud:eventos

/* app.get('/',(req,res)=>{

    res.json({
        ok:true
    })
}) */

//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto: ${process.env.PORT}`)
})