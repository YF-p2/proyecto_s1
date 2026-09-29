<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Tarea extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'=>[
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'proyecto_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'titulo' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
            ],
            'descripcion' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'prioridad' =>[
                'type' => 'ENUM',
                'constraint' => ['baja', 'media', 'alta'],
                'default' => 'baja',
            ],
            'estado' => [
                'type' => 'ENUM',
                'constraint' => ['pendiente', 'en_proceso', 'completado'],
                'default' => 'pendiente',
            ],
            'fecha_limite' => [
                'type' => 'DATE',
                'null' => true,
            ]
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('proyecto_id', 'proyectos', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('tareas');
    }

    public function down()
    {
        
    }
}
