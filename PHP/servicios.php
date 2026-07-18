<?php
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/usuarios.php';

class servicios {
    private $db;
    private $datos;

    public function __construct($json) {
        $this->db = new usuarios();

        if (!$this->db->ok) {
            $this->responder([
                "ok" => 0,
                "mensaje" => "ERROR",
                "error" => "Error de conexión a la BD"
            ]);
        }

        $this->datos = json_decode($json);
        if (!is_object($this->datos)) {
            $this->datos = new stdClass();
        }

        $servicio = $this->datos->servicio ?? "";

        switch ($servicio) {
            case "CONSTANTES":       $this->CONSTANTES();       break;
            case "ALTAS":            $this->ALTAS();            break;
            case "BAJAS":            $this->BAJAS();            break;
            case "CAMBIOS":          $this->CAMBIOS();          break;
            case "CONSULTAS":        $this->CONSULTAS();        break;
            case "CONSULTAS_LOGIN":  $this->CONSULTAS_LOGIN();  break;
            case "LOGIN":            $this->LOGIN();            break;
            case "GET_FOTO":         $this->GET_FOTO();         break;
            default:
                $this->responder([
                    "ok" => 0,
                    "mensaje" => "SERVICIO_INVALIDO"
                ]);
        }
    }

    // ================= Helpers =================

    private function responder($data) {
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    private function ejecutar($sql) {
        try {
            $stm = $this->db->query($sql);
            return $stm->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->responder([
                "ok" => 0,
                "mensaje" => "ERROR",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Convierte respuesta de SP (con resultado numérico) a objeto estándar simple
    private function wrapSpResultado($rows) {
        $fila = $rows[0] ?? [];
        $ok = isset($fila['ok']) ? intval($fila['ok']) : 1;
        $codigo = $fila['resultado'] ?? $fila['mensaje'] ?? null;

        return [
            "ok"      => $ok,
            "mensaje" => $codigo
        ];
    }

    // ================= Servicios =================

    private function CONSTANTES() {
        $sql = $this->db->CONSTANTES();
        $this->responder($this->ejecutar($sql));
    }

    private function ALTAS() {
        $sql = $this->db->ALTAS($this->datos);
        $res = $this->ejecutar($sql);

        // Guardar foto si viene
        if (!empty($this->datos->foto)) {
            $login = $this->datos->login ?? "";
            if ($login !== "") {
                try {
                    $stm = $this->db->prepare("SELECT id FROM login WHERE login = :login");
                    $stm->execute([":login" => $login]);
                    $id = $stm->fetchColumn();
                    if ($id) {
                        $stm2 = $this->db->prepare(
                            "REPLACE INTO fotos(id, foto) VALUES(:id, :foto)"
                        );
                        $stm2->execute([
                            ":id"   => $id,
                            ":foto" => $this->datos->foto
                        ]);
                    }
                } catch (PDOException $e) {
                    // si falla la foto, no tumba el alta
                }
            }
        }

        $this->responder($this->wrapSpResultado($res));
    }

    private function BAJAS() {
        $sql = $this->db->BAJAS($this->datos);
        $res = $this->ejecutar($sql);
        $this->responder($this->wrapSpResultado($res));
    }

    private function CAMBIOS() {
        $d = $this->datos;

        if (empty($d->id)) {
            $this->responder([
                "ok" => 0,
                "mensaje" => "ID requerido"
            ]);
        }

        // Normalizar genero
        if (!isset($d->genero) || $d->genero === "" || !is_numeric($d->genero)) {
            $d->genero = -1;
        }

        // Si no se envía nueva contraseña, usar CLAVE_OCULTA para que el SP conserve la actual
        if (!isset($d->pwd) || $d->pwd === "") {
            $d->pwd = "CLAVE_OCULTA";
        }

        // Ejecuta SP CAMBIOS
        $sql = $this->db->CAMBIOS($d);
        $res = $this->ejecutar($sql);
        $wrap = $this->wrapSpResultado($res);

        // Solo si el cambio fue exitoso, actualiza foto (si viene)
        if ($wrap["ok"] == 1 && !empty($d->foto)) {
            try {
                $stm = $this->db->prepare(
                    "REPLACE INTO fotos(id, foto) VALUES(:id, :foto)"
                );
                $stm->execute([
                    ":id"   => $d->id,
                    ":foto" => $d->foto
                ]);
            } catch (PDOException $e) {
                // si falla la foto no rompemos el cambio
            }
        }

        $this->responder($wrap);
    }

    private function CONSULTAS() {
        $sql = $this->db->CONSULTAS($this->datos);
        $this->responder($this->ejecutar($sql));
    }

    private function CONSULTAS_LOGIN() {
        $sql = $this->db->CONSULTAS_LOGIN($this->datos);
        $this->responder($this->ejecutar($sql));
    }

    private function LOGIN() {
        $sql = $this->db->LOGIN($this->datos);
        $rows = $this->ejecutar($sql);

        if (isset($rows[0]['respuesta'])) {
            $resp = json_decode($rows[0]['respuesta'], true);
            if (!$resp) {
                $this->responder([
                    "ok" => 0,
                    "mensaje" => "ERROR_DE_PROCESAMIENTO"
                ]);
            }
            $this->responder(["respuesta" => $resp]);
        }

        $this->responder($rows);
    }

    private function GET_FOTO() {
        $id = $this->datos->id ?? "";
        if ($id === "") {
            $this->responder([
                "ok" => 0,
                "mensaje" => "DATOS_INVALIDOS"
            ]);
        }

        try {
            $stm = $this->db->prepare("SELECT foto FROM fotos WHERE id = :id");
            $stm->execute([":id" => $id]);
            $foto = $stm->fetchColumn();

            if ($foto) {
                $this->responder([
                    "ok" => 1,
                    "foto" => $foto
                ]);
            } else {
                $this->responder([
                    "ok" => 0,
                    "mensaje" => "CONSULTA_SIN_RESULTADOS"
                ]);
            }
        } catch (PDOException $e) {
            $this->responder([
                "ok" => 0,
                "mensaje" => "ERROR",
                "error" => $e->getMessage()
            ]);
        }
    }
}

// bootstrap
$input = file_get_contents('php://input');
if ($input === "" || $input === false) {
    $input = "{}";
}
new servicios($input);
?>
