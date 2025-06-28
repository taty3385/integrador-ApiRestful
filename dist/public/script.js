const API_URL =
  window.location.port === "5500"
    ? "http://localhost:3000/api"
    : "/api";

console.log("Usando API_URL:", API_URL);



let editingId = null; // Si es null, crea. Si tiene ID, edita.

document.getElementById("pedidoForm").addEventListener("submit", function (e) {
  e.preventDefault();
});

function manejarTokenExpirado(response) {
  if (response.status === 403 || response.status === 401) {
    mostrarModal("Sesión expirada. Volvé a iniciar sesión.");
    localStorage.removeItem("token");
    document.getElementById("pedidos-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    return true;
  }
  return false;
}

// Registrar usuario
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const contraseña = document.getElementById("contraseña").value;

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, contraseña }),
      });

      const data = await response.json();
      alert(data.message || "Usuario registrado");
    } catch (err) {
      console.error("Error registrando:", err);
    }
  });

// Login de usuario
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("login-nombre").value;
  const contraseña = document.getElementById("login-contraseña").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, contraseña }),
    });

    const data = await response.json();

    if (response.ok) {
      mostrarModal("Login exitoso");
      localStorage.setItem("token", data.token);
      document.getElementById("pedidos-section").style.display = "block";
      document.querySelector(".login-section").style.display = "none";
      document.getElementById("cerrarSesionContainer").style.display = "block";
    } else {
      mostrarModal(data.message || "Error en login");
    }
  } catch (err) {
    console.error("Error en login:", err);
  }
});

// Alternar entre Registro y Login
document.getElementById("irALogin").addEventListener("click", () => {
  document.getElementById("registro-formulario").style.display = "none";
  document.getElementById("login-formulario").style.display = "block";
});

document.getElementById("irARegistro").addEventListener("click", () => {
  document.getElementById("login-formulario").style.display = "none";
  document.getElementById("registro-formulario").style.display = "block";
});

// Crear pedido
document
  .getElementById("crearPedidoButton")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("pedido").value;
    const descripcion = document.getElementById("descripcion").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);


    const token = localStorage.getItem("token");

    const url = editingId
      ? `${API_URL}/orders/${editingId}`
      : `${API_URL}/orders`;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion ,cantidad }),
      });

      if (manejarTokenExpirado(response)) return;

      const data = await response.json();
      if (response.ok) {
        editingId = null;

        const submitBtn = document.getElementById("crearPedidoButton");
        submitBtn.textContent = "Crear Pedido";
        submitBtn.classList.remove("editando");
        mostrarModal(data.message || "Pedido guardado exitosamente");
        fetchOrders(); // Recargar lista de pedidos

        fetchOrders();

        document.getElementById("pedido").value = "";
        document.getElementById("descripcion").value = "";

        document.getElementById("pedidosList").style.display = "block";
      } else {
        alert(data.message || "Error en la operación");
      }
    } catch (err) {
      console.error("Error al guardar pedido:", err);
    }
  });

// Obtener pedidos

async function fetchOrders() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (manejarTokenExpirado(response)) return;
    const data = await response.json();
    console.log("Pedidos obtenidos:", data);

    if (response.ok) {
      const pedidosList = document.getElementById("pedidosList");
      pedidosList.style.display = "block";
      pedidosList.innerHTML = "";

      if (!data.orders || data.orders.length === 0) {
        pedidosList.innerHTML = "<p>No hay pedidos registrados.</p>";
        return;
      }

      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.marginTop = "20px";

      // Encabezado
      const headerRow = document.createElement("tr");
      ["Pedido", "Nombre", "Descripción", "Cantidad", "Acciones"].forEach((titulo) => {
        const th = document.createElement("th");
        th.textContent = titulo;
        th.style.border = "1px solid #ccc";
        th.style.padding = "10px";
        th.style.backgroundColor = "#f0f0f0";
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Filas de pedidos
      data.orders.forEach((pedido, index) => {
        console.log("Pedido individual:", pedido);
        const row = document.createElement("tr");

        const tdIndex = document.createElement("td");
        tdIndex.textContent = index + 1;
        tdIndex.style.border = "1px solid #ccc";
        tdIndex.style.padding = "10px";

        const tdNombre = document.createElement("td");
        tdNombre.textContent = pedido.nombre;
        tdNombre.style.border = "1px solid #ccc";
        tdNombre.style.padding = "10px";

        
        const tdDescripcion = document.createElement("td");
        tdDescripcion.textContent = pedido.descripcion;
        tdDescripcion.style.border = "1px solid #ccc";
        tdDescripcion.style.padding = "10px";

        // Agregar columna de Cantidad
        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = pedido.cantidad;
        tdCantidad.style.border = "1px solid #ccc";
        tdCantidad.style.padding = "10px";

        const tdAcciones = document.createElement("td");
        tdAcciones.style.border = "1px solid #ccc";
        tdAcciones.style.padding = "10px";
        tdAcciones.style.textAlign = "center";

      
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.style.backgroundColor = "orange";
        btnEditar.style.marginRight = "10px";
        btnEditar.addEventListener("click", () => {
          editarPedido(pedido);
        });

        // Botón Eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          mostrarModalEliminar(pedido);
        });

        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);

        row.appendChild(tdIndex);
        row.appendChild(tdNombre);
        row.appendChild(tdDescripcion);
        row.appendChild(tdCantidad); 
        row.appendChild(tdAcciones);

        table.appendChild(row);
      });

      pedidosList.appendChild(table);
    } else {
      alert(data.message || "Error al obtener pedidos");
    }
  } catch (err) {
    console.error("Error obteniendo pedidos:", err);
  }
}

