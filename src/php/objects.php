<?php
require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "classes.php";

function dieWithBadRequest($errorMessages)
{
  http_response_code(400);
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages
  ));
  die ();
}

function dieWithNotFound($errorMessages)
{
  http_response_code(404);
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages
  ));
  die ();
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  dieWithBadRequest('Bad request: cannot add object.');
} else {
  if (!isset ($_GET ['gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find object without gumiId');
  }

  $brex_objet = findObjetByGumiId($_GET ['gumi_id']);
  $objet = new Objet($brex_objet);
  echo json_encode($objet, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

?>
