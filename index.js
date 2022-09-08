const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productosRouter = require('./productos');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/productos', productosRouter);

app.use(express.static(__dirname + '/public'));


app.listen(8080, () => { console.log('Servidor Activo'); });