<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\Tarea;
use App\Traits\PaginatorTrait;

class TareaController extends BaseController
{
    use PaginatorTrait;
    protected Tarea $modelo;

    public function __construct()
    {
        $this->modelo = new Tarea();
    }


    public function index()
    {
        $tareas = $this->modelo->findall();

        return $this->response->setJSON($tareas);
    }


    public function show($id = null){
        $tarea = $this->modelo->find($id);

        if(!$tarea){
            return $this->notFoundTarea($id);
        }

        return $this->response->setJSON($tarea);
    }

    public function create(){
        $data = $this->request->getJSON(true);

        if(!$this->modelo->insert($data)){
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => $this->modelo->errors()
                ]);
        }

        $id = $this->modelo->getInsertID();
        $tarea = $this->modelo->find($id);

        return ($this->response
            ->setStatusCode(201)
            ->setJSON($tarea)
        );
    }

    public function update(int $id){
        $tarea = $this->modelo->find($id);

        if(!$tarea){
            return $this->notFoundTarea($id);
        }

        $data = $this->request->getJSON(true);

        if(!$this->modelo->update($id, $data)){
            return ($this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => $this->modelo->errors()
                ])
            );
        }

        $tareaUpd = $this->modelo->find($id);

        return $this->response->setJSON($tareaUpd);
    }

    public function delete(int $id){
        $tarea = $this->modelo->find($id);

        if(!$tarea){
            return $this->notFoundTarea($id);
        }

       $this->modelo->delete($id);

       return $this->response->setJSON([
            "status" => 200,
            "message" => "Tarea con ID $id ha sido eliminado con éxito",
       ]);


    }

    private function notFoundTarea(int $id){
        return $this->response
                ->setJSON([
                    'status' => 404,
                    'error' => 'Not found',
                    'message' => "Tarea con ID $id no ha sido encontrado"
                ])->setStatusCode(404);
    }
}
