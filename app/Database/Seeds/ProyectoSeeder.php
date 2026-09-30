<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Faker\Factory;

class ProyectoSeeder extends Seeder
{
    public function run()
    {
        $faker = Factory::create('es_ES');

        $clientesArray = $this->db->table('clientes')->select('id, nombre')->get()->getResultArray();


        foreach ($clientesArray as $cliente) {

            $numProy = rand(1, 3);

            for ($i = 1; $i <= $numProy; $i++) {
                $fecha_inicio = $faker->dateTime();
                $fecha_max = (clone $fecha_inicio)->modify('+2 years');
                $fecha_fin = $faker->dateTimeBetween($fecha_inicio, $fecha_max);

                $data = [
                    'cliente_id' => $cliente['id'],
                    'nombre' => 'Proyecto ' . $cliente['nombre'] . '-' . $i,
                    'descripcion' => $faker->sentence(),                  
                    'estado' => $faker->randomElement(['pendiente', 'en_proceso', 'completado']),
                    'fecha_inicio' => $fecha_inicio->format('Y-m-d H:i:s'),
                    'fecha_fin' => $fecha_fin->format('Y-m-d H:i:s'),
                ];

                $this->db->table('proyectos')->insert($data);
            }
        }
    }
}
