// Obtener productos desde el archivo productos.json
async function obtenerProductos() {
    try {
        const response = await fetch('productos.json'); // Asegúrate de que la ruta sea correcta
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}

// Mostrar productos con opción de cantidad e imagen obtenidos desde productos.json
async function mostrarProductos() {
    const productos = await obtenerProductos();
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    productos.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'producto productos-grid-item';

        const img = document.createElement('img');
        img.src = producto.img;
        img.className = 'productos-card-img-top';

        const nombre = document.createElement('span');
        nombre.textContent = `${producto.name} - $${producto.price}`;

        const cantidad = document.createElement('input');
        cantidad.type = 'number';
        cantidad.min = '1';
        cantidad.value = '1';
        cantidad.className = 'form-control w-25';

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al carrito';
        botonAgregar.className = 'btn btn-primary';
        botonAgregar.onclick = () => agregarAlCarrito(producto, cantidad.value);

        div.appendChild(img);
        div.appendChild(nombre);
        div.appendChild(cantidad);
        div.appendChild(botonAgregar);
        listaProductos.appendChild(div);
    });
}

// Agregar producto al carrito con cantidad seleccionada
function agregarAlCarrito(producto, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemExistente = carrito.find(item => item.name === producto.name);

    if (itemExistente) {
        itemExistente.quantity += parseInt(cantidad);
    } else {
        carrito.push({ ...producto, quantity: parseInt(cantidad) });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();

    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${producto.name} - Cantidad: ${cantidad}`,
        timer: 1500,
        showConfirmButton: false
    });
}

// Actualizar el carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const detalleCompra = document.getElementById('detalleCompra');
    detalleCompra.innerHTML = '';

    let total = 0;

    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'item-carrito productos-grid-item';

        const nombre = document.createElement('span');
        nombre.textContent = `${producto.name} - $${producto.price} x ${producto.quantity}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn btn-danger';
        botonEliminar.onclick = () => eliminarDelCarrito(index);

        div.appendChild(nombre);
        div.appendChild(botonEliminar);
        detalleCompra.appendChild(div);

        total += producto.price * producto.quantity;
    });

    const totalCarrito = document.createElement('p');
    totalCarrito.textContent = `Total: $${total}`;
    detalleCompra.appendChild(totalCarrito);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();

    Swal.fire({
        icon: 'info',
        title: 'Producto eliminado',
        timer: 1500,
        showConfirmButton: false
    });
}

// Vaciar el carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    actualizarCarrito();
    Swal.fire({
        icon: 'warning',
        title: 'Carrito vaciado',
        timer: 1500,
        showConfirmButton: false
    });
});

// Finalizar compra y generar ticket
document.getElementById('finalizarCompra').addEventListener('click', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'El carrito está vacío',
            timer: 1500,
            showConfirmButton: false
        });
        return;
    }

    let resumen = 'Resumen de la compra:\n';
    let total = 0;

    carrito.forEach(producto => {
        resumen += `${producto.name} - $${producto.price} x ${producto.quantity}\n`;
        total += producto.price * producto.quantity;
    });

    resumen += `\nTotal: $${total}`;

    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: resumen,
        showConfirmButton: true
    });

    localStorage.removeItem('carrito');
    actualizarCarrito();
});


// Llamar a la función al cargar la página
window.onload = function () {
    mostrarProductos();
    actualizarCarrito();
};
