

// Recupera productos y carrito del almacenamiento local
const productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

// Función para añadir nuevos productos
const agregarItem  = ({
  nombre, id, type , precio,  stock, descripcion
}) => {  
  if (productos.some(prod => prod.id === id)) {    
  } else {
    const nuevoProducto  = new Item(
      nombre, id, type , precio,  stock, descripcion
    )
    productos.push(nuevoProducto );    
    localStorage.setItem('productos', JSON.stringify(productos))
  }
}

// Carga inicial de productos si el array está vacío
const cargarProductosIniciales  = () => {
  if (productos.length === 0) {
    productosPreCargados.forEach(prod => {
      let dato = JSON.parse(JSON.stringify(prod));
      agregarItem (dato)
    })
  }
}

// Calcula el total del carrito de compras
const calcularTotalCarrito = () => {
  let total = carrito.reduce((acumulador, { precio, quantity }) => {
    return acumulador + precio * quantity;
  }, 0)
  return total;
}
// Actualiza el total del carrito en la interfaz
const actualizarTotalCarrito = () => {
  const carritoTotal = document.getElementById("carritoTotal")
  carritoTotal.innerHTML = `precio Total: $${calcularTotalCarrito()}`
}

// Añade un producto al carrito
const agregarAlCarrito = (objetoCarrito) => {
  carrito.push(objetoCarrito)
  actualizarTotalCarrito()
}

// Renderiza el carrito en la interfaz
const mostrarCarrito = () => {
  const listaCarrito = document.getElementById("listaCarrito")
  listaCarrito.innerHTML = ""
  carrito.forEach(
    ({nombre, precio, quantity,id}) => {
      let elementoLista = document.createElement("li")
      elementoLista.innerHTML = `Producto: ${nombre} <br> precio/U: $${precio} <br> Cant. : ${quantity} <br> <button  class="btn btn-danger" id="eliminarCarrito${id}">Borrar</button>`
      listaCarrito.appendChild(elementoLista);
      const botonEliminar = document.getElementById(`eliminarCarrito${id}`)
      botonEliminar.addEventListener("click", () => {
        carrito = carrito.filter((elemento) => {
          if (elemento.id !== id) {
            return elemento
          }
        });
        let carritoString = JSON.stringify(carrito);
        localStorage.setItem("carrito", carritoString);
        mostrarCarrito();
      });
      let carritoString = JSON.stringify(carrito);
      localStorage.setItem("carrito", carritoString);
    }
  );
};

// Borra el carrito de compras
const limpiarCarrito = () => {
  carrito.length = 0; 
  let carritoString = JSON.stringify(carrito)
  localStorage.setItem("carrito", carritoString)
  mostrarCarrito()
}

// Renderiza la lista de productos
const mostrarProductos = (arrayUtilizado) => { 
  const contenedorProductos = document.getElementById("contenedorProductos"); 
  contenedorProductos.innerHTML = "";
  arrayUtilizado.forEach(
    ({ id, nombre, precio, type, stock, descripcion }) => {
      const prodCard = document.createElement("div")      
      prodCard.classList.add("col-xs", "card")      
      prodCard.style = "width: 250px; height: auto; margin:5px; justify-content: space-around; padding: 10px; "
      prodCard.id = id
      prodCard.innerHTML = `        
                <img src="../img/${id}.png" class="card-img-top" alt="${nombre}">
                <div class="card-body text-center justify-content-center">
                    <h4 class="card-title">${nombre}</h4>                    
                    <p class="card-text">${descripcion}</p>
                    <p class="precio">precio: $ ${precio}</p>
                    <p>Stock: ${stock}</p>                    
                    <p>Procedencia: ${type}</p>                                       
                    <div>
                    
                    <form id="form${id}">
                        <label for="contador${id}">Cantidad</label>
                        <input type="number" placeholder="0" id="contador${id}" style="border-radius: 8px;">
                        <button class="btn btn-warning" style="margin: 5px"  id="botonProd${id}">Agregar</button>
                    </form>
                    </div>  
                </div>`                
      contenedorProductos.appendChild(prodCard)
      const btn = document.getElementById(`botonProd${id}`)      
      btn.addEventListener("click", (evento) => {
        evento.preventDefault()
        const contadorQuantity = Number(
          document.getElementById(`contador${id}`).value
        )
        if (contadorQuantity > 0) {
          agregarAlCarrito({
            nombre, id, type , precio,  stock, descripcion,
            quantity: contadorQuantity,
          });
          mostrarCarrito();
          const form = document.getElementById(`form${id}`);
          form.reset();
        }
      });
    }
  );
};

// Finaliza una compra
const finalizarCompra = (event) => {
  event.preventDefault();  
  const data = new FormData(event.target);  
  const cliente = Object.fromEntries(data);  
  const eticket = {
    cliente: cliente,
    total: calcularTotalCarrito(),
    id: ordenes.length,
    productos: carrito,
  }; 
  ordenes.push(eticket);  
  localStorage.setItem("ordenes", JSON.stringify(ordenes));  
  limpiarCarrito();
  let mensaje = document.getElementById("carritoTotal");
  mensaje.innerHTML =`
  <div class="descuentos text-center">
    <h2>
      "Muchas gracias por su compra"
    </h2>
 </div>  
  `
};

// Configuración del DOM y eventos
const compraFinal = document.getElementById("formCompraFinal");
compraFinal.addEventListener("submit", (event) => {
  event.preventDefault();
  if (carrito.length > 0) {
    finalizarCompra(event);
  } else {
    
  }
});
const selectorTipo = document.getElementById("tipoProducto")
selectorTipo.onchange = (evt) => {
  const tipoSeleccionado = evt.target.value;
  if (tipoSeleccionado === "Todos") {
    mostrarProductos(productos);
  } else {
    mostrarProductos(
      productos.filter((prod) => prod.type === tipoSeleccionado)
    );
  }
};

// Test
const app = () => {
  cargarProductosIniciales ();
  mostrarProductos(productos);
  mostrarCarrito();
  actualizarTotalCarrito();
};

//Ejecucion de la Aplicacion
app();
