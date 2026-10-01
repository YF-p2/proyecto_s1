<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\Proyecto;
use App\Traits\PaginatorTrait;


class ProyectoController extends BaseController
{
    use PaginatorTrait;
    protected Proyecto $modelo;

    public function __construct()
    {
        $this->modelo = new Proyecto();
    }
    
    public function index()
    {
        $proyectos = $this->modelo->findAll();
        return $this->response->setJSON($this->getPagination($this->modelo));
    }

    public function show($id = null)
    {
        $proyecto = $this->modelo->find($id);

        if (!$proyecto) {
            return  $this->notFoundProyecto($id);
        }

        return $this->response->setJSON($proyecto);
    }

    public function create(){
        $data = $this->request->getJSON(true);

        if (!$this->modelo->insert($data)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => $this->modelo->errors()
                ]);
        }

        $id = $this->modelo->getInsertID();
        $proyecto = $this->modelo->find($id);

        return ($this->response
            ->setStatusCode(201) //CODIGO DE CREACION EXITOSA
            ->setJSON($proyecto)
        );
    }

    public function update(int $id){
        $proyecto = $this->modelo->find($id);

        if(!$proyecto){
            return $this->notFoundProyecto($id);
        }

        $data = $this->request->getJSON(true);
        if(!$this->modelo->update($id, $data)){
            return $this->response
                ->setStatusCode((400)) //solicitud mal formada
                ->setJSON([
                    "errors" => $this->modelo->errors()
                ]);  
        }

        $proyectoUpd = $this->modelo->find($id);
        return $this->response->setJSON($proyectoUpd);
    }

    public function delete(int $id){
        $proyecto = $this->modelo->find($id);

        if(!$proyecto){
            return $this->notFoundProyecto($id);
        }

        $this->modelo->delete($id);

        return $this->response->setJSON([
            'status' => 200,
            'error' => null,
            'message' => "Proyecto con ID $id ha sido eliminado"
        ]);
    }

    private function notFoundProyecto(int $id){
        return $this->response
                ->setJSON([
                    'status' => 404,
                    'error' => 'Not found',
                    'message' => "Proyecto con ID $id no ha sido encontrado"
                ])->setStatusCode(404);
    }
}
