# Manual de Usuario

Este manual te guiará en los pasos básicos para instalar, configurar y probar la API de Gestión Hotelera.

## 1. Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jchavez-2023107/gestion-hotelera-backend.git
   cd gestion-hotelera-backend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```

## 2. Configuración

1. Crea un archivo `.env` en la raíz con estas variables:
   ```
   MONGO_URI=<tu_uri_mongodb>
   JWT_SECRET=<secreto_para_JWT>
   PORT=5000
   ```
2. Asegúrate de que MongoDB esté en ejecución.

## 3. Ejecución

- **Desarrollo**:
  ```bash
  npm run dev
  ```
- **Producción**:
  ```bash
  npm start
  ```
La API queda disponible en `http://localhost:5000/api`.

## 4. Uso Básico

Puedes usar Postman, Insomnia o `curl`. Ejemplos:

### 4.1 Registro de Usuario

- **Ruta:** `POST /api/auth/register`
- **Body (JSON):**
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "tu_contraseña"
  }
  ```
- **Respuesta (201 Created):**
  ```json
  {
    "token": "eyJhbGciOi…",
    "user": {
      "_id": "642a…",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "role": "user"
    }
  }
  ```

### 4.2 Inicio de Sesión

- **Ruta:** `POST /api/auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "juan@example.com",
    "password": "tu_contraseña"
  }
  ```
- **Respuesta (200 OK):**
  ```json
  {
    "token": "eyJhbGciOi…",
    "user": { /* datos del usuario */ }
  }
  ```

### 4.3 Probando un Endpoint Protegido

Por ejemplo, obtener el listado de hoteles (requiere token JWT en cabecera `Authorization: Bearer <token>`):

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/hotels
```
