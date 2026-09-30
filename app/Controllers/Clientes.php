<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\Cliente;
use CodeIgniter\Exceptions\PageNotFoundException;


class Clientes extends BaseController
{
    protected Cliente $modelo;


    public function __construct()
    {
        $this->modelo = new Cliente();
    }

    public function index()
    {

        $clientes = $this->modelo->findAll();
        return $this->response->setJSON($clientes);
    }

    public function show($id = null)
    {
        $cliente = $this->modelo->find($id);

        if (!$cliente) {
            return $this->response
                ->setJSON([
                    'status' => 404,
                    'error' => 'Not found',
                    'message' => "Usuario con ID $id no ha sido encontrado"
                ])->setStatusCode(404);
        }

        return $this->response->setJSON($cliente);
    }

    public function create()
    {
        $data = $this->request->getJSON(true); //es la data obtenida de la peticion http

        if (!$this->modelo->insert($data)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => $this->modelo->errors()
                ]);
        }

        $id = $this->modelo->getInsertID(); //metodo viene de la clase Models del framework
        $cliente = $this->modelo->find($id);

        return ($this->response
            ->setStatusCode(201)
            ->setJSON($cliente)
        );
    }

    public function update($id)
    {
        $cliente = $this->modelo->find($id);

        if (!$cliente) {
            return ($this->response
                ->setStatusCode(404)
                ->setJSON([
                    'error' => 'Cliente con ID $id no encontrado'
                ])
            );
        }

        $data = $this->request->getJSON(true);

        if (!$this->modelo->update($id, $data)) {
            return ($this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => $this->modelo->errors() //error que maneja Model al validar
                ])
            );
        }

        return $this->response->setJSON($cliente);
    }
}
