<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Faker\Factory;

class ClienteSeeder extends Seeder
{
    public function run()
    {
        $faker = Factory::create('es_ES');

        for($i=0; $i<5; $i++){
            $name = $faker->firstNameMale();
            $surN = $faker->lastName();
            $mail = $name . mb_substr($surN, 0, 2);


            $data = [
                'nombre' => $name . ' ' . $surN,
                'cif' => $faker->unique()->dni(),
                'email' => $mail . '@' . $faker->freeEmailDomain(),
                'telefono' => $faker->phoneNumber(),
                'estado'=> $faker->randomElement(['activo', 'inactivo'])

            ];
            $this->db->table('clientes')->insert($data);
        }
    }
}
