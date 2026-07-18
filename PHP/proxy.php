<?php
header('Content-Type: application/json; charset=UTF-8');

/* Lee JSON del navegador */
$raw = file_get_contents('php://input');
if ($raw === false || trim($raw) === '') {
    $raw = '{}';
}

$datos = json_decode($raw);
if (!is_object($datos)) {
    echo json_encode([
        "ok" => 0,
        "mensaje" => "JSON_INVALIDO",
        "detalle" => "El cuerpo enviado no es un JSON válido"
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/*  Se validar Base64 SOLO si viene foto en ALTAS/CAMBIOS */
function es_dataurl_base64_imagen($dataUrl) {
    if (!is_string($dataUrl) || trim($dataUrl) === "") return false;

    // Debe ser data:image/...;base64,XXXX
    if (!preg_match('#^data:image/(png|jpg|jpeg);base64,#i', $dataUrl)) {
        return false;
    }

    // separa cabecera de base64 puro
    $partes = explode(',', $dataUrl, 2);
    if (count($partes) !== 2) return false;

    $b64 = $partes[1];

    // base64 válido (strict = true)
    $decoded = base64_decode($b64, true);
    if ($decoded === false) return false;

    return true;
}

// Solo valida en estos servicios
$servicio = $datos->servicio ?? "";

/*  FOTO OBLIGATORIA*/
if ($servicio === "ALTAS") {

    if (!isset($datos->foto) || trim((string)$datos->foto) === "") {
        echo json_encode([
            "ok"      => 0,
            "mensaje" => "FOTO_REQUERIDA",
            "detalle" => "Debe tomarse una fotografía para completar el registro."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    if (!es_dataurl_base64_imagen($datos->foto)) {
        echo json_encode([
            "ok"      => 0,
            "mensaje" => "FOTO_INVALIDA",
            "detalle" => "La fotografía enviada no tiene un formato Base64 válido."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    if (strlen($datos->foto) > 2_800_000) {
        echo json_encode([
            "ok"      => 0,
            "mensaje" => "FOTO_DEMASIADO_GRANDE",
            "detalle" => "La foto excede el tamaño permitido"
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }
}

if (
    ($servicio === "ALTAS" || $servicio === "CAMBIOS") &&
    isset($datos->foto) &&
    trim((string)$datos->foto) !== ""
) {
    if (!es_dataurl_base64_imagen($datos->foto)) {
        echo json_encode([
            "ok"      => 0,
            "mensaje" => "FOTO_INVALIDA",
            "detalle" => "La foto no es un Base64 válido tipo data:image/...;base64,"
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    if (strlen($datos->foto) > 2_800_000) {
        echo json_encode([
            "ok"      => 0,
            "mensaje" => "FOTO_DEMASIADO_GRANDE",
            "detalle" => "La foto excede el tamaño permitido"
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }
}

/* Se construye la URL interna hacia servicios.php */
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'localhost';
$dir    = rtrim(dirname($_SERVER['REQUEST_URI'] ?? ''), '/');
$url    = $scheme . '://' . $host . $dir . '/servicios.php';

/* Reenviar JSON a servicios.php */
$opts = [
    'http' => [
        'method'        => 'POST',
        'header'        =>
            "Content-Type: application/json; charset=UTF-8\r\n" .
            "X-From-Proxy: 1\r\n",
        'content'       => $raw,
        'ignore_errors' => true,
    ],
];

$context  = stream_context_create($opts);
$response = @file_get_contents($url, false, $context);

if ($response === false) {
    echo json_encode([
        'ok'      => 0,
        'mensaje' => 'ERROR_DE_PROXY',
        'error'   => 'No se pudo contactar a servicios.php',
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/*  Se valida que servicios.php devolvió JSON */
$test = json_decode($response, true);
if ($test === null && json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        'ok'      => 0,
        'mensaje' => 'ERROR_DE_PROCESAMIENTO',
        'error'   => 'Respuesta de servicios.php no es JSON válido',
        'raw'     => $response,
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

echo $response;
exit;
