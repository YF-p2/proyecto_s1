<?php

namespace App\Controllers;
use CodeIgniter\Controller;

class Errors extends Controller{

    public function notFound(){
        return $this->response
            ->setStatusCode(404)
            ->setJSON([
                'status' => 404,
                'error' => 'Not Found',
                'message' => 'Pagina no encontrada'
            ]);
    }
}