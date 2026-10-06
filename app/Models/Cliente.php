<?php

namespace App\Models;

use CodeIgniter\Model;

class Cliente extends Model
{
    protected $table            = 'clientes';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'nombre',
        'cif',
        'email',
        'telefono',
        'estado',
    ];
    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        "nombre" => "required|string|min_length[2]|max_length[255]",
        "cif" => "required|string|min_length[9]|max_length[9]|is_unique[clientes.cif]",
        "email" => "required|valid_email|max_length[255]|is_unique[clientes.email]",
        "telefono" => "permit_empty|string|min_length[9]|max_length[9]",
        "estado" => "string|in_list[activo,inactivo]",
    ];
    protected $validationMessages   = [
        "nombre" => [
            "required" => "El nombre es obligatorio",
            "string" => "El nombre debe ser una cadena de texto",
            "min_length" => "El nombre debe tener al menos 2 caracteres",
            "max_length" => "El nombre no puede tener más de 255 caracteres"
        ],
        "cif" => [
            "required" => "El CIF es obligatorio",
            "string" => "El CIF debe ser una cadena de texto",
            "min_length" => "El CIF debe tener 9 caracteres",
            "max_length" => "El CIF debe tener 9 caracteres",
            "is_unique" => "El CIF ya está en uso"
        ],
        "email" => [
            "required" => "El email es obligatorio",
            "valid_email" => "El email no es válido",
            "max_length" => "El email no puede tener más de 255 caracteres",
            "is_unique" => "El email ya está en uso"
        ],
        "telefono" => [
            "string" => "El teléfono debe ser una cadena de texto",
            "min_length" => "El teléfono debe tener 9 caracteres",
            "max_length" => "El teléfono no puede tener más de 9 caracteres"
        ],
        "estado" => [
            "string" => "El estado debe ser una cadena de texto",
            "in_list" => "El estado no es válido"
        ]
    ];
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
