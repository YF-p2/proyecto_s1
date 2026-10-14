<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->get('/', 'Home::index');
$routes->get('api/health', 'Health::index');

$routes->post('api/login', 'AuthController::login');

$routes->options('api/login', 'ClienteController::options');
$routes->options('api/logout', 'ClienteController::options');
$routes->options('api/me', 'ClienteController::options');

/*
generamos un grupo "api" que engloba las diferentes rutas a las 3 tablas
 ->clientes, proyectos, tareas

 $routes->resources() mapea las 5 acciones HTTP (get, post, put, patch, delete)
 Esto nos evita escribir 15 (5acciones x 3 tablas) rutas individuales
 Además, soporta nativamente los parametros de consutla HTTP en las URL
*/

$routes->options('api/clientes', 'ClienteController::options');
$routes->options('api/clientes/(:num)', 'ClienteController::options');
$routes->options('api/clientes/all', 'ClienteController::options');

$routes->options('api/proyectos', 'ProyectoController::options');
$routes->options('api/proyectos/(:num)', 'ProyectoController::options');

//$routes->options('api/tareas', 'TareaController::options');
//$routes->options('api/tareas/(:num)', 'TareaController::options');


$routes->group('api', ['filter' => 'tokens'], static function ($routes) {

    $routes->post('logout', 'AuthController::logout');
    $routes->get('me', 'AuthController::me');


    //lectura para cualquier usuario
    $routes->get('clientes', 'ClienteController::index');
    $routes->get('clientes/all', 'ClienteController::all');
    $routes->get('clientes/(:num)', 'ClienteController::show/$1');

    //modificaciones para usuarios con permisos 
    $routes->post('clientes', 'ClienteController::create',
        ['filter' => 'api-permission:clientes.create']
    );

    $routes->put('clientes/(:num)', 'ClienteController::update/$1',
        ['filter' => 'api-permission:clientes.edit']
    );

    $routes->delete('clientes/(:num)', 'ClienteController::delete/$1',
        ['filter' => 'api-permission:clientes.delete']
    );


    $routes->get('proyectos', 'ProyectoController::index');
    $routes->get('proyectos/(:num)', 'ProyectoController::show/$1');

    $routes->post('proyectos', 'ProyectoController::create',
        ['filter' => 'api-permission:proyectos.create']
    );

    $routes->put('proyectos/(:num)', 'ProyectoController::update/$1',
        ['filter' => 'api-permission:proyectos.edit']
    );

    $routes->delete('proyectos/(:num)', 'ProyectoController::delete/$1',
        ['filter' => 'api-permission:proyectos.delete']
    );


    $routes->get('tareas', 'TareaController::index');
    $routes->get('tareas/(:num)', 'TareaController::show/$1');

    $routes->post('tareas', 'TareaController::create',
        ['filter' => 'api-permission:tareas.create']
    );

    $routes->put('tareas/(:num)', 'TareaController::update/$1',
        ['filter' => 'api-permission:tareas.edit']
    );

    $routes->delete('tareas/(:num)', 'TareaController::delete/$1',
        ['filter' => 'api-permission:tareas.delete']
    );

    /*
    $routes->get('api/clientes', 'ClienteController::index');
    $routes->get('api/clientes/(:num)', 'ClienteController::show/$id');
    $routes->post('api/clientes', 'ClienteController::create');
    $routes->put('api/clientes/(:num)', 'ClienteController::update/$id');
    $routes->delete('api/clientes/(:num)', 'ClienteController::delete/$id');
    */
});


$routes->set404Override('App\Controllers\Errors::notFound');
