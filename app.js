// Array de productos - Remeras
const remeras = [
    { id: 1, nombre: "Remera Negra", precio: 2500, categoria: "remeras", imagen: "./imagenes/remeranegra.webp" },
    { id: 2, nombre: "Remera Blanca", precio: 2500, categoria: "remeras", imagen: "./imagenes/remerablanca2.webp" },
    { id: 3, nombre: "Remera Roja", precio: 2800, categoria: "remeras", imagen: "./imagenes/remeraroja.webp" },
    { id: 4, nombre: "Remera Azul", precio: 2800, categoria: "remeras", imagen: "./imagenes/remeraazul.webp" }
];

// Array de productos - Pantalones
const pantalones = [
    { id: 5, nombre: "Jean Azul", precio: 5000, categoria: "pantalones", imagen: "./imagenes/jeanazul.webp" },
    { id: 6, nombre: "Jean Negro", precio: 5000, categoria: "pantalones", imagen: "./imagenes/jeannegro.jpg" },
    { id: 7, nombre: "Cargo Gris", precio: 6000, categoria: "pantalones", imagen: "./imagenes/cargogris.jpg" },
    { id: 8, nombre: "Cargo Verde", precio: 4500, categoria: "pantalones", imagen: "./imagenes/cargoverde.jpg" }
];

// Unir todos los productos en un solo array
const todosLosProductos = [...remeras, ...pantalones];

// Carrito de compras (cargado desde localStorage o array vacío al inicio)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en localStorage
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Función para mostrar productos en la página
const mostrarProductos = (productos) => {
    const container = document.getElementById("productos-container");
    container.innerHTML = "";
    
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.className = "producto";
        
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Categoría: ${producto.categoria}</p>
            <p class='precio'>${producto.precio}</p>
            <button class='btn-agregar' onclick='agregarAlCarrito(${producto.id})'>Agregar al Carrito</button>
        `;
        
        container.appendChild(div);
    });
};

// Función para agregar productos al carrito
const agregarAlCarrito = (id) => {
    const producto = todosLosProductos.find((p) => p.id === id);
    
    const itemExistente = carrito.find((item) => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad = itemExistente.cantidad + 1;
    } else {
        const nuevoItem = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        };
        carrito.push(nuevoItem);
    }
    
    guardarCarrito();
    actualizarCarrito();
};

// Función para actualizar la vista del carrito
const actualizarCarrito = () => {
    const container = document.getElementById("items-carrito");
    let cantidadTotal = 0;
    let precioTotal = 0;
    
    container.innerHTML = "";
    
    if (carrito.length === 0) {
        container.innerHTML = "<p>El carrito está vacío</p>";
    } else {
        carrito.forEach((item) => {
            cantidadTotal = cantidadTotal + item.cantidad;
            precioTotal = precioTotal + (item.precio * item.cantidad);
            
            const div = document.createElement("div");
            div.className = "item-carrito";
            
            div.innerHTML = `
                <div class='item-carrito-info'>
                    <strong>${item.nombre}</strong>
                    <p>Precio: $${item.precio}</p>
                </div>
                <div class='controles-cantidad'>
                    <button class='btn-cantidad' onclick='cambiarCantidad(${item.id}, -1)'>-</button>
                    <span>Cantidad: ${item.cantidad}</span>
                    <button class='btn-cantidad' onclick='cambiarCantidad(${item.id}, 1)'>+</button>
                    <button class='btn-eliminar' onclick='eliminarDelCarrito(${item.id})'>Eliminar</button>
                </div>
            `;
            
            container.appendChild(div);
        });
    }
    
    document.getElementById("cantidad-carrito").textContent = cantidadTotal;
    document.getElementById("total-carrito").textContent = `Total: $${precioTotal}`;
};

// Función para cambiar la cantidad de un producto
const cambiarCantidad = (id, cambio) => {
    carrito.forEach((item) => {
        if (item.id === id) {
            item.cantidad = item.cantidad + cambio;
        }
    });
    
    carrito = carrito.filter((item) => item.cantidad > 0);
    
    guardarCarrito();
    actualizarCarrito();
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((item) => item.id !== id);
    guardarCarrito();
    actualizarCarrito();
};

// Función para filtrar productos
const filtrarProductos = () => {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const categoria = document.getElementById("filtro-categoria").value;
    
    let productosFiltrados = todosLosProductos;
    
    // Filtrar por categoría
    if (categoria !== "todos") {
        productosFiltrados = productosFiltrados.filter((producto) => {
            return producto.categoria === categoria;
        });
    }
    
    // Filtrar por texto de búsqueda
    if (texto !== "") {
        productosFiltrados = productosFiltrados.filter((producto) => {
            return producto.nombre.toLowerCase().includes(texto);
        });
    }
    
    mostrarProductos(productosFiltrados);
};

// Evento del buscador
document.getElementById("buscador").addEventListener("input", () => {
    filtrarProductos();
});

// Evento del filtro de categoría
document.getElementById("filtro-categoria").addEventListener("change", () => {
    filtrarProductos();
});

// Botón para ver el carrito
document.getElementById("btn-ver-carrito").addEventListener("click", () => {
    const carritoContainer = document.getElementById("carrito-container");
    
    if (carritoContainer.className === "oculto") {
        carritoContainer.className = "";
    } else {
        carritoContainer.className = "oculto";
    }
});

// Botón para cerrar el carrito
document.getElementById("btn-cerrar-carrito").addEventListener("click", () => {
    document.getElementById("carrito-container").className = "oculto";
});

// Botón para vaciar el carrito
document.getElementById("btn-vaciar").addEventListener("click", () => {
    const confirmar = confirm("¿Estás seguro de vaciar el carrito?");
    
    if (confirmar) {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    }
});

// Botón para realizar la compra
document.getElementById("btn-comprar").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
    } else {
        document.getElementById("mensaje-compra").className = "";
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        document.getElementById("carrito-container").className = "oculto";
    }
});

// Botón para cerrar el mensaje de compra
document.getElementById("btn-cerrar-mensaje").addEventListener("click", () => {
    document.getElementById("mensaje-compra").className = "oculto";
});

// Mostrar todos los productos al cargar la página
mostrarProductos(todosLosProductos);