const express = require('express');
const db = require('./productos.js');

const app = express();

const localDB = new db('./data/productos.json');
// console.log(localDB);
app.get('/', (req, res) => {
    res.send({error: false});
});

app.get('/productos', async (req,res) => {

    const data = await localDB.getAll();
    res.send(data);
         
});

app.get('/productRandom', async (req, res) => {
    const data = await localDB.getAll();
    let ran = Math.random()*data.length | 0;
   
    res.send(data[ran]); 
 
});

app.listen(8080, () => { console.log('Servidor Activo'); });