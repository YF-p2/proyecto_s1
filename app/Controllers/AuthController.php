<?php
namespace App\Controllers;

use App\Controllers\BaseController;

class AuthController extends BaseController{

    public function login(){
        $data = $this->request->getJSON(true) ?? [];
        
        if(empty($data['email']) || empty($data['password'])){
            return $this->response->setStatusCode(400)
                ->setJSON(['errors' => ['email' => 'Email y contraseña obligatorios']]);
        }

        $result = auth('session')->check([
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        //iOk() -> metodo de Shield que valida si hay coincidencia de datos
        if(!$result->isOK()){
            return $this->response->setStatusCode(400)
                ->setJSON(['message' => 'Credenciales incorrectas']);
        }

        //se obtiene la entidad del user
        $user = $result->extraInfo();
        //genera token aleatorio y se guarda el HASH EN 'auth_identities'
        //'web' es solo una etiqueta que identifica PARA QUÉ es ese token 
        $token = $user->generateAccessToken('web'); 

        return $this->response->setJSON([
            'token' => $token->raw_token,
            'user' => ['id' => $user->id, 'email' => $user->email, 'roles' => $user->getGroups()],
        ]);

    }


    public function logout(){
        //eliminacion de todos los tokens, invalidando el valor en server y navegador
        auth('tokens')->user()->revokeAllAccessTokens();
        return $this->response->setJSON(['message' => 'Sesion cerrada']);
    }


    public function me(){
        $user = auth('tokens')->user();
        return $this->response->setJSON([
            'id' => $user->id, 'email' => $user->email, 'roles' => $user->getGroups(),
        ]);
    }
}