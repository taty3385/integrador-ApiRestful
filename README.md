
# 📦 Gestión de Pedidos - Proyecto Fronted  Backend 

Aplicación web para gestionar pedidos de comida, con sistema de autenticación, creación y listado de pedidos.

---

## 📁 Estructura del Proyecto

```
.
├── backend/
│   ├── controllers/
│   ├── model/
│   ├── routes/
│   ├── data/
│   ├── app.ts 
│   │── middleware 
│   │── public 
│   │── dist/
├── README.md
└── package.json
```

---

## 🔧 Backend

### Tecnologías

- Node.js
- Express
- TypeScript
- Bcrypt
- JWT
- File System (para almacenar usuarios y pedidos en archivos JSON)

### Funcionalidades

- Registro e inicio de sesión con validación
- Generación de JWT con `jsonwebtoken`
- Rutas protegidas usando middleware de autenticación
- CRUD de pedidos (GET, POST, PUT, DELETE)
- Persistencia de datos en archivos JSON (`user.json`, `orders.json`)

### Rutas principales

| Método | Ruta              | Descripción                         |
|--------|-------------------|-------------------------------------|
| POST   | /api/login        | Inicio de sesión                    |
| POST   | /api/register     | Registro de usuario                 |
| GET    | /api/orders       | Obtener todos los pedidos (protegido) |
| POST   | /api/orders       | Crear pedido (protegido)            |
| PUT    | /api/orders/:id   | Editar pedido (protegido)           |
| DELETE | /api/orders/:id   | Eliminar pedido (protegido)         |

---

## 🌐 Frontend

### Tecnologías

- HTML5
- CSS3
- JavaScript 

### Funcionalidades

- Login y registro de usuarios
- Almacenamiento del JWT en localStorage
- Creación de pedidos con selección de comidas y extras
- Listado de pedidos con tabla, botones de editar y eliminar
- Estilos con fondo visual atractivo
- Filtros por nombre de comida
- Formularios dinámicos: agregar y quitar comidas extras
- Modal de confirmación al crear pedidos
- Diseño responsive y con buena experiencia de usuario

---

## ✅ Cómo ejecutar

### 1. Clonar el repositorio

```bash
git clone https://github.com/taty3385/integrador-ApiRestful

```

### 2. Backend

```bash
cd backend
npm install
ts-node app.ts
```

### 3. Frontend

Abrí el archivo `public/index.html` directamente en el navegador o servilo con alguna herramienta local como Live Server de VS Code.

---

## 🔐 Notas sobre seguridad

- La `SECRET_KEY` del backend se define por variable de entorno o se puede dejar fija en el código.
- El token JWT se guarda en localStorage y se envía en cada request protegida.
- Las rutas sensibles están protegidas con middleware de autenticación.

---

## 🧪 Pruebas con Postman

Se realizaron pruebas de las rutas del backend utilizando Postman para verificar:

- Registro e inicio de sesión de usuarios
- Validación de tokens JWT en endpoints protegidos
- Creación, edición y eliminación de pedidos

Estas pruebas aseguran que los endpoints funcionan correctamente y que las respuestas del servidor son consistentes con los datos enviados.

## 🧠 Autor

- **Nombre:** Tamara Zarate
- **Stack:** JavaScript, TypeScript, Node.js, HTML, CSS
- **Proyecto académico/Práctico  Backend**
