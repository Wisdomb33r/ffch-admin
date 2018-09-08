<?php
require_once "../gestion/genscripts/object_brex_perso_eveil.class.php";
require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "classes.php";

class UniteEveil
{
  public $unite_numero;
  public $formule;
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

  $uniteEveil = json_decode(file_get_contents('php://input'));
  if (!isset ($uniteEveil->unite_numero) || !$uniteEveil->unite_numero) {
    dieWithBadRequest('Format exception : cannot save without unit number');
  }

  if (!isset ($uniteEveil->formule) || !isset ($uniteEveil->formule->ingredients) || !is_array($uniteEveil->formule->ingredients) || count($uniteEveil->formule->ingredients) == 0) {
    dieWithBadRequest('Format exception : cannot save without awakening materials');
  }

  $brex_unite = findUnitByNumber($uniteEveil->unite_numero);
  $brex_persos_eveil = brex_perso_eveil::findByRelation1N(array('unit' => $brex_unite->id));
  if (count($brex_persos_eveil) > 0) {
    dieWithBadRequest('Storage exception : found existing awakening materials for unit with numero: ' . $brex_unite->numero);
  }

  $brex_perso_eveil = createAndValidatePersoEveil($brex_unite, $uniteEveil);
  $brex_perso_eveil->store();

  $stored_brex_perso_eveil = findPersoEveilByUnit($brex_unite);
  $stored_unite_materiaux_eveil = createUniteEveil($brex_unite, $brex_perso_eveil);

  echo json_encode($stored_unite_materiaux_eveil, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
} else {
  if (!isset ($_GET ['numero'])) {
    dieWithBadRequest('Format exception: Cannot find unit without number');
  }

  $brex_unite = findUnitByNumber($_GET ['numero']);
  $brex_perso_eveil = findPersoEveilByUnit($brex_unite);
  $unite_materiaux_eveil = createUniteEveil($brex_unite, $brex_perso_eveil);

  echo json_encode($unite_materiaux_eveil, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

function findUnitByNumber($number)
{
  $brex_unites = brex_unit::finderParNumero($number);
  if (count($brex_unites) > 1) {
    dieWithBadRequest('Storage exception : several units found with numero: ' . $number);
  } else if (count($brex_unites) == 0) {
    dieWithNotFound('Storage exception : unit not found');
  }
  return $brex_unites[0];
}

function findPersoEveilByUnit($brex_unite)
{
  $brex_persos_eveil = brex_perso_eveil::findByRelation1N(array('unit' => $brex_unite->id));
  if (count($brex_persos_eveil) > 1) {
    dieWithBadRequest('Storage exception : several sets of awakening materials found for unit with numero: ' . $brex_unite->numero);
  } else if (count($brex_persos_eveil) == 0) {
    dieWithNotFound('Storage exception : awakening material not found');
  }
  return $brex_persos_eveil[0];
}

function createUniteEveil($brex_unite, $brex_materiaux_eveil)
{
  $uniteEveil = new UniteEveil();
  $uniteEveil->unite_numero = $brex_unite->numero;

  $formule = createFormule($brex_materiaux_eveil);

  if ($formule) {
    $uniteEveil->formule = $formule;
  }

  return $uniteEveil;
}

function createAndValidatePersoEveil($brex_unite, $uniteEveil)
{
  $brex_perso_eveil = new brex_perso_eveil(array());
  $brex_perso_eveil->setrelationunit($brex_unite);

  updateMateriauxEveil($brex_perso_eveil, $uniteEveil->formule);

  if (!$brex_perso_eveil->verifyValues()) {
    dieWithBadRequest(array_merge($brex_perso_eveil->errors, (array)'Format exception: Validation of brex_perso_eveil failed'));
  }

  return $brex_perso_eveil;
}

?>
