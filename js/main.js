const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.getElementById("contador-carrito");

const listaCarrito = document.getElementById("lista-carrito");

const total = document.getElementById("total");


function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}


function actualizarContador() {

    if (contadorCarrito) {

        contadorCarrito.innerText = carrito.length;

    }

}


function agregarAlCarrito(nombre, precio, imagen) {

    const producto = {
        nombre,
        precio,
        imagen
    };

    carrito.push(producto);

    guardarCarrito();

    actualizarCarrito();

    Swal.fire({
        title: "Producto agregado",
        text: `${nombre} fue añadido al carrito`,
        icon: "success",
        showConfirmButton: false,
        timer: 1400,
        backdrop: `
            rgba(45,122,70,0.15)
        `,
        showClass: {
            popup: `
            animate__animated
            animate__zoomIn
            animate__faster
            `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOut
            animate__faster
            `
        }
    });

}


function actualizarCarrito() {

    actualizarContador();

    if (!listaCarrito || !total) {

        return;

    }

    listaCarrito.innerHTML = "";

    let totalCompra = 0;

    carrito.forEach((producto, index) => {

        totalCompra += producto.precio;

        listaCarrito.innerHTML += `

        <div class="producto-carrito">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <div class="info-carrito">

                <h4>${producto.nombre}</h4>

                <p>$${producto.precio}</p>

            </div>

            <button onclick="eliminarProducto(${index})">
                X
            </button>

        </div>

        `;

    });

    total.innerText = `Total: $${totalCompra}`;

}


function eliminarProducto(index) {

    carrito.splice(index, 1);

    guardarCarrito();

    actualizarCarrito();

    Swal.fire({
        title: "Producto eliminado",
        icon: "info",
        showConfirmButton: false,
        timer: 1000
    });

}


const formularioCompra = document.getElementById("formulario-compra");

if (formularioCompra) {

    formularioCompra.addEventListener("submit", function(e) {

        e.preventDefault();

        if (carrito.length === 0) {

            Swal.fire({
                title: "Carrito vacío",
                text: "Agregá productos antes de finalizar la compra",
                icon: "warning"
            });

            return;

        }

        Swal.fire({
            title: "Compra realizada",
            text: "Gracias por tu compra",
            icon: "success"
        });

        carrito.length = 0;

        guardarCarrito();

        actualizarCarrito();

        formularioCompra.reset();

    });

}


actualizarCarrito();