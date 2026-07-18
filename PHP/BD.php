<?php
class BD extends PDO {
    public $ok = true;

    // AJUSTA usuario/password si en XAMPP son distintos
    public function __construct($Servidor, $BD, $Usuario = "root", $Password = "isa03*") {
        try {
            parent::__construct(
                "mysql:host={$Servidor};dbname={$BD};charset=utf8mb4",
                $Usuario,
                $Password,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false
                ]
            );
        } catch (PDOException $e) {
            $this->ok = false;
        }
    }
}
?>
