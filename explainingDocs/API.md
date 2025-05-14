# Documentación de la API

Base URL: `http://localhost:5000/api`

---

## 1. Autenticación (`/auth`)

### 1.1 POST /auth/register

- **Descripción:** Registra un nuevo usuario.
- **Body:**
  | Campo    | Tipo   | Descripción                  |
  |----------|--------|------------------------------|
  | name     | String | Nombre completo del usuario. |
  | email    | String | Correo electrónico único.    |
  | password | String | Contraseña (mín. 6 caracteres). |
- **Respuesta (201):**
  ```json
  { "token": "...", "user": { /* datos */ } }
  ```

### 1.2 POST /auth/login

- **Descripción:** Autentica un usuario existente.
- **Body:** `email`, `password` (ambos String).
- **Respuesta (200):**
  ```json
  { "token": "...", "user": { /* datos */ } }
  ```

---

## 2. Hoteles (`/hotels`)

### 2.1 GET /hotels

- **Descripción:** Lista todos los hoteles.
- **Autorización:** Bearer Token.
- **Query params (opcional):** `city`, `rating`.
- **Respuesta (200):** Array de objetos Hotel.

### 2.2 GET /hotels/:id

- **Descripción:** Obtiene detalles de un hotel.
- **Autorización:** Bearer Token.
- **Parámetros URL:** `id` (ID del hotel).
- **Respuesta (200):** Objeto Hotel.

### 2.3 POST /hotels

- **Descripción:** Crea un nuevo hotel.
- **Autorización:** Solo rol `admin`.
- **Body:**
  | Campo       | Tipo    | Descripción                           |
  |-------------|---------|---------------------------------------|
  | name        | String  | Nombre del hotel.                     |
  | location    | String  | Dirección o ciudad.                   |
  | category    | String  | Categoría (ej. 5 estrellas).          |
  | amenities   | [String]| Lista de comodidades (WiFi, Spa…).     |
- **Respuesta (201):** Objeto Hotel creado.

### 2.4 PUT /hotels/:id

- **Descripción:** Actualiza un hotel existente.
- **Autorización:** Solo `admin`.
- **Body:** Campos editables (mismos que creación).
- **Respuesta (200):** Objeto Hotel actualizado.

### 2.5 DELETE /hotels/:id

- **Descripción:** Elimina un hotel.
- **Autorización:** Solo `admin`.
- **Respuesta (204):** Sin contenido.

---

## 3. Habitaciones (`/rooms`)

### 3.1 GET /rooms

- **Descripción:** Lista todas las habitaciones o filtra por `hotelId`.
- **Query params:** `hotelId`, `available` (Boolean).
- **Respuesta (200):** Array de objetos Room.

### 3.2 GET /rooms/:id

- **Descripción:** Detalles de una habitación.
- **Respuesta (200):** Objeto Room.

### 3.3 POST /rooms

- **Descripción:** Crea una nueva habitación.
- **Autorización:** Solo `admin`.
- **Body:**
  | Campo    | Tipo   | Descripción               |
  |----------|--------|---------------------------|
  | hotelId  | String | ID del hotel.             |
  | number   | String | Número o código de la habitación. |
  | type     | String | Tipo (single, double…).   |
  | price    | Number | Precio por noche.         |
- **Respuesta (201):** Objeto Room creado.

### 3.4 PUT /rooms/:id

- **Descripción:** Actualiza datos de una habitación.
- **Autorización:** Solo `admin`.

### 3.5 DELETE /rooms/:id

- **Descripción:** Elimina una habitación.
- **Autorización:** Solo `admin`.

---

## 4. Eventos (`/events`)

### 4.1 GET /events

- **Descripción:** Lista todos los eventos o filtra por `hotelId`, `date`.
- **Query params:** `hotelId`, `date`.
- **Respuesta (200):** Array de objetos Event.

### 4.2 POST /events

- **Descripción:** Crea un evento en un hotel.
- **Autorización:** Solo `admin`.
- **Body:**
  | Campo   | Tipo   | Descripción                        |
  |---------|--------|------------------------------------|
  | hotelId | String | ID del hotel.                      |
  | title   | String | Nombre del evento.                 |
  | date    | Date   | Fecha y hora.                      |
  | details | String | Descripción opcional.              |
- **Respuesta (201):** Objeto Event creado.

### 4.3 PUT /events/:id

- **Descripción:** Edita un evento.
- **Autorización:** Solo `admin`.

### 4.4 DELETE /events/:id

- **Descripción:** Elimina un evento.
- **Autorización:** Solo `admin`.

---

## 5. Reservas (`/reservations`)

### 5.1 GET /reservations

- **Descripción:** Lista todas las reservas del usuario autenticado.
- **Autorización:** Bearer Token.
- **Respuesta (200):** Array de objetos Reservation.

### 5.2 POST /reservations

- **Descripción:** Crea una nueva reserva.
- **Body:**
  | Campo    | Tipo    | Descripción                    |
  |----------|---------|--------------------------------|
  | userId   | String  | ID del usuario (token).        |
  | roomId   | String  | ID de la habitación.           |
  | checkIn  | Date    | Fecha de entrada.              |
  | checkOut | Date    | Fecha de salida.               |
- **Respuesta (201):** Objeto Reservation.

### 5.3 DELETE /reservations/:id

- **Descripción:** Cancela una reserva.
- **Autorización:** Solo el usuario dueño o `admin`.

---

> **Nota:** Asegúrate de incluir cabecera `Authorization: Bearer <token>` en todos los endpoints protegidos.
