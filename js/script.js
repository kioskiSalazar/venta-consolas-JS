// DOM
const stockConsolas = document.getElementById("stock-consolas");
const verCarrito = document.getElementById("verCarrito");
const comprasCarrito = document.getElementById("contenedor-carrito");
const cantidad = document.getElementById("cantidad");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// fetch
async function bringdata(){
    const response = await fetch('./js/consolas.json');
    const data = await response.json();
    const  consolas = data;
//tarjeta consolas
consolas.forEach((consola) => {
    let content = document.createElement("div");
    content.className = "tarjeta"
    content.innerHTML = `
<img src="${consola.img}">
<h3>${consola.marca}</h3>
 <p>${consola.precio} $</p>
 `;
    stockConsolas.append(content);


    // boton comprar
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "btncomprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
        carrito.push({
            id: consola.id,
            img: consola.img,
            marca: consola.marca,
            precio: consola.precio,
        });
        guardarCompra();
        carritoContador();
    });

});

// modal compras

const renovarCarrito = () => {
    comprasCarrito.innerHTML = "";
    comprasCarrito.style.display = "flex";
    const compraCarrito = document.createElement("div");
    compraCarrito.className = "compraCarrito"
    compraCarrito.innerHTML = `
   <h1 class="compraCarrito-h1">carrito</h1> 
   `;
    comprasCarrito.append(compraCarrito);

    // funcion para vaciar carrito
    const vaciar = () => {
        carrito = [];
        guardarCompra();
        renovarCarrito();
        Swal.fire(
            'Carrito vacio!',
            'Vaciaste el carrito!',
            'warning'
        );
        carritoContador();
    };

    // vaciar carrito

    let vaciarCarrito = document.createElement("h1");
    vaciarCarrito.innerHTML = `<h1>vaciar</h1>`;
    vaciarCarrito.className = "cierreCarrito";
    compraCarrito.append(vaciarCarrito);
    vaciarCarrito.addEventListener("click", vaciar);



    // cierre carrito
    const cierrebotton = document.createElement("h1");
    cierrebotton.innerHTML = `<h1>x</h1>`;
    cierrebotton.className = "cierreCarrito";
    cierrebotton.addEventListener("click", () => {
        comprasCarrito.style.display = "none";
    });

    compraCarrito.append(cierrebotton);


    // cargar carrito
carrito.forEach((consola) => {
let contenidoCarrito = document.createElement("div")
contenidoCarrito.className = "modalContent"
contenidoCarrito.innerHTML = `
<img src="${consola.img}">
<h3>${consola.marca}</h3> 
<p>${consola.precio} $</p>
<h1 class= "eliminarCons">Eliminar</h1>
`;
comprasCarrito.append(contenidoCarrito);
        
// boton eliminar consola
let eliminar = contenidoCarrito.querySelector(".eliminarCons");
eliminar.addEventListener("click", ()=> {
    eliminarConsola(consola.id)
});
});



    // boton finalizar compra

    const finalizarBotton = document.createElement("h1");
    finalizarBotton.innerHTML = `<h1>finalizar compra</h1>`;
    finalizarBotton.className = "finalizar";

    finalizarBotton.addEventListener("click", () => {
        comprasCarrito.style.display = "none";
        Swal.fire(
            'Compra exitosa!',
            'Gracias por tu compra!',
            'success'
        );
        carrito = [];
        carritoContador();
        guardarCompra();
    })
        ;
    comprasCarrito.append(finalizarBotton);
    // calculo de precio total
    const total = carrito.reduce((acc, cns) => acc + cns.precio, 0);

    const precioTotal = document.createElement("div")
    precioTotal.className = "TotalPrecio"
    precioTotal.innerHTML = `total a pagar: ${total} $`;
    comprasCarrito.append(precioTotal)
};

verCarrito.addEventListener("click", renovarCarrito);
// funcion contador
const carritoContador = () => {
cantidad.style.display = "block";
cantidad.innerText = carrito.length;     
}; 

// funcion eliminar consola
const eliminarConsola = (id) => {
    const foundId = carrito.find((element)=> element.id === id);
    
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId;
    });
    carritoContador();
   renovarCarrito(); 
   guardarCompra();
};
// local storageg
const guardarCompra = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));
 };
bringdata();













































