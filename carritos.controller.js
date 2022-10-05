const fs = require('fs');
const nombreArchivo ='./data/carritos.json';
let carritosAlmacenados =[];

class Carrito{
    constructor() {

    }

    async obtener() {
        try {
           const data = await fs.promises.readFile(nombreArchivo, 'utf-8');
           carritosAlmacenados = JSON.parse(data);
        } catch (error) {
            console.log('error', error);
        }
    }

    // Guardamos el producto
    async save(carrito) {
        try {
            const id = carritosAlmacenados.length +1;
            carrito.id = id;
            carrito.timestamp = new Date();
            const nuevo = carritosAlmacenados.push(carrito);
            // console.log('en base', productosAlmacenados);
            return carrito;
        } catch (error) {
            console.error('se presentó el siguiente inconveniente al intentar guardar: ', error);
        }
       
    }

    // Obtenemos un producto por ID
    async getById(id) {
        
        try {
            const carrito = carritosAlmacenados.find((carrito) => carrito.id == id);
            if(carrito) {
                return carrito.productos;
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
            if(carritosAlmacenados.length === 0 ) {
                return carritosAlmacenados;
            } else {
                return carritosAlmacenados;
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
    }

    // Busqueda general
    async search(criteria) {
       console.log(criteria);
    }

    // Actualizar por ID
    async updateById(id, cuerpo){
        
        try {
            // console.log(cuerpo);
            let carrito = carritosAlmacenados.find((carrito) => carrito.id == id);
            if(carrito) {

                console.log('esto se debe agregar', carrito.productos);
                console.log( carrito.productos.push(cuerpo));
                return carrito;

                //return carrito;
                
               /* arritosAlmacenados = carritosAlmacenados.map( brand => {
                    if ( brand.id == id ) {

                        carrito.productos =  { ...cuerpo};
                        console.log('traigo', carrito);
                        return carrito;
                    }
                    console.log('este', brand);

                    return brand;
                }); */
               // return carrito; 
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
            let carrito = await carritosAlmacenados.find((carrito) => carrito.id == id);
            if(carrito) {
                carritosAlmacenados =  carritosAlmacenados.filter( carrito => carrito.id != id);
                return 'Se ha eliminado el producto';
            } else {
                return 'Ese producto no se encuentra registrado';
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }

    async deleteCartById(id, cartId) {
        try {
            let carrito = await carritosAlmacenados.find((carrito) => carrito.id == id );
        
            if(carrito) {
                let carritoProducto = await carrito.productos.find((item ) => item.id == cartId);
                if(carritoProducto) {
                    console.log('roto')
                    carritosAlmacenados = carritosAlmacenados.productos.filter( (item) => item.id != cartId);
                    
                }
                /* if(carritoProducto) {
                    console.log('encontre este carrito y producto: ', carritoProducto);
                } */
            } 
            carrito = nuevo;
        } catch (error) {
            
        }
    }

    
    // Borramos todo
    async deleteAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            let carritos = JSON.parse(data);
            if(carritos.length == 0) {
                return `No hay productos para eliminar`;
            } else {
                carritos = [];
                const carritoDelete = JSON.stringify(carritos);
                await fs.promises.writeFile(this.nombreArchivo, carritoDelete);
                return 'Se han eliminado los productos';
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }
}

module.exports = Carrito;