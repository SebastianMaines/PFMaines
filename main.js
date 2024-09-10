
alert("Te damos la bienvenida a Papelarte.\nDescubre nuestros productos personalizados de papelería.");

let username = "";
let password = "";

// Solicitar registro 
while (username === "") {
    username = prompt("Ingresa un nombre de usuario para registrarte: ");
}

while (password === "" || password.length < 8 || password.length > 14) {
    password = prompt("Ingresa una contraseña (debe tener entre 8 y 14 caracteres): ");
}

alert(`Registro exitoso.\nBienvenido a Papelarte, ${username}`);

console.log(`Usuario registrado: ${username}`);
console.log(`Contraseña registrada: ${password}`);

// Lista de productos
const productosPapelarte = [
    { name: "Agenda perpetua", price: 45 },
    { name: "Agenda emprendedora", price: 50 },
    { name: "Cuaderno del estudiante", price: 35 },
    { name: "Tarjetas personalizadas", price: 15 },
    { name: "Bolsas para eventos", price: 20 },
];

// Mostrar productos disponibles 
const nombresProductos = productosPapelarte.map(producto => producto.name).join('\n');
let productoSeleccionado = prompt(`Elige un producto de la lista para más detalles:\n${nombresProductos}`);

// Filtrar  producto 
let productoEncontrado = productosPapelarte.filter(producto => producto.name.toLowerCase() === productoSeleccionado.toLowerCase());

if (productoEncontrado.length > 0) {
    alert(`Has seleccionado: ${productoEncontrado[0].name} - Precio: $${productoEncontrado[0].price}`);


    let colorTapa = prompt("Selecciona el color de la tapa (negro, azul, rosa, amarillo o gris):").toLowerCase();


    const coloresValidos = ["negro", "azul", "rosa", "amarillo", "gris"];
    if (coloresValidos.includes(colorTapa)) {
        alert(`Has elegido el producto ${productoEncontrado[0].name} con tapa color ${colorTapa}`);
    } else {
        alert("El color seleccionado no es válido.");
    }
} else {
    alert("El producto seleccionado no está disponible.");
}

// compra
function comprarProductos() {
    let carrito = [];
    let opcion;

    while (opcion !== "0") {
        console.log("--- Lista de Productos ---");
        productosPapelarte.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.name} - $${producto.price}`);
        });
        console.log("0. Terminar compra");

        opcion = prompt("Selecciona un número para añadir al carrito (0 para terminar)\nMira la lista en la consola.");

        if (opcion !== "0") {
            let indiceProducto = Number(opcion) - 1;

            if (indiceProducto >= 0 && indiceProducto < productosPapelarte.length) {
                let cantidad = Number(prompt(`¿Cuántas unidades de ${productosPapelarte[indiceProducto].name} deseas comprar?`));
                let producto = {
                    ...productosPapelarte[indiceProducto],
                    cantidad: cantidad
                };
                carrito.push(producto);
                alert(`Producto añadido al carrito: ${producto.name}`);
            } else {
                alert("Opción inválida. Inténtalo nuevamente.");
            }
        }
    }

    if (carrito.length > 0) {
        console.log("Resumen de tu compra:");
        console.table(carrito.map(producto => ({
            Nombre: producto.name,
            Cantidad: producto.cantidad,
            "Precio Unitario": producto.price,
            "Precio Total": producto.price * producto.cantidad
        })));

        let total = carrito.reduce((sum, producto) => sum + producto.price * producto.cantidad, 0);
        console.log(`Total de tu compra: $${total}`);
        alert(`Total de tu compra: $${total}`)
    } else {
        alert("No seleccionaste ningún producto.");
    }
}
comprarProductos();
