<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class ApiPermissionFiltro implements FilterInterface{

    public function before(RequestInterface $request, $arguments = null){
        $user = auth('tokens')->user();

        if($user === null){
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'error'=> 'Unauthorized',
                    'message' => 'Usuario no ha sido autenticado'
                ]);
        }

        //evitamos que en caso de $arguments == null la app se detenga creando un array vacio
        //con 'can()' comprobamos si ese user tiene asignados X permisos
        foreach($arguments ?? [] as $permission){
            if(!$user->can($permission)){
                return service('response')
                    ->setStatusCode(403)
                    ->setJSON([
                        'error' => 'Forbidden',
                        'message' => 'No tiene permiso para realizar esta operación'
                    ]);
            }
        }
    }

    public function after(
        RequestInterface $request,
        ResponseInterface $response,
        $arguments = null
    ): void {

    }
}