import { getData } from '../api.js';
import { agregarProducto } from '../carritoCompra/funcionesCarrito.js';

let productos = []

try{
const data = await getData() || {}
productos = data.productos;
}catch (error){
  console.log("Error: ", error)
}

let productosCarro = JSON.parse(localStorage.getItem('productosCarro')) || [];

const filtrarPorCategoria = (productos, categoria) => {
  const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
  return productosFiltrados;
};

const listarProductos = (productosfiltrado, categoria) => {
  productosfiltrado.forEach(productoFiltrado => {
    let contenedor = document.createElement("ol");
    let padre = document.querySelector(`li.categoria${categoria}`)
    contenedor.innerHTML = `<img src="../img/productos/${productoFiltrado.id}.jpeg">
                            <h3 class="productName">${productoFiltrado.nombre}</h3>
                            <b>precio: $ ${productoFiltrado.precio}</b>
                            <div class="opcionesProducto">
                            <button class="agregarProducto" data-id="${productoFiltrado.id}">Agregar al carrito</button>
                            </div>`;
    contenedor.className="producto"
    padre.appendChild(contenedor);  
  
    const btnAgregar = contenedor.querySelector('.agregarProducto');
    agregarProducto(btnAgregar, productosfiltrado, productosCarro);
  });
};

const filtradoTelevisor = filtrarPorCategoria(productos, "Televisor")
const filtradoPortatil = filtrarPorCategoria(productos, "Portatil")
const filtradoCelular = filtrarPorCategoria(productos, "Celular")

listarProductos(filtradoTelevisor, "Televisor")
listarProductos(filtradoPortatil, "Portatil")
listarProductos(filtradoCelular, "Celular")







