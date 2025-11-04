# JOZ-Api

## Descripción
JOZ-Api es una API RESTful construida con Node.js, Express y TypeScript. Este proyecto está diseñado para manejar operaciones relacionadas con usuarios, incluyendo la creación, recuperación y actualización de datos de usuario.

## Estructura del Proyecto
El proyecto sigue una arquitectura modular, organizando el código en diferentes carpetas según su funcionalidad:

- **src/**: Contiene el código fuente de la aplicación.
  - **app.ts**: Punto de entrada de la aplicación.
  - **server.ts**: Inicia el servidor y configura la conexión.
  - **controllers/**: Controladores que manejan la lógica de las rutas.
  - **routes/**: Definición de las rutas de la API.
  - **services/**: Lógica de negocio relacionada con los usuarios.
  - **models/**: Modelos que definen la estructura de los datos.
  - **repositories/**: Interacción con la base de datos.
  - **middleware/**: Middleware para manejo de errores.
  - **config/**: Configuraciones de la aplicación.
  - **utils/**: Funciones utilitarias, como el registro de logs.
  - **dtos/**: Clases para la transferencia de datos.
  - **types/**: Definición de tipos personalizados.

- **tests/**: Contiene pruebas unitarias para asegurar la funcionalidad del código.

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd JOZ-Api
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso
Para iniciar la aplicación, ejecuta el siguiente comando:
```
npm start
```
La API estará disponible en `http://localhost:3000` (o el puerto configurado en las variables de entorno).

## Pruebas
Para ejecutar las pruebas, utiliza el siguiente comando:
```
npm test
```

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.