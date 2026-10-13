<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\Shield\Entities\User;
use CodeIgniter\Shield\Models\UserModel;

class UsersSeeder extends Seeder
{
    public function run()
    {
        //objeto del "manejador" de usuarios
        $users = auth()->getProvider();

        $this->crear($users, 'admin@correo.es', 'admin123_', 'admin');
        $this->crear($users, 'user@correo.es', 'user123_', 'user');

    }

    public function crear(UserModel $users, string $email, ?string $password, string $grupo): void{
        if(!$password){
            throw new \RuntimeException("No se ha encontrado la contraseña de $email en .env");
        }

        if($users->findByCredentials(['email' => $email])){
            return;
        }

        $user = new User([
            'username' => explode('@', $email)[0],
            'email' => $email,
            'password' => $password
        ]);
        
        $users->save($user);

        $user = $users->findById($users->getInsertID());
        $user->addGroup($grupo);
    }
}
