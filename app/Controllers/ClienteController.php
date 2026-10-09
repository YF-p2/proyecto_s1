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

        if ($estado) {
            return $this->filterEstado($estado);
        }

        //$clientes = $this->modelo->findAll();
        return $this->response->setJSON($this->getPagination($this->modelo));
    }


    public function all(){

        $clientes = $this->modelo
            ->select('id, nombre')
            ->orderBy('id', 'ASC')
            ->findAll();

        return $this->response->setJSON($clientes);

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



    public function update(int $id)
    {
        $cliente = $this->modelo->find($id);

        if (!$cliente) {
            return $this->notFoundCliente($id);
        }

        $data = $this->request->getJSON(true) ?? [];
        $errors = [];

        // Comprobamos que el CIF no pertenezca a otro cliente
        if (!empty($data['cif'])) {
            $cifDuplicado = $this->modelo
                ->where('cif', $data['cif'])
                ->where('id !=', $id)
                ->first();

            if ($cifDuplicado) {
                $errors['cif'] = 'El CIF ya está en uso';
            }
        }

        // Comprobamos que el email no pertenezca a otro cliente
        if (!empty($data['email'])) {
            $mailDuplicado = $this->modelo
                ->where('email', $data['email'])
                ->where('id !=', $id)
                ->first();

            if ($mailDuplicado) {
                $errors['email'] = 'El email ya está en uso';
            }
        }

        // Si hay duplicados, devolvemos los errores
        if (!empty($errors)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => $errors
                ]);
        }

        // Guardamos las reglas originales
        $reglasOriginales = $this->modelo->getValidationRules();

        // Copiamos las reglas para el update
        $reglasUpdate = $reglasOriginales;

        // Quitamos is_unique de CIF y email para esta actualización
        $reglasUpdate['cif'] = "required|string|min_length[9]|max_length[9]";
        $reglasUpdate['email'] = "required|valid_email|max_length[255]";

        // Aplicamos temporalmente las reglas de actualización
        $this->modelo->setValidationRules($reglasUpdate);


        if (!$this->modelo->update($id, $data)) {

            // Restauramos las reglas originales
            $this->modelo->setValidationRules($reglasOriginales);

            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'errors' => $this->modelo->errors()
                ]);
        }

        // Restauramos las reglas originales
        $this->modelo->setValidationRules($reglasOriginales);

        return $this->response->setJSON(
            $this->modelo->find($id)
        );
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


    
    private function notFoundCliente($id)
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

        /*
        if (!$clientes) {

            return $this->response
                ->setJSON([
                    'status' => 404,
                    'error' => 'Not found',
                    'message' => "No se encontraron clientes con estado $estado"
                ])->setStatusCode(404);
        }
        */
        return $this->response->setJSON($this->getPagination($clientes));
    }


    public function options()
    {
        return $this->response->setStatusCode(204);
    }
}
