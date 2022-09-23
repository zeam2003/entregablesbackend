// Express - Http y Sockets
const express = require('express');
const {Server: HttpServer, get} = require('http');
const {Server: SocketServer} = require('socket.io');

//Fs
const fs = require('fs');

// Express y Socketsx
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
//const cors = require('cors');

//app.use(cors({ origin: '*'}));

let Mensajes =  [];
let Productos = [];

const bodyParser = require('body-parser');
const productosRouter = require('./productos');
const controlador = require('./productos.controller');

const handlebars = require('express-handlebars');
const localDB = new controlador();
// views
//app.use('views', './views/');
 async function obtener() {
    try {
       const data = await fs.promises.readFile('./data/productos.json', 'utf-8')
       Productos = JSON.parse(data)
       //return console.log(data);
    } catch (error) {
        console.log('error', error);
    }
}

// Web Sockets
io.on('connection', (socket) => {
    obtener();
    //console.log(`conectado: ${socket.id}`);
    socket.emit('productos', Productos);
    socket.emit('mensajes', Mensajes);

    // escucha los mensajes
    socket.on('new_msg', data => {
        //console.log(data);
        Mensajes.push(data);
        io.sockets.emit('mensajes', Mensajes);
    });
});

// view engine
app.set('view engine', 'hbs');
const hbs = handlebars.engine({
    extname: 'hbs',
    layoutsDir: './views/layouts/',
});

app.engine('hbs', hbs);

// frontend
app.get('/registro', (req, res) => {
    res.render('main', {layout: 'registro'});
});

app.get('/listado', (req, res) => {
   // const data = localDB.getAll();
   // console.log(data);
    obtener();
    console.log('esto tengo', Productos.length)
    res.render('main', {layout: 'productos', Productos});
    //res.render('main', {layout: 'productos', data});
});



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/productos', productosRouter);

app.use(express.static(__dirname + '/public'));


httpServer.listen(8080, () => { console.log('Servidor Express + Sockets - Activo'); });