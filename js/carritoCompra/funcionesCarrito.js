
//Actualiza los valores del localStorage y del total que se encuentra al final del listado de productos
export const actualizarStorage = (total, productosCarro) => {

  localStorage.setItem('productosCarro', JSON.stringify(productosCarro));
  localStorage.setItem('totalCompra', total);

  const padre = document.querySelector("div.precioTotal p")
  padre.innerHTML = `El total es: $ ${total}`;
}

// Actualiza en el Carrito de compra cada que cambia la cantidad
const actualizarCantidadListado = (cantidad, id) => {
  const padre = document.querySelector(`.cantidadProducto${id}`)
    padre.innerHTML = `${cantidad}`;  
}

//Valida si hay productos en el carrito, si los hay elimina el mensaje default, sino lo coloca
export const validarMensajeDefault = (productosCarro) => {
  const elemento = document.querySelector(".mensajeDefault");

  if(elemento === null){
    if(productosCarro.length === 0){
      let contenedor = document.createElement("tr");
      let tableBody = document.getElementById("tableBody")
      contenedor.innerHTML = `<td colspan="4">No hay ningun producto agregado al carrito :(</td>`;
      contenedor.className=`mensajeDefault`
      tableBody.appendChild(contenedor);
    }
  }else{
    if(productosCarro.length > 0){
      const tableBody = document.getElementById("tableBody");
      tableBody.removeChild(elemento);
    }
  }
}

//Cuando un producto hace su cantidad 0, elimina la fila del carrito de compra
const eliminarFilaProducto = (id) => {
  const padre = document.getElementById("tableBody");
  const elemento = document.querySelector(`.producto${id}`);
  padre.removeChild(elemento);
}


// Agrega un producto al carrito, si ya existe, aumenta la cantidad en 1
export const agregarProducto = (btnAgregar, productos, productosCarro) => {
    btnAgregar.addEventListener('click', () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu producto ha sido agregado satisfactoriamente',
        showConfirmButton: false,
        timer: 1000
      })
      const id = btnAgregar.dataset.id;
      const productoAgregar = productos.find((producto) => producto.id === parseInt(id));
      const productoExistente = productosCarro.find(producto => producto.id === parseInt(id));
      if (productoExistente) {
        productoExistente.cantidad++;
        actualizarCantidadListado(productoExistente.cantidad, id)
      } else {
        productoAgregar.cantidad = 1;
        productosCarro.push(productoAgregar);
      }

      let total = parseFloat(localStorage.getItem('totalCompra')) || 0;
      total += productoAgregar.precio;
  
      actualizarStorage(total, productosCarro);
      validarMensajeDefault(productosCarro);
    });
};

//Disminuye la cantidad de un producto en 1, si se hará 0, lo elimina del carrito
  export const quitarProducto = (btnQuitar, productos, productosCarro) => {
    btnQuitar.addEventListener('click', () => {
        const id = btnQuitar.dataset.id;
        const productoCarro = productos.find(producto => producto.id === parseInt(id));
        const productoExistente = productosCarro.find(producto => producto.id === parseInt(id));
        if (productoExistente) {
          if (productoExistente.cantidad === 1) {
            Swal.fire({
              title: '¿Estas seguro?',
              text: "Presione Confirmar para eliminar el producto del carrito",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )

                let total = parseFloat(localStorage.getItem('totalCompra')) || 0;
                total -= productoCarro.precio;

                const index = productosCarro.indexOf(productoExistente);
                productosCarro.splice(index, 1);
                eliminarFilaProducto(id);
                actualizarStorage(total, productosCarro);
                validarMensajeDefault(productosCarro);
              }
            })
            
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Tu producto ha sido retirado satisfactoriamente',
              showConfirmButton: false,
              timer: 1000
            })
            productoExistente.cantidad--;
            actualizarCantidadListado(productoExistente.cantidad, id)

            let total = parseFloat(localStorage.getItem('totalCompra')) || 0;
            total -= productoCarro.precio;
            
            actualizarStorage(total, productosCarro)
          }
        }
      });
};

//Simula y lista la compra del carrito, elimina los productos del carrito al final
  export const comprarProducto = (btnComprar) => {
    btnComprar.addEventListener('click', () => {

      let productosCarro = JSON.parse(localStorage.getItem('productosCarro')) || [];
      const listaProductos  = productosCarro.map(producto => `${producto.nombre}: ${producto.cantidad} und`);
      
      Swal.fire({
        title: 'Confirmar compra',
        text: "Desea proceder con la compra de los siguientes productos:",
        html: `Productos:<br>${listaProductos.join('<br>')}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comprar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Gracias por su compra!',
          )
          productosCarro = [];
          const total = 0;
          actualizarStorage(total, productosCarro)

          const elementos = document.getElementsByClassName("producto");
          const elementosArray = Array.from(elementos);
          elementosArray.forEach(elemento => elemento.parentNode.removeChild(elemento));

          validarMensajeDefault(productosCarro)
        }
      })
  });
  };