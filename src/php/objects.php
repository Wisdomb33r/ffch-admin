<?php
require_once "../gestion/genscripts/object_brex_objet.class.php";

class Objet
{
  public $id;
  public $nom;
  public $nom_en;
  public $icone;
  public $gumi_id;

  function __construct($brex_objet)
  {
    $this->id = $brex_objet->id;
    $this->nom = $brex_objet->nom;
    $this->nom_en = $brex_objet->nom_en;
    if (strlen($brex_objet->img) > 0) {
      $this->icone = $brex_objet->getImageimgPath();
    }
    $this->gumi_id = $brex_objet->gumi_id;
  }
}

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

function findObjetByGumiId($gumi_id)
{
  $brex_objets = brex_objet::finderParGumiId($gumi_id);
  if (count($brex_objets) > 1) {
    dieWithBadRequest('Storage exception : several objects found with gumiId: ' . $gumi_id);
  } else if (count($brex_objets) == 0) {
    dieWithNotFound('Storage exception : object not found');
  }
  return $brex_objets[0];
}

?>
