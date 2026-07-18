<?php
require_once("BD.php");

class usuarios extends BD {

    public function __construct() {
        try {
            parent::__construct("localhost", "usuarios", "root", "isa03*");
        } catch (Exception $e) {
            $this->ok = false;
        }
    }

    // ========== CRUD ==========

    // ALTAS
    public function ALTAS($datos) {
        $nombre     = $this->esc($datos->nombre     ?? "");
        $papellido  = $this->esc($datos->papellido  ?? "");
        $sapellido  = $this->esc($datos->sapellido  ?? "");
        $nacimiento = $this->esc($datos->nacimiento ?? "");
        $genero     = (int)($datos->genero ?? -1);
        $login      = $this->esc($datos->login      ?? "");
        $pwd        = $this->esc($datos->pwd        ?? "");
        $foto = isset($datos->foto) ? $datos->foto : "";

        return "CALL ALTAS(
            '$nombre',
            '$papellido',
            '$sapellido',
            '$nacimiento',
            $genero,
            '$login',
            '$pwd',
            '$foto'
        );";
    }

    public function BAJAS($datos) {
        $id = $this->esc($datos->id ?? "");
        return "CALL BAJAS('$id');";
    }

    public function CAMBIOS($datos) {
        $id         = $this->esc($datos->id         ?? "");
        $nombre     = $this->esc($datos->nombre     ?? "");
        $papellido  = $this->esc($datos->papellido  ?? "");
        $sapellido  = $this->esc($datos->sapellido  ?? "");
        $nacimiento = $this->esc($datos->nacimiento ?? "");
        $genero     = (int)($datos->genero ?? -1);
        $login      = $this->esc($datos->login      ?? "");
        $pwd        = $this->esc($datos->pwd        ?? "");
        $foto = isset($datos->foto) ? $datos->foto : "";

        return "CALL CAMBIOS(
            '$id',
            '$nombre',
            '$papellido',
            '$sapellido',
            '$nacimiento',
            $genero,
            '$login',
            '$pwd',
            '$foto'
        );";
    }

    // ========== CONSULTAS ==========

    public function CONSULTAS($datos) {
        $orden = isset($datos->orden) ? (int)$datos->orden : 1;
        return "CALL CONSULTAS($orden);";
    }

    public function CONSULTAS_LOGIN($datos) {
        $login = $this->esc($datos->login ?? "");
        return "CALL CONSULTAS_LOGIN('$login');";
    }

    public function CONSTANTES() {
        return "CALL CONSTANTES();";
    }

    // ========== LOGIN ==========

    public function LOGIN($datos) {
        $login = $this->esc($datos->login ?? "");
        $pwd   = $this->esc($datos->pwd   ?? "");

        // Devuelve un JSON desde SQL
        return "
            SELECT 
                IF(
                    EXISTS(
                        SELECT 1 
                        FROM login 
                        WHERE login = '$login'
                        AND pwd = AES_ENCRYPT('$pwd', '19701019')
                    ),
                    JSON_OBJECT(
                        'ok', 1,
                        'login', '$login',
                        'resultado', 'ACCESO_CONCEDIDO'
                    ),
                    JSON_OBJECT(
                        'ok', 0,
                        'login', '$login',
                        'resultado', 'CREDENCIALES_INVALIDAS'
                    )
                ) AS respuesta;
        ";
    }

    // ========== Helper ==========

    private function esc($v) {
        if ($v === null) return "";
        return substr($this->quote($v), 1, -1);
    }
}
?>
