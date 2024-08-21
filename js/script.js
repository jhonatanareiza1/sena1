let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
     productos = data;
     cargarProductos(productos);
    
})

//---llamados del DOM
const contenedorProductos = document.querySelector('#contenedor-productos');
const merch = document.querySelectorAll('.merch');
const tituloPpal = document.querySelector('#tituloPpal')
const numero = document.querySelector('#numero');

let bAgregar = document.querySelectorAll('.pAgregar')



///------funciones y creciones de innerHTML

function cargarProductos(productosElegidos){ 
    
    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto =>{
        const div = document.createElement('div');
        div.classList.add('producto')
            div.innerHTML = `
                    <img class="imagenProducto" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="datosimg">
                        <h3 class="pTitulo">${producto.titulo}</h3>
                        <p class="pPrecio">$${producto.precio}</p>
                        <button class="pAgregar" id="${producto.id}">Agregar</button>
                    </div>
                `;
    contenedorProductos.append(div);
    });

    actualizarbAgregar();
}



merch.forEach(boton => {
    boton.addEventListener('click', (e) =>{

        merch.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if(e.currentTarget.id != "todos"){
            const tituloCateg = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPpal.innerHTML = tituloCateg.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
        }else{
            tituloPpal.innerHTML = 'Todos Los Productos'
            cargarProductos(productos);
        }
    }) 
})

function actualizarbAgregar(){
    bAgregar = document.querySelectorAll('.pAgregar')

    bAgregar.forEach(boton =>{
        boton.addEventListener('click', addcarrito);
    });
};

// inicializadores para que guarde los datos si te devuelves de la pagina del carrito y no vas a borrar si no a añadir mas productos a la canasta

let productosEnCarrito;

const productosEnCarritoLS = localStorage.getItem('productosEnCarrito');
if(productosEnCarritoLS){

    productosEnCarrito =JSON.parse(productosEnCarritoLS);
    actualizarNum();

}else{
    productosEnCarrito = [];
}

function addcarrito(e){

    Toastify({
        text: "Producto Agregado al Carrito",
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
    const productoAgg = productos.find(producto => producto.id === idBtn);

    if(productosEnCarrito.some(producto => producto.id === idBtn)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBtn);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgg.cantidad = 1;
        productosEnCarrito.push(productoAgg);
    }

    actualizarNum();

    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
}

function actualizarNum(){
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}