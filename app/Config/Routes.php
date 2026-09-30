<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->get('api/health', 'Health::index');


/*
generamos un grupo "api" que engloba las diferentes rutas a las 3 tablas
 ->clientes, proyectos, tareas

 $routes->resources() mapea las 5 acciones HTTP (get, post, put, patch, delete)
 Esto nos evita escribir 15 (5acciones x 3 tablas) rutas individuales
 Además, soporta nativamente los parametros de consutla HTTP en las URL
*/

$routes->group('api', static function ($routes) {
    $routes->resource('clientes', ['controller' => 'ClienteController']);
    $routes->resource('proyectos', ['controller' => 'ProyectoController']);
    $routes->resource('tareas', ['controller' => 'TareaController']);

    /*
    $routes->get('api/clientes', 'ClienteController::index');
    $routes->get('api/clientes/(:num)', 'ClienteController::show/$id');
    $routes->post('api/clientes', 'ClienteController::create');
    $routes->put('api/clientes/(:num)', 'ClienteController::update/$id');
    $routes->delete('api/clientes/(:num)', 'ClienteController::delete/$id');
    */
});
