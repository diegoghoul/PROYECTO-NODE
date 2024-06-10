```markdown
# Movies API

## Descripción

Movies API es un proyecto construido con Node.js que permite gestionar una base de datos de películas. Ofrece funcionalidades CRUD (Crear, Leer, Actualizar y Eliminar) para películas, incluyendo la capacidad de valorarlas. La API puede utilizar una base de datos MySQL o un archivo JSON local para el almacenamiento de datos.

## Características

- Crear nuevas películas.
- Leer detalles de películas existentes.
- Actualizar información de películas.
- Eliminar películas.
- Valorar películas.

## Requisitos

- Node.js (v18.x o superior)
- npm (v9.x o superior)
- MySQL (si se utiliza la opción de base de datos)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/diegoghoul/PROYECTO-NODE.git
   cd PROOYECTO_NODE
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

### Base de Datos

Si deseas usar una base de datos MySQL, asegúrate de configurar tus credenciales de base de datos en `models/mysql/movie.js`:
```javascript
const config = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: 3306,
  database: 'Movies_DataBase'
}
```

### Comandos de Inicio

Para iniciar el servidor, puedes usar los siguientes comandos:

- Para iniciar el servidor con MySQL:
  ```bash
  npm run start:mysql
  ```

- Para iniciar el servidor con un archivo JSON local:
  ```bash
  npm run start:local
  ```

## Uso

### Endpoints

Los endpoints para las operaciones CRUD están documentados en el archivo `app.http`. Puedes usar la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de Visual Studio Code para probar los endpoints.


## Contribución

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request con tus mejoras o correcciones.


## Contacto

Para cualquier consulta o sugerencia, por favor contacta a (diego23ghoul@gmail.com).

```
