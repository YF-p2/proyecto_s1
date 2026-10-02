Generamos el proyecto dentro de docker por aislamiento y no generar dependencia
En local con PHP y Composer.

***

###descarga img de Composer, monta carpeta en contenedor
docker run --rm -v ${PWD}:/app composer create-project codeigniter4/appstarter temp-ci4


APP/: escribiremos el código -> controllers, models, migrations etc
PUBLIC/: contiene el index.html y otros archivos estáticos -> css, js etc
WRITABLE/: almacena logs, caché y subidas de archivo (si tiene permiso  de escritura)
VENDOR/:  tiene las dependencias instaladas por Composer. Almacena libreria, paquetes, dependencias etc -> composer modifica esta carpeta, NO TOCAR manualmente
.env/: plantilla de variables de entorno default,


***
PUNTO 4 (crear Dockerfile para PHP y CodeIgniter)

###descaga img php
-> version 'FPM' (FastCFI Process Manager)-> ejecuta PHP muy rapido
FROM php:8.2-fpm

###instala herramientas de Debian necesarias para el funcionamiento de PHP.
LIBICU-DEV Y INTL: manejo idioma y fechas
Son las dependencias mínimas exigibles por CodeIgnite

RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/* ###elimina los paquetes instalados por debian/ubuntu -> reduccion tamaño en la img

###En el comando se inlcuye en img de php en docker para compilar e instalar extensiones PHP de forma automatica
INTL: necesario para CodeIgniter, sino peta
MYSQL y asi: para conectarse a las BD de MySQL y MariaDB
PDO: interfaz ligera para acceder a la BD


FROM php:8.2-fpm

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Extensiones PHP necesarias para CodeIgniter + MariaDB
RUN docker-php-ext-install \
    intl \
    pdo \
    pdo_mysql \
    mysqli \
    zip

# Instalar Composer desde la imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html


***

PUNTO 5: config docker-compose.yml

app: contenedor para PHP-FPM (CONSTRUIDO EN EL DOCKERFILE)
web: servidor nginx que recibe trafico y dirige a public
db: la bd

Vamos a hacer la config de Nginx:
-> docker/nginx/default.conf

Tras crear el archivo '.yml' debemos dar permiso de escritura:
docker compose exec app chmod -R 777 writable

***

PUNTO 6: enlazar CodeIgnite a la BD

modificamos el archivo .env descomentnado ciertos apartados:

CI_ENVIRONMENT = development

database.default.hostname = db
database.default.database = ci4_db
database.default.username = dani
database.default.password = ci4pass
database.default.DBDriver = MySQLi
database.default.port = 3306

Luego ejecutamos en la consola el comando para levantar el entorno:
docker compose up -d --build


***

PUNTO 7: crear migración y seeder

docker compose exec app composer install

Para crear el archivo de migración:
docker compose exec app php spark make:migration CreateClientsTable


Una vez instalado composer ejecutamos los siguientes comandos para la MIGRACION: -> sincronizacion, crear tabalas
------------------
docker compose exec app php spark #para actualizar la BD

#definimos tabla
docker compose exec app php spark make:migration CreateClientsTable 

#crea la tabla en la BD
docker compose exec app php spark migrate


Para el SEEDER:
-------------------
#DEFINE qué DATOS de prueba se van a insertar
docker compose exec app php spark make:seeder ClientsSeeder

#INSERTA los registros
docker compose exec app php spark db:seed ClientsSeeder


***

PUNTO 8: ruta comprobación /api/health -> verificar funcionamiento del back

#crear el controlador Healt:
docker compose exec app php spark make:controller Health

vamos a -> app/Controllers/Health.php y 
--------
<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;

class Health extends BaseController
{
    public function index(): ResponseInterface
    {
        return $this->response->setJSON([
            'status' => 'ok'
        ]);
    }
}
--------

vamos a -> app/Config/Routes.php y añadimos
--------
$routes->get('api/health', 'Health::index');
--------

Comprobamos conexion: curl.exe http://localhost:8080/api/health


===================================
SEMANA 2
===================================

***
PUNTO 1: DISEÑO MIGRACION Y RELACIONES:

Debemos crear los archivos que definen las tablas y luego introducirle los campos manualmente.

Utilizamos el comando para crear las tablas:
docker compose exec app php spark make:migration <nombre tabla> (Cliente)

Luego se introducen los campos, y una vez terminado ejecutamos:
docker compose exec app php spark migrate


2026/09/30
--------------------------------
***
PUNTO 2: CREAR MODELS Y CONTROLLERS

Creamos los modelos con:
docker compose exec app php spark make:model Cliente

--- El nombre del modelo creado debe coincidor con el nombre puesto en el comnado de la migracion ---

Para crear los controllers:
docker compose exec app php spark make:controller Clientes

--- El nombre del controller debe coincidir con el nombre de la tabla creada (se encuentra al final de la migration correspondiente) --- 

Una vez creados los modelos, debemos añadir los "campos minimos" (pdf tabla) en la variable "$allowedFields". No hace falta añadir los valores autoincrementales (id)

Si hay campo 'created/updated_at' ponermos "$useTimeStamps" a TRUE.


***
PUNTO 3: CREACION DE SEEDERS

Una vez que ya tenemos las migraciones hechas, procedemos a crear los SEEDERS
---datos medio randoms para rellenar tabla---

Los datos se obtienen con la librería FAKER

docker compose exec app php spark db:seed ClienteSeeder

----
Otros comandos que se usaron por errores de typo/escribir mal o no escribir alguna linea:

# Intento inicial de refrescar todas las migraciones (detectó el fallo de rollback a medio camino)
docker compose exec app php spark migrate:refresh

# Forzar la reversión completa de los lotes ejecutados
docker compose exec app php spark migrate:rollback --all

# Volver a ejecutar las migraciones desde cero tras corregir el código en down() y up()
docker compose exec app php spark migrate


Comprobación de que las tablas de la BD tienen datos:
docker compose exec app php spark db:table clientes 


***
PUNTO 4: IMPLEMENTAR CRUD REST

Como estamos creando una API, en los controladores utilizaremos 'response' y settearemos los datos en un JSON con 'setJSON'. En este caso también incluimos un 'setStatusCode()' para indicar el code de error


TABLA QUE RELACIONA LOS ENDPOINTS y SUS METODOS -> deben tener esos nombres para que funcione el enrutamiento de Router

| Verbo HTTP | Endpoint (Ejemplo) | Método del Controlador | Propósito |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/clientes` | `index()` | Listar todos los clientes |
| **GET** | `/api/clientes/{id}` | `show($id)` | Mostrar un cliente por su ID |
| **POST** | `/api/clientes` | `create()` | Crear un nuevo cliente |
| **PUT / PATCH** | `/api/clientes/{id}` | `update($id)` | Modificar un cliente existente |
| **DELETE** | `/api/clientes/{id}` | `delete($id)` | Borrar un cliente por su ID |




2026/10/01
--------------------------------
Comprobacion de controllers usando terminal:

curl.exe -i -X GET http://localhost:8080/api/clientes
curl.exe -i -X GET http://localhost:8080/api/clientes/1
(explicacion en pto 3 de problemas)
$body = @{
        nombre = "Cliente Terminal"
        cif = "A12345678"
        email = "terminal@test.com"
        telefono = "600123456"
        estado = "activo"
    } | ConvertTo-Json -Compress

Invoke-RestMethod -Uri "http://localhost:8080/api/clientes" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

curl.exe -i -X DELETE http://localhost:8080/api/clientes/6


***
Punto 7: Gestionar recursos inexistentes y errores.

Se añade una nueva ruta en Routes con el metodo 'set404Override' para gestionar las url que no coincidan, redirigiendolas al método notFound del controller 'Errors'


***
Punto 8: PAGINACION

Se crea un 'trait' para la reutilizacion de codigo en los distintos controllers.



PROBLEMAS:
 ** setJSON no actualizaba bien los datos por usar variable errónea. Se hace una segunda consulta/búsqueda y se pasa la nueva variable.

 ** Error 404 al entrar en api/clientes. Culpa de hacer rename de la class y del controller. 
    Limpiamos caché, regeneramos mapa de clases en composer y comprobamos rutas con:
        docker compose exec app php spark cache:clear
        docker compose exec app composer dump-autoload
        docker compose exec app php spark routes

**Error en create al hacer parse Json to string -> mirando los logs -> 
    CodeIgniter\HTTP\Exceptions\HTTPException: Failed to parse JSON string. Error: Syntax error
    [Method: POST, Route: api/clientes]

    Al parecer la terminal de VSCode elimina las comillas rompiedo el fotmato JSON. Se procede a realizar las peticiones con 'Invoke-RestMethod' y una variable con los datos en vez de poner todo junto en el mismo comando.

**Al intentar actualizar un cliente da error debido al is_unique aplicado sobre cif y mail. Se decide hacer comporbacion manual y quitar la clausula.



2026/10/2
--------------------------------
===================================
SEMANA 3: REACT y Next.js
===================================

* Creamos la carpeta 'frontend' y en terminal ejecutamos el siguiente comando para crear una app de Next.js:
     npx create-next-app@latest frontend

* Luego nos movemos a la carpeta en terminal y ejecutamos:
    npm run dev
para correr la app

* En la raíz de 'frontend' creamos un ".env.local" encargasdo de definir rutas de manera local. Centralizamos la forma de establecer las URLs.

* Se crea un pequeño fetching de los datos de clientes en 'api.js' usando la URL definida en 'env.local'. 



PROBLEMAS:
    ** Al hacer fetching nos da error "failed to fetch". En "proyecto/app/Config/Cors" ponemos el localhost del front en AllowedOrigins y también establecemos lo allowedMethods. Y en "proyecto/app/Config/Filters" buscamos '$global' y en before escribimos 'cors' para que codeignite aplque CORS antes de ejecutar los controladores.
        ->