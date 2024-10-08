// Lista de productos en un array de objetos
const productosPapelarte = [
    { name: "Agenda perpetua", price: 45 },
    { name: "Agenda emprendedora", price: 50 },
    { name: "Cuaderno del estudiante", price: 35 },
    { name: "Tarjetas personalizadas", price: 15 },
    { name: "Bolsas para eventos", price: 20 },
];

// Mostrar productos y verificar si ya están en el carrito
function mostrarProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = ''; // Limpiar lista para evitar duplicados
    productosPapelarte.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'producto';

        const nombre = document.createElement('span');
        nombre.textContent = `${producto.name} - $${producto.price}`;

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al carrito';
        botonAgregar.onclick = () => agregarAlCarrito(index);

        div.appendChild(nombre);
        div.appendChild(botonAgregar);
        listaProductos.appendChild(div);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productosPapelarte[index];
    const itemExistente = carrito.find(item => item.name === producto.name);

    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        carrito.push({ ...producto, quantity: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Actualizar el contenido del carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const detalleCompra = document.getElementById('detalleCompra');
    detalleCompra.innerHTML = '';

    let total = 0;

    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'item-carrito';

        const nombre = document.createElement('span');
        nombre.textContent = `${producto.name} - $${producto.price} x ${producto.quantity}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);

        div.appendChild(nombre);
        div.appendChild(botonEliminar);
        detalleCompra.appendChild(div);

        total += producto.price * producto.quantity;
    });

    const totalCarrito = document.createElement('p');
    totalCarrito.textContent = `Total: $${total}`;
    detalleCompra.appendChild(totalCarrito);

    if (carrito.length > 0) {
        const botonVaciar = document.createElement('button');
        botonVaciar.textContent = 'Vaciar carrito';
        botonVaciar.onclick = vaciarCarrito;
        detalleCompra.appendChild(botonVaciar);
    }
}

// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

// Mostrar el carrito al cargar la página
window.onload = function () {
    mostrarProductos();
    actualizarCarrito();
};
