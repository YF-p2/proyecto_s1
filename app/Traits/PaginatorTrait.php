<?php

namespace App\Traits;

use App\Models;

trait PaginatorTrait
{
    
    protected function getPagination($modelo){

    
        $request = service('request');    

        $page = $request->getGet('page') ?? 1;
        $resPerPage = 4;
        //paginate(resultados_max, grupo de Pager predeterminado, página a obtener)
        $data = $modelo->paginate($resPerPage, 'default', $page);

        //Objeto Pager que se crea al usar 'paginate()'
        $pager = $modelo->pager;

        return[
            'data' => $data,
            'totalPages' => $pager->getPageCount(),
            'total' => $pager->getTotal(),
            'perPage' => $resPerPage,
        ];
    }
}