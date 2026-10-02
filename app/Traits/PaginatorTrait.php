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

        $totalPages = $pager->getPageCount();
        $currentPage = $pager->getCurrentPage();

        return[
            'data'        => $data,
            'currentPage' => $currentPage,
            'totalPages'  => $totalPages,
            'total'       => $pager->getTotal(),
            'perPage'     => $resPerPage,
            'hasNext'     => $currentPage <$totalPages,
            'hasPrev'     => $currentPage > 1,
        ];
    }
}