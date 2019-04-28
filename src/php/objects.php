<?php
require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "../gestion/genscripts/object_brex_objet_categ.class.php";
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
  $objet = json_decode(file_get_contents('php://input'));

  verifyObjet($objet);

  $brex_objet = createAndValidateObjet($objet);

  if ($brex_objet->store()) {
    $brex_objets = brex_objet::finderParGumiId($objet->gumi_id);
    if (count($brex_objets) > 0) {
      http_response_code(201);
      $stored_brex_objet = new Objet(($brex_objets [0]));
      echo json_encode($stored_brex_objet, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    } else {
      http_response_code(500);
      $errors = array();
      $errors [] = 'Unexpected error occured, stored gumi id ' . $brex_objet->gumi_id . ' not found';
      echo json_encode($errors);
    }
  } else {
    http_response_code(400);
    echo json_encode($brex_objet->errors);
  }

} else {
  if (!isset ($_GET ['gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find object without gumiId');
  }

  $brex_objet = findObjetByGumiId($_GET ['gumi_id']);
  $objet = new Objet($brex_objet);
  echo json_encode($objet, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

function verifyObjet($objet)
{
  if (!isset ($objet->nom) || !$objet->nom) {
    dieWithBadRequest('Format exception: Cannot save objet without nom');
  }

  if (!isset ($objet->nom_en) || !$objet->nom_en) {
    dieWithBadRequest('Format exception: Cannot save objet without nom_en');
  }

  if (!isset ($objet->description) || !$objet->description) {
    dieWithBadRequest('Format exception: Cannot save objet without description');
  }

  if (!isset ($objet->description_en) || !$objet->description_en) {
    dieWithBadRequest('Format exception: Cannot save objet without description_en');
  }

  if (!isset ($objet->gumi_id) || !$objet->gumi_id) {
    dieWithBadRequest('Format exception: Cannot save objet without Gumi ID');
  }

}

function createAndValidateObjet($objet)
{
  $values = array();
  $values ['nom'] = $objet->nom;
  $values ['nom_en'] = $objet->nom_en;
  $values ['description'] = $objet->description;
  $values ['description_en'] = $objet->description_en;
  $values ['gumi_id'] = $objet->gumi_id;

  $brex_objet = new brex_objet($values);

  $brex_objet_categ = brex_objet_categ::findByPrimaryId(79);
  $brex_objet->setrelationcategorie($brex_objet_categ);

  $brex_objet->verifyValues();

  return $brex_objet;
}

?>
