// Lista de productos en un array de objetos
const productosPapelarte = [
    { name: "Agenda perpetua", price: 45 },
    { name: "Agenda emprendedora", price: 50 },
    { name: "Cuaderno del estudiante", price: 35 },
    { name: "Tarjetas personalizadas", price: 15 },
    { name: "Bolsas para eventos", price: 20 },
];

// Al cargar la página, mostrar los productos con checkboxes
function mostrarProductos() {
    const listaProductos = document.getElementById('listaProductos');
    productosPapelarte.forEach((producto, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `producto-${index}`;
        checkbox.value = producto.name;
        checkbox.dataset.price = producto.price; // Guardamos el precio en un atributo

        const label = document.createElement('label');
        label.htmlFor = `producto-${index}`;
        label.textContent = `${producto.name} - $${producto.price}`;

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);

        listaProductos.appendChild(div);
    });
}

// Captura el evento del formulario de registro
document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtiene el nombre de usuario y la contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar la longitud de la contraseña
    if (password.length >= 8 && password.length <= 14) {
        // Guarda el usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify({ username, password }));

        // Muestra un mensaje de bienvenida en el DOM
        document.getElementById('mensajeBienvenida').innerHTML = `Registro exitoso. Bienvenido, ${username}`;

        // Muestra la lista de productos para comprar
        mostrarProductos();
    } else {
        document.getElementById('mensajeBienvenida').innerHTML = "La contraseña debe tener entre 8 y 14 caracteres.";
    }
});

// Manejar el evento de finalizar compra
document.getElementById('finalizarCompra').addEventListener('click', function () {
    const productosSeleccionados = [];
    const checkboxes = document.querySelectorAll('#listaProductos input[type="checkbox"]:checked');

    let total = 0;
    checkboxes.forEach(checkbox => {
        const nombreProducto = checkbox.value;
        const precioProducto = parseFloat(checkbox.dataset.price);

        productosSeleccionados.push(`${nombreProducto} - $${precioProducto}`);
        total += precioProducto;
    });

    // Mostrar el detalle de la compra
    const detalleCompra = document.getElementById('detalleCompra');
    if (productosSeleccionados.length > 0) {
        detalleCompra.innerHTML = `
            <h2>Detalle de la compra</h2>
            <p>Has comprado:</p>
            <ul>
                ${productosSeleccionados.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p>Total: $${total}</p>
        `;
    } else {
        detalleCompra.innerHTML = `<p>No has seleccionado ningún producto.</p>`;
    }
});
