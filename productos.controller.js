const fs = require('fs');
const nombreArchivo ='./data.productos.js';
let productosAlmacenados =[];

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.productosAlmacenados = productosAlmacenados;
    }

    // Guardamos el producto
    async save(producto) {
        try {
            const id = productosAlmacenados.length +1;
            producto.id = id;
            const nuevo = productosAlmacenados.push(producto);
            // console.log('en base', productosAlmacenados);
            return producto;
        } catch (error) {
            console.error('se presentó el siguiente inconveniente al intentar guardar: ', error);
        }
       
    }

    // Obtenemos un producto por ID
    async getById(id) {
        try {
            const producto = productosAlmacenados.find((producto) => producto.id == id);
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
            if(productosAlmacenados.length === 0 ) {
                return `No hay productos aún`;
            } else {
                return productosAlmacenados;
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
    }

    // Actualizar por ID
    async updateById(id, cuerpo){
        try {
            // console.log(cuerpo);
            let producto = productosAlmacenados.find((producto) => producto.id == id);
            if(producto) {
                
                productosAlmacenados = productosAlmacenados.map( brand => {
                    if ( brand.id == id ) {

                        producto =  { id: producto.id, ...cuerpo};
                        console.log('traigo', producto);
                        return producto;
                    }
                    console.log('este', brand);

                    return brand;
                });
                return producto;
            } else {
                return 'no hay nada';
            }
            
           
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
    }

    // Borramos por ID
    async deleteById(id) {
        try {
            let producto = await productosAlmacenados.find((producto) => producto.id == id);
            if(producto) {
                productosAlmacenados =  productosAlmacenados.filter( producto => producto.id != id);
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
