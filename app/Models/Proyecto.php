<?php

namespace App\Models;

use CodeIgniter\Model;

class Proyecto extends Model
{
    protected $table            = 'proyectos';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'cliente_id',
        'nombre',
        'descripcion',
        'estado',
        'fecha_inicio',
        'fecha_fin',
    ];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = false;
    //protected $dateFormat    = 'datetime';
    //protected $createdField  = 'created_at';
    //protected $updatedField  = 'updated_at';
    //protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'cliente_id'   => 'required|is_not_unique[clientes.id]', // Valida que el cliente exista
        'nombre'       => 'required|min_length[3]|max_length[255]',
        'descripcion'  => 'permit_empty|string',
        'fecha_inicio' => 'required|valid_date[Y-m-d]',
        'fecha_fin'    => 'permit_empty|valid_date[Y-m-d]',
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
