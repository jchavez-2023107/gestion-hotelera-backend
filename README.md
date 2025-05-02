# Gestión Hotelera Back‑End

## Descripción
Aplicación web MERN para gestionar hoteles, habitaciones, eventos y reservas de forma integral:

- **Gestión de hoteles**: CRUD de hoteles con detalles (ubicación, categoría, comodidades).
- **Gestión de habitaciones**: inventario y disponibilidad en tiempo real.
- **Gestión de eventos**: programación, edición y cancelación en cada hotel.
- **Reservas y usuarios**: registro/login, flujo de reserva y historial.
- **Reportes**: estadísticas de ocupación y facturación.

## Tecnologías
- **Backend:** Node.js, Express
- **Base de datos:** MongoDB (Mongoose)
- **Autenticación:** JWT, Argon2
- **Control de versiones:** Git / GitHub

## Estructura de carpetas
Se organiza por funcionalidad para facilitar escalabilidad y mantenibilidad:

```
gestion-hotelera-backend/
├── src/
│   ├── config/            # Conexión DB y variables de entorno
│   │   └── db.js
│   ├── hotels/            # Módulo Hoteles
│   │   ├── hotel.model.js
│   │   ├── hotel.routes.js
│   │   ├── hotel.controller.js
│   │   └── hotel.service.js
│   ├── rooms/             # Módulo Habitaciones
│   │   ├── room.model.js
│   │   ├── room.routes.js
│   │   ├── room.controller.js
│   │   └── room.service.js
│   ├── events/            # Módulo Eventos
│   │   ├── event.model.js
│   │   ├── event.routes.js
│   │   ├── event.controller.js
│   │   └── event.service.js
│   ├── reservations/      # Módulo Reservas
│   │   ├── reservation.model.js
│   │   ├── reservation.routes.js
│   │   ├── reservation.controller.js
│   │   └── reservation.service.js
│   ├── users/             # Módulo Usuarios/Auth
│   │   ├── user.model.js
│   │   ├── auth.routes.js
│   │   ├── auth.controller.js
│   │   └── auth.service.js
│   └── reports/           # Módulo Reportes
│       ├── report.routes.js
│       ├── report.controller.js
│       └── report.service.js
│   └── index.js           # Punto de entrada (Express)
├── .env                   # Variables de entorno
├── .gitignore
└── package.json
```

## Primeros pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jchavez-2023107/gestion-hotelera-backend.git
   cd gestion-hotelera-backend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Definir variables en `.env`:
   ```ini
   MONGO_URI=<tu_uri_mongodb>
   JWT_SECRET=<secreto>
   ```
4. Iniciar servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

¡Listo! El servidor arrancará en `http://localhost:5000`. Ahora puedes comenzar a implementar cada módulo según la estructura definida.

