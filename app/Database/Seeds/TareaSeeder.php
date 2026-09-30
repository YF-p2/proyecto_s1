<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Faker\Factory;

class TareaSeeder extends Seeder
{
    public function run()
    {
        $faker = Factory::create('es_ES');

        $proyectosArray = $this->db->table('proyectos')->select('id, nombre, fecha_inicio')->get()->getResultArray();

        foreach($proyectosArray as $proyecto){
        
            $numTareas = rand(1, 3);

            for($i=1; $i<= $numTareas; $i++){
                $fechaLimite = $faker->dateTimeBetween($proyecto['fecha_inicio'], '+2 years')->format('Y-m-d');

                $data = [
                    'proyecto_id' => $proyecto['id'],
                    'titulo' => "Tarea " . ' ' . $i,
                    'descripcion' => $faker->sentence(),
                    'prioridad' => $faker->randomElement(['baja', 'media', 'alta']),
                    'estado' => $faker->randomElement(['pendiente', 'en_proceso', 'completado']),
                    'fecha_limite' => $fechaLimite,
                ];

                $this->db->table('tareas')->insert($data);
            };
        }
    }
}
