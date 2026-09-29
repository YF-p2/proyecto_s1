<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use Config\Database;

class Health extends BaseController
{
    public function index(): ResponseInterface
    {
        try {
            $db = Database::connect();
            $db->reconnect();
            $dbStatus = $db->connID ? 'connected' : 'disconnected';
        } catch (\Throwable $e) {
            $dbStatus = 'error: ' . $e->getMessage();
        }

        return $this->response->setJSON([
            'status'    => 'ok',
            'timestamp' => date('Y-m-d H:i:s'),
            'database'  => $dbStatus
        ]);
    }
}