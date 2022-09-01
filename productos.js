const fs = require('fs');
const nombreArchivo ='./data.productos.js';

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    // Guardamos el producto
    async save(producto) {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const productos = JSON.parse(data);
            const id = productos.length + 1;
            producto.id = id;
            productos.push(producto);
            const productoExport = JSON.stringify(productos);
            await fs.promises.writeFile(this.nombreArchivo, productoExport);
            return id;
        } catch (error) {
            console.error('se presentó el siguiente inconveniente al intentar guardar: ', error);
        }
       
    }

    // Obtenemos un producto por ID
    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const productos = JSON.parse(data);
            const producto = productos.find((producto) => producto.id == id);
            if(producto) {
                return producto;
            } else {
                return "Producto no encontrado";
            } 
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }

    // Obtenemos todos los productos
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const productos = JSON.parse(data);
            if(productos.length === 0 ) {
                return `No hay productos aún`;
            } else {
                return productos;
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }

    // Borramos por ID
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            let productos = JSON.parse(data);
            const producto = productos.find((producto) => producto.id == id);
            if(producto){
                productos = productos.filter( producto => producto.id !== id);
                const productDelete = JSON.stringify(productos);
                await fs.promises.writeFile(this.nombreArchivo, productDelete);
                return 'Se ha eliminado el producto';
            } else {
                return 'Ese producto no se encuentra registrado';
            }
            
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }

    // Borramos todo
    async deleteAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            let productos = JSON.parse(data);
            if(productos.length == 0) {
                return `No hay productos para eliminar`;
            } else {
                productos = [];
                const productDelete = JSON.stringify(productos);
                await fs.promises.writeFile(this.nombreArchivo, productDelete);
                return 'Se han eliminado los productos';
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }

}

async function inicio() {
    const contenido = new Contenedor('.data/productos.json');
}

module.exports = Contenedor;
