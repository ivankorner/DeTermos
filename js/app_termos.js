//Array de Termos
const termos = [
  {
    nombre: "Termo Lumilagro Luminox Acero",
    id: "020",
    categoria: "nacional",
    precio: 18000,    
    descripcion: "Termo Lumilagro de Acero, 1 Lts, categoria Bala",
    img: "../img/020.png",
    scoring: "&#9733;&#9733;&#9733;"     
  },
  {
    nombre: "Termo Lumilagro Luminox Acero Fultbol",
    id: "021",
    categoria: "nacional",
    precio: 33000,
        descripcion:
      "Termo Lumilagro de Acero, 1 Lts, categoria Bala, Ploteado Selección Futbol Argentino",
    img: "../img/021.png",
    scoring: "&#9733;&#9733;&#9733;"     
  },
  {
    nombre: "Termo Lumilagro Sigma Vidrio",
    id: "022",
    categoria: "nacional",
    precio: 28000,    
    descripcion: "Termo de vidrio azul Sigma Lumilagro 1L",
    img: "../img/022.png",
    scoring: "&#9733;&#9733;"     
  },
  {
    nombre: "Termo Coleman Acero Inoxidable",
    id: "023",
    categoria: "importado",
    precio: 58000,    
    descripcion:
      "Termo Coleman Acero Inoxidable 1200 Ml. Color Negro. Pico sevador",
    img: "../img/023.png",
    scoring: "&#9733;&#9733;&#9733;&#9733;" 
  },
  {
    nombre: "Termo Termolar R-evolution",
    id: "024",
    categoria: "nacional",
    precio: 54000,    
    descripcion:
      "Termo Termolar R-evolution Rolha-Dupla1 de acero inoxidable 1L acero inoxidable",
    img: "../img/024.png",
    scoring: "&#9733;&#9733;&#9733;&#9733;"
  },
  {
    nombre: "Termo Waterdog Ombu",
    id: "025",
    categoria: "importado",
    precio: 64000,    
    descripcion: "Termo Waterdog Ombu 1000ml Negro Ombu1000bk",
    img: "../img/025.png",
    scoring: "&#9733;&#9733;&#9733;"
  },
  {
    nombre: "Termo Stanley Clásico Azul Lake",
    id: "026",
    categoria: "importado",
    precio: 120000,    
    descripcion: "Termo Stanley Clásico 1.4 Litros Con Manija Color Azul Lake",
    img: "../img/026.png",
    scoring: "&#9733;&#9733;&#9733;&#9733;"
  },
  {
    nombre: "Termo Contigo Ashland",
    id: "027",
    categoria: "importado",
    precio: 80000,
    descripcion:
      "Termo Contigo Ashland Chill 2070897 35hs Agua Caliente 1200cc Color Negro",
    img: "../img/027.png",
    scoring: "&#9733;"
  },
  {
    nombre: "Termo Kushiro Acero Inoxidable",
    id: "028",
    categoria: "importado",
    precio: 90000,
    descripcion: "Termo Kushiro DS607V de acero inoxidable 1L gris",
    img: "../img/028.png",
    scoring: "&#9733;&#9733;&#9733;&#9733;"   
  },
  {
    nombre: "Termo Lusqtoff Acero Inoxidable",
    id: "029",
    categoria: "importado",
    precio: 30000,
    descripcion:
      "Termo Acero Inox Lusqtoff Color Negro TL1-9N 1 Lt Tapón Cebador",
    img: "../img/029.png",
    scoring: "&#9733;&#9733;&#9733;"
  },
];

// Obteniendo datos
const productosContendor = document.querySelector("#contenedor-productos");
//Reset Agregar al Carrito
let resetAlCarrito = document.querySelectorAll(".agregarProducto");
const indicador = document.querySelector("#numuero-indicador");


// Recorremos el Array mostrando los Termos
function recodiendoElArray(productoSeleccionado) {
  //Vaciamos el contenedor
  productosContendor.innerHTML = "";
  productoSeleccionado.forEach(termo => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("productoIndividual");
    newDiv.innerHTML = `
          <img class="imagen-producto" src="${termo.img}" alt="${termo.nombre}">
           <div>
              <h2>${termo.nombre}</h2>
              <h5>${termo.descripcion}</h5>
              <h5>$ ${termo.precio}</h5>
              <p>${termo.categoria}</p>
              <p>Valoración</p>
              <p>${termo.scoring}</p>
              <button class="btn btn-warning agregarProducto" id="${termo.id}">Agregar al carrito</button>              
          </div>    
                  `;
    productosContendor.append(newDiv);
  })

  //agregarAlCarrito();
  agregarAlCarrito();
  console.log(resetAlCarrito);
}
//Ejecutamos la función
recodiendoElArray(termos);


//Obtenemos el id de los btn por sus categorias
const categoriasProductos = document.querySelectorAll(".btnCategoria");

//Filtro por Categorias
categoriasProductos.forEach(btn => {
  btn.addEventListener("click", (evento) => {
    categoriasProductos.forEach(btn =>
      btn.classList.remove("active")    );
      evento.currentTarget.classList.add("active");
      if (evento.currentTarget.id != "todas"){
        const filtroProducto = termos.filter(termo => termo.categoria === evento.currentTarget.id);
        recodiendoElArray(filtroProducto);
      } else {
        recodiendoElArray(termos);
      }
  })
});

//Reset Agregar al Carrito
function agregarAlCarrito() {
  resetAlCarrito = document.querySelectorAll(".agregarProducto");
  resetAlCarrito.forEach(boton => {
    boton.addEventListener("click", sumarAlCarrito);
  });
};




//Almacenar productos en el Carrito
let productosCarrito;
const LocalStorageCarritoDeProductosAgregados =  localStorage.getItem("productosEnElCarrito");
if(LocalStorageCarritoDeProductosAgregados){
  productosCarrito = JSON.parse(LocalStorageCarritoDeProductosAgregados);
  actualizarIndicador();
}else{
  productosCarrito = [];
}

function sumarAlCarrito(evento){
  const idBtn = evento.currentTarget.id;
  console.log(idBtn)
  const agregadoAlCarrito = termos.find(termo => termo.id === idBtn);

  if(productosCarrito.some(termo => termo.id === idBtn)){
    const indice = productosCarrito.findIndex(termo => termo.id === idBtn);
    productosCarrito[indice].stock++;

  }else{
    agregadoAlCarrito.stock = 1;
    productosCarrito.push(agregadoAlCarrito);
  } 
  //Ejecuta la funcion para actualiza el indicador de productos agregados al carrito 
  actualizarIndicador();  
  //Almacena los productos agregados al carrito en el LocalStorage
  localStorage.setItem("productosEnElCarrito",JSON.stringify(productosCarrito));
};

//Indicador de producto agregado

 //Actualiza el indicador de productos agregados al carrito 
function actualizarIndicador(){
  let indicadorActualizado = productosCarrito.reduce((acumunaldor, termos) => acumunaldor + termos.stock, 0);
  indicador.innerText = indicadorActualizado;
}



