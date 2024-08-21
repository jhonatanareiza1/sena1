// -- importación del JSON
const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito'));

//--- importaciones del DOM
const importxtCarrito = document.querySelector('.txtCarrito');
const productosCarrito = document.querySelector('#productosCarrito');
const accionesCarro = document.querySelector('.acciones-carro');
const txtCarritoFin = document.querySelector('#txtCarritoFin');
const botonVaciar = document.querySelector('#accionesVaciar');
const valTtal = document.querySelector('#total');
const botonComprar = document.querySelector('.accionesComprar');

let btnesEliminar = document.querySelectorAll('.eliminarCarrito');



function cargarProductos(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

        importxtCarrito.classList.add('disabled');
        productosCarrito.classList.remove('disabled');
        accionesCarro.classList.remove('disabled');
        txtCarritoFin.classList.add('disabled');
    
        productosCarrito.innerHTML = "";
    
        productosEnCarrito.forEach(producto =>{
            const div = document.createElement('div');
            div.classList.add('productoCarrito');
            div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" class="imgCarrito">
                <div class="nombreProductoT">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="productoCarritoCantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="ProductoCarrPrecio">
                    <small>Precio</small>
                    <p>$ ${producto.precio}</p>
                </div>
                <div class="productoSubtotal">
                    <small>Subtotal</small>
                    <p>$ ${producto.precio * producto.cantidad}</p>
                </div>
                <button id="${producto.id}" class="eliminarCarrito">Eliminar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg> </i></button>
            `;
    
            productosCarrito.append(div)
    
        })
    
    }else{
    
        importxtCarrito.classList.remove('disabled');
        productosCarrito.classList.add('disabled');
        accionesCarro.classList.add('disabled');
        txtCarritoFin.classList.add('disabled');
    }
    actualizarbEliminar();
    actualizarTtal();
}
cargarProductos();

function actualizarbEliminar() {
    btnesEliminar = document.querySelectorAll('.eliminarCarrito');

    btnesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarro);
    })
}

function eliminarDelCarro(e) {
    Toastify({
        text: "Producto eliminado del Carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #240048, #a953ff)",
          borderRadius: "2em",
          textTransform: "uppercase",
          fontSize:"1.3em"
        },
        offset: {
            x: "1em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.2em"// vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
    const idBtn = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBtn);
    
    productosEnCarrito.splice(index, 1);
    cargarProductos();

    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener('click', accionesCarrito);

function accionesCarrito(){

    Swal.fire({
        title: "¿Deseas eliminar?",
        html: `se van a eliminar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad)} productos d tu carrito`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Si",
        denyButtonText: "No"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem('productoEnCarrito', JSON.stringify(productosEnCarrito));
            cargarProductos();   
        }
      });
 
}

function actualizarTtal(){
    
    const totalSumado =productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalSumado}`
}

botonComprar.addEventListener('click', comprarCarrito);

function comprarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem('productoEnCarrito', JSON.stringify(productosEnCarrito));
    
    importxtCarrito.classList.add('disabled');
    productosCarrito.classList.add('disabled');
    accionesCarro.classList.add('disabled');
    txtCarritoFin.classList.remove('disabled'); 
}