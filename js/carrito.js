//Traemos los datos del LocalStorage
let carritoDeProdcutosAgregados = localStorage.getItem("productosEnElCarrito");
carritoDeProdcutosAgregados=JSON.parse(carritoDeProdcutosAgregados);

const carritoVacio = document.querySelector("#carritoEstaVacioahora");
const compra = document.querySelector("#carritoCompras");
const controles = document.querySelector("#accionesControl");
const mensjFinal = document.querySelector("#mensajeFinal");
let botonParaEliminar = document.querySelectorAll(".btn-eliminar");



function finalizarCompra(){
  if(carritoDeProdcutosAgregados && carritoDeProdcutosAgregados.length > 0){

    
    carritoVacio.classList.add("disabled");
    compra.classList.remove("disabled");
    controles.classList.remove("disabled");
    mensjFinal.classList.add("disabled");
  
    //Limpiamos el carrito
    compra.innerHTML = "";
  
    //Mostramos los productos agregados al carrito
    carritoDeProdcutosAgregados.forEach(termo => {
      const divNew = document.createElement("div");
      divNew.classList.add("productos-elegido");
      divNew.innerHTML = `
        <img class="img-carrito-producto" src="${termo.img}" alt="${termo.nombre}">
        <div>
          <small>Articulo</small>
          <h4>${termo.nombre}</h4>
        </div>
        <div>
          <small>Cantidad</small>
          <h4>${termo.stock}</h4>
        </div>
        <div>
          <small>Precio</small>
          <h4>$ ${termo.precio}</h4>
        </div>
        <div>
          <small>Subtotal</small>
          <h4>$ ${termo.precio * termo.stock}</h4>
        </div>
        <button type="button" class="btn btn-danger btn-eliminar" id="${termo.id}"><i class="bi bi-trash3"></i></button>    
      `
      compra.append(divNew); 
    });
  
  }else{
  
    carritoVacio.classList.remove("disabled");
    compra.classList.add("disabled");
    controles.classList.add("disabled");
    mensjFinal.classList.add("disabled");  
  }
  //Resetea los botones de eliminar
  resetEliminar();
  sumaFinal()
}
//Ejecuta la funcion principal
finalizarCompra();


//Reset Boton Eliminar
function resetEliminar() {
  botonParaEliminar = document.querySelectorAll(".btn-eliminar");
  botonParaEliminar.forEach(btn => {
    btn.addEventListener("click", vaciar);
  });
};

//Limpiar Carrito
function vaciar(evento){
  const iddelBoton = evento.currentTarget.id;
  
  const indice = carritoDeProdcutosAgregados.findIndex(termo => termo.id === iddelBoton);
  carritoDeProdcutosAgregados.splice(indice,1);
  finalizarCompra();
  localStorage.setItem("productosEnElCarrito", JSON.stringify(carritoDeProdcutosAgregados));
}

//Vaciar Carrito
const btnVaciar = document.querySelector("#vaciar");
function eliminarCompras(){
  carritoDeProdcutosAgregados.length = 0;
  localStorage.setItem("productosEnElCarrito", JSON.stringify(carritoDeProdcutosAgregados));
  finalizarCompra();
}

btnVaciar.addEventListener("click", eliminarCompras);



//Monto Total de la compra
const totalComprado = document.querySelector("#montofinal");

function sumaFinal(){
  montofinal.innerText = carritoDeProdcutosAgregados.reduce((acum, termo) => acum + (termo.precio * termo.stock),0);
}

//Accion Boton Comprar Final
const btnComprarFinal = document.querySelector("#comprafinalaccion");

function accionComprar(){
  carritoDeProdcutosAgregados.length = 0;
  localStorage.setItem("productosEnElCarrito", JSON.stringify(carritoDeProdcutosAgregados));
  carritoVacio.classList.add("disabled");
  compra.classList.add("disabled");
  controles.classList.add("disabled");
  mensjFinal.classList.remove("disabled"); 
}

btnComprarFinal.addEventListener("click",accionComprar)
