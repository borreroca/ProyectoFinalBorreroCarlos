import { getData } from './api.js';
// import { Producto } from './class.js';


// let productosListados = []

// try{
  const {productos} = await getData() || {}
//   productosListados = data.productos;
// }catch (error){
//   console.log("Error: ", error)
// }

// console.log(productosListados);
console.log(productos)


let productosCarro = JSON.parse(localStorage.getItem('productosCarro')) || [];
let total = parseFloat(localStorage.getItem('totalCompra')) || 0;

productos.forEach(producto => {
  let contenedor = document.createElement("ol");
  let padre = document.querySelector("li.listadoProductos")
  contenedor.innerHTML = `<img src="./img/productos/${producto.id}.jpeg">
                          <h3 class="productName">${producto.nombre}</h3>
                          <b>precio: $ ${producto.precio}</b>
                          <div class="opcionesProducto">
                          <button class="agregarProducto" data-id="${producto.id}">Agregar al carrito</button>
                          </div>`;
  contenedor.className="producto"
  padre.appendChild(contenedor);  

  const btnAgregar = contenedor.querySelector('.agregarProducto');
  btnAgregar.addEventListener('click', () => {
    const id = btnAgregar.dataset.id;
    const productoCarro = productos.find(producto => producto.id === parseInt(id));
    const productoExistente = productosCarro.find(producto => producto.id === parseInt(id));
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      productoCarro.cantidad = 1;
      productosCarro.push(productoCarro);
    }
    total += productoCarro.precio;

    localStorage.setItem('productosCarro', JSON.stringify(productosCarro));
    localStorage.setItem('totalCompra', total);
  });
});

// for (const producto of productos){
//   let contenedor = document.createElement("ol");
//   let padre = document.querySelector("li.listadoProductos")
//   contenedor.innerHTML = `<img src="./img/productos/${producto.id}.jpeg">
//                           <h3>${producto.nombre}</h3>
//                           <b>precio: $ ${producto.precio}</b>
//                           <div class="opcionesProducto">
//                           <button class="agregarProducto" data-id="${producto.id}">Agregar al carrito</button>
//                           <button class="quitarProducto" data-id="${producto.id}">-</button>
//                           </div>`;
//   contenedor.className="producto"
//   padre.appendChild(contenedor);


// }

// const infoCarro = document.querySelector('.infoCarro');
// let cantidadTotal = 0;
// let productosEnCarro = '';
// for (const producto of productosCarro) {
//   cantidadTotal += producto.cantidad;
//   productosEnCarro += `${producto.nombre}: ${producto.cantidad} unidades<br>`;
// }
// infoCarro.innerHTML = `Carrito de Compra: ${cantidadTotal} productos - Total: $ ${total}<br>${productosEnCarro}`;
// const mensajeCompra = document.querySelector('.mensajeCompra');
// mensajeCompra.innerHTML = '';


