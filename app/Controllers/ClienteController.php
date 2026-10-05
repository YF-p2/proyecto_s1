<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\Cliente;
use CodeIgniter\Exceptions\PageNotFoundException;
use App\Traits\PaginatorTrait;


class ClienteController extends BaseController
{
    use PaginatorTrait;
    protected Cliente $modelo;


    public function __construct()
    {
        $this->modelo = new Cliente();
    }

    public function index()
    {

        $search = $this->request->getGet('search');
        $estado = $this->request->getGet('estado');


        if ($search) {
            return $this->searchCliente($search);
        }

        if($estado){
            return $this->filterEstado($estado);
        }

        //$clientes = $this->modelo->findAll();
        return $this->response->setJSON($this->getPagination($this->modelo));
    }

    public function show($id = null)
    {
        $cliente = $this->modelo->find($id);

        if (!$cliente) {
            return  $this->notFoundCliente($id);
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

    /*
    public function create()
    {
        $raw = $this->request->getBody();

        return $this->response
            ->setJSON([
                'body' => $raw
            ]);
    }
        
    */

    public function update(int $id)
    {
        $cliente = $this->modelo->find($id);

        if (!$cliente) {
            return $this->notFoundCliente($id);
        }


        $data = $this->request->getJSON(true);


        $cifActual = $this->modelo
            ->where('cif', $data['cif'])
            ->where('id !=', $id)
            ->first();

        if ($cifActual) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => [
                        'cif' => 'El CIF ya está en uso'
                    ]
                ]);
        }

        $mailActual = $this->modelo
            ->where('email', $data['email'])
            ->where('id !=', $id)
            ->first();

        if ($mailActual) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => [
                        'email' => 'El email ya está en uso'
                    ]
                ]);
        }


        if (!$this->modelo->update($id, $data)) {
            return ($this->response
                ->setStatusCode(400) //solicitud mal formada
                ->setJSON([
                    'errors' => $this->modelo->errors() //error que maneja Model al validar
                ])
            );
        }


        $clienteUpd = $this->modelo->find($id);

        return $this->response->setJSON($clienteUpd);
    }

    public function delete(int $id)
    {
        $cliente = $this->modelo->find($id);

        if (!$cliente) {
            return $this->notFoundCliente($id);
        }

        $this->modelo->delete($id);

        return $this->response
            ->setStatusCode(200)
            ->setJSON([
                "status" => 200,
                "message" => "Usuario con ID $id ha sido eliminado con éxito",
            ]);
    }

    private function notFoundCliente(int $id)
    {
        return $this->response
            ->setJSON([
                'status' => 404,
                'error' => 'Not found',
                'message' => "Usuario con ID $id no ha sido encontrado"
            ])->setStatusCode(404);
    }

    private function searchCliente(String $cif)
    {

        $cliente = $this->modelo->where('cif', $cif)->first();

        if (!$cliente) {
            return  $this->notFoundCliente($cif);
        }

        return $this->response->setJSON($cliente);
    }

    private function filterEstado(String $estado)
    {

        //no aplicamos un findall porque sino no se aplica la paginación y nos devuelve
        //la consulta directamente sin paginar.
        $clientes = $this->modelo->where('estado', $estado);

        if(!$clientes){
            
            return $this->response
                ->setJSON([
                    'status' => 404,
                    'error' => 'Not found',
                    'message' => "No se encontraron clientes con estado $estado"
                ])->setStatusCode(404);
        }

        return $this->response->setJSON($this->getPagination($clientes));
    }
}
