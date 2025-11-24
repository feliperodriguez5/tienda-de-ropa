// Variable para almacenar todos los productos
let todosLosProductos = [];

// Función para cargar productos desde el JSON
const cargarProductos = async () => {
    try {
        const respuesta = await fetch('./productos.json');
        if (!respuesta.ok) {
            throw new Error('Error al cargar el archivo de productos');
        }
        const datos = await respuesta.json();
        
        // Combinar remeras y pantalones en un solo array
        todosLosProductos = [...datos.remeras, ...datos.pantalones];
        
        // Mostrar los productos después de cargar
        mostrarProductos(todosLosProductos);
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos',
            timer: 3000,
            showConfirmButton: false
        });
    }
};

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
    
    // Mostrar alerta de SweetAlert
    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `${producto.nombre} fue añadido al carrito`,
        timer: 2000,
        showConfirmButton: false
    });
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
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: '¿Estás seguro de que deseas vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            guardarCarrito();
            actualizarCarrito();
            
            Swal.fire({
                icon: 'success',
                title: '¡Carrito vaciado!',
                text: 'Tu carrito ha sido vaciado correctamente',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
});

// Botón para realizar la compra
document.getElementById("btn-comprar").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
            text: 'No hay productos en tu carrito para realizar la compra',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        // Mostrar formulario de compra
        document.getElementById("formulario-compra").className = "";
        document.getElementById("carrito-container").className = "oculto";
    }
});

// Botón para cerrar el mensaje de compra
document.getElementById("btn-cerrar-mensaje").addEventListener("click", () => {
    document.getElementById("mensaje-compra").className = "oculto";
});

// Formulario de envío - Cancelar
document.getElementById("btn-cancelar-compra").addEventListener("click", () => {
    document.getElementById("formulario-compra").className = "oculto";
    document.getElementById("carrito-container").className = "";
});

// Formulario de envío - Confirmar compra
document.getElementById("form-datos-envio").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nombreCompleto = document.getElementById("nombre-completo").value.trim();
    const direccionEnvio = document.getElementById("direccion-envio").value.trim();
    
    if (nombreCompleto === "" || direccionEnvio === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor completa todos los campos',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    
    // Mostrar alerta de éxito con los datos
    Swal.fire({
        icon: 'success',
        title: '¡Compra realizada con éxito!',
        html: `
            <p>¡Gracias por tu compra, ${nombreCompleto}!</p>
            <p>Tu pedido se le estará enviando a la brevedad a:</p>
            <p><strong>${direccionEnvio}</strong></p>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">Recibirás un email de confirmación pronto.</p>
        `,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Limpiar carrito y formulario
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        
        // Limpiar campos del formulario
        document.getElementById("form-datos-envio").reset();
        
        // Ocultar formulario
        document.getElementById("formulario-compra").className = "oculto";
    });
});

// Cargar productos al cargar la página
cargarProductos();