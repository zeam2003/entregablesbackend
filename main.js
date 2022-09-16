const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./productos.controller');
const handlebars = require('express-handlebars');
const localDB = new db();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// views
app.set('views', './views');

// engine HBS
/* const hbs = handlebars.engine({
    extname: 'hbs',
    layoutsDir: './views/layouts/'
});

app.engine('hbs', hbs); 
app.set('view engine', 'hbs');

// endpoints
app.get('/registro', (req, res) => {
    res.render('main', {layout: 'registro'});
});

app.get('/listado', async(req, res) => {
    let productos = await localDB.getAll();
    res.render('main', {layout: 'productos', productos});
    
});

*/

// engine PUB
app.set('view engine', 'pug');

// endpoints
app.get('/registro', (req, res) => {
    res.render('addform');
});

app.get('/listado', async(req, res) => {
    let productos = await localDB.getAll();
    console.log(productos);
    res.render('listform', {productos: productos});
    
});


// querys
app.post('/api/productos', async (req, res) => {
    console.log(req.body);
    //let recibido = req.body;

    let recibido = {title, price, thumbail} = req.body;
    creado = await localDB.save(recibido);
    //res.send({"producto": {title, price, thumbail}});
    
    res.redirect('/registro');
    //res.send(creado);
});


app.get('/api/productos', async (req,res) => {
    const data = await localDB.getAll();
    res.send(data);
});


app.listen(8080, () => {
    console.log("Servidor Activo");
  });