const API_URL = "http://localhost:3000/api"; // Ajustá el puerto si es 4000

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
document.getElementById("loginButton").addEventListener("click", async () => {
  const nombre = document.getElementById("nombre").value;
  const contraseña = document.getElementById("contraseña").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, contraseña }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login exitoso");

      // Guardar token en localStorage
      localStorage.setItem("token", data.token);

      // Mostrar la sección de pedidos
      document.getElementById("pedidos-section").style.display = "block";
      document.querySelector(".login-section").style.display = "none";
    } else {
      alert(data.message || "Error en login");
    }
  } catch (err) {
    console.error("Error en login:", err);
  }
});

// Crear pedido
document.getElementById("pedidoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const pedido = document.getElementById("pedido").value;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // token obligatorio
      },
      body: JSON.stringify({ pedido }),
    });

    const data = await response.json();
    alert(data.message || "Pedido creado");
  } catch (err) {
    console.error("Error creando pedido:", err);
  }
});
// Obtener pedidos
async function fetchOrders() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // token obligatorio
            },
        });

        const data = await response.json();
        console.log("Pedidos obtenidos:", data);
        

        if (response.ok) {
            // Mostrar la lista de pedidos
            const pedidosList = document.getElementById("pedidosList");
            pedidosList.innerHTML = ""; // Limpiar lista anterior

            data.orders.forEach((pedido) => {
                const div = document.createElement("div");
                div.textContent = pedido.nombre;
                pedidosList.appendChild(div);
            });
        } else {
            alert(data.message || "Error al obtener pedidos");
        }
    } catch (err) {
        console.error("Error obteniendo pedidos:", err);
    }
}
document.getElementById("listPedidosButton").addEventListener("click", fetchOrders);
