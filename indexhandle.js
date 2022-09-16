const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productosRouter = require('./productos');
const controlador = require('./productos.controller');

const handlebars = require('express-handlebars');
const localDB = new controlador();
// views
//app.use('views', './views/');

// view engine
app.set('view engine', 'hbs');
const hbs = handlebars.engine({
    extname: 'hbs',
    layoutsDir: './views/layouts/'
});

app.engine('hbs', hbs);

// frontend
app.get('/registro', (req, res) => {
    res.render('main', {layout: 'registro'});
});

app.get('/listado', (req, res) => {
    const data = localDB.getAll();
    console.log(data);
    res.render('main', {layout: 'productos'});
    //res.render('main', {layout: 'productos', data});
});



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/productos', productosRouter);

app.use(express.static(__dirname + '/public'));


app.listen(8080, () => { console.log('Servidor Activo'); });