document.getElementById("listPedidosButton").addEventListener("click", () => {
  const pedidosList = document.getElementById("pedidosList");
  pedidosList.style.display = "block";
  fetchOrders();
});

// Buscar pedidos
document
  .getElementById("buscarPedidoButton")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const termino = document.getElementById("buscarPedido").value.toLowerCase();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data.orders) return;

      const pedidosFiltrados = data.orders.filter((pedido) => {
        return (
          pedido.nombre.toLowerCase().includes(termino) ||
          pedido.descripcion.toLowerCase().includes(termino)
        );
      });

      renderPedidos(pedidosFiltrados);
    } catch (err) {
      console.error("Error en la búsqueda:", err);
    }
  });

function renderPedidos(pedidos) {
  const pedidosList = document.getElementById("pedidosList");
  pedidosList.style.display = "block";
  pedidosList.innerHTML = "";

  if (pedidos.length === 0) {
    pedidosList.innerHTML = "<p>No se encontraron pedidos.</p>";
    return;
  }

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "20px";

  // Encabezado de tabla
  const headerRow = document.createElement("tr");
  ["Nombre", "Descripción"].forEach((titulo) => {
    const th = document.createElement("th");
    th.textContent = titulo;
    th.style.border = "1px solid #ccc";
    th.style.padding = "10px";
    th.style.backgroundColor = "#f0f0f0";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Filas de datos
  pedidos.forEach((pedido) => {
    const row = document.createElement("tr");

    const tdNombre = document.createElement("td");
    tdNombre.textContent = pedido.nombre;
    tdNombre.style.border = "1px solid #ccc";
    tdNombre.style.padding = "10px";

    const tdDescripcion = document.createElement("td");
    tdDescripcion.textContent = pedido.descripcion;
    tdDescripcion.style.border = "1px solid #ccc";
    tdDescripcion.style.padding = "10px";

    row.appendChild(tdNombre);
    row.appendChild(tdDescripcion);
    table.appendChild(row);
  });

  pedidosList.appendChild(table);
}

// Editar pedido
function editarPedido(pedido) {
  document.getElementById("pedido").value = pedido.nombre;
  document.getElementById("descripcion").value = pedido.descripcion;
  editingId = pedido.id;
  const submitBtn = document.querySelector("#crearPedidoButton");
  submitBtn.textContent = "Actualizar Pedido";
  submitBtn.classList.add("editando");
  document.getElementById("pedidosList").style.display = "block";
}

// Eliminar pedido
let pedidoAEliminar = null;

function mostrarModalEliminar(pedido) {
  pedidoAEliminar = pedido;
  document.getElementById(
    "mensaje-modal"
  ).textContent = `¿Deseás eliminar el pedido "${pedido.nombre}"?`;
  document.getElementById("modalEliminar").style.display = "block";
}

// Botones del modal
document.getElementById("cancelarEliminar").addEventListener("click", () => {
  pedidoAEliminar = null;
  document.getElementById("modalEliminar").style.display = "none";
});

document
  .getElementById("confirmarEliminar")
  .addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    if (!pedidoAEliminar) return;

    try {
      const response = await fetch(`${API_URL}/orders/${pedidoAEliminar.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (manejarTokenExpirado(response)) return;

      const data = await response.json();
      mostrarModal(data.message || "Pedido eliminado");

      document.getElementById("modalEliminar").style.display = "none";
      fetchOrders();
    } catch (err) {
      console.error("Error eliminando pedido:", err);
    }

    pedidoAEliminar = null;
  });

function mostrarModal(mensaje = "Operación exitosa") {
  const modal = document.getElementById("modalExito");
  const texto = document.getElementById("mensaje-exito");
  texto.textContent = mensaje;
  modal.style.display = "block";

  const cerrarBtn = document.getElementById("cerrarExito");
  cerrarBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Evitar acumulación de eventos
  const nuevoBtn = cerrarBtn.cloneNode(true);
  cerrarBtn.parentNode.replaceChild(nuevoBtn, cerrarBtn);

  nuevoBtn.addEventListener("click", () => {
    modal.style.display = "none";
    if (typeof callback === "function") {
      callback();
    }
  });
}

// Si hay token guardado, mostrar directamente la sección de pedidos
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    document.getElementById("pedidos-section").style.display = "none";
    document.querySelector(".login-section").style.display = "block";
    document.getElementById("cerrarSesionContainer").style.display = "none";
  } else {
    document.getElementById("pedidos-section").style.display = "block";
    document.querySelector(".login-section").style.display = "none";
    document.getElementById("cerrarSesionContainer").style.display = "block";
    fetchOrders();
  }
});
// Cerrar sesión
document.getElementById("cerrarSesionBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  document.getElementById("pedidos-section").style.display = "none";
  document.querySelector(".login-section").style.display = "block";
  document.getElementById("cerrarSesionContainer").style.display = "none";
  mostrarModal("Sesión cerrada correctamente");
});
// Cerrar modal de éxito al hacer clic fuera de él
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modalExito");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
