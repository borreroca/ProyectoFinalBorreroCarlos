import { getData } from '../api.js';
import {actualizarStorage, agregarProducto, quitarProducto, comprarProducto, validarMensajeDefault} from './funcionesCarrito.js';


let productos = []

try{
const data = await getData() || {}
productos = data.productos;
}catch (error){
  console.log("Error: ", error)
}

let productosCarro = JSON.parse(localStorage.getItem('productosCarro')) || [];
let total = parseFloat(localStorage.getItem('totalCompra')) || 0;

actualizarStorage(total, productosCarro);
validarMensajeDefault(productosCarro);

productosCarro.forEach(({id, nombre, precio, cantidad}) => {
  let contenedor = document.createElement("tr");
  let bodyTable = document.getElementById("tableBody")
  contenedor.innerHTML = `<td>${nombre}</td>
                          <td>$${precio}</td>
                          <td class="cantidadProducto${id}">${cantidad}</td>
                          <td><div class="opcionesProducto">
                          <button class="agregarProducto" data-id="${id}">+</button>
                          <button class="quitarProducto" data-id="${id}">-</button>
                          </div></td>`;
  contenedor.className=`producto producto${id}`
  bodyTable.appendChild(contenedor);

  const btnAgregar = contenedor.querySelector('.agregarProducto');
  agregarProducto(btnAgregar, productos, productosCarro);

  const btnQuitar = contenedor.querySelector('.quitarProducto');
  quitarProducto(btnQuitar, productos, productosCarro);

  const btnComprar = document.querySelector('.comprar');
  comprarProducto(btnComprar)
});
