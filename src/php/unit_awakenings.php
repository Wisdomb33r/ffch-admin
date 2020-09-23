<?php
require_once "../gestion/genscripts/object_brex_perso_eveil.class.php";
require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "classes.php";
require_once "../gestion/genscripts/object_brex_obtention.class.php";

class UniteEveil
{
  public $unite_numero;
  public $formule;
  public $ajoute_obtention;
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

  if (isset($uniteEveil->ajoute_obtention) && $uniteEveil->ajoute_obtention == true) {
    $brex_obtention = createAndValidateObjetObtention($brex_unite, $brex_perso_eveil);
    $brex_obtention->store();
  }

  $stored_brex_perso_eveil = findPersoEveilByUnit($brex_unite);
  $stored_unite_materiaux_eveil = createUniteEveil($brex_unite, $stored_brex_perso_eveil);

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

    if (count($formule->ingredients) > 0) {
      $stored_brex_obtentions = brex_obtention::findByRelation1N(array('objet' => $formule->ingredients[0]->materiau->id));
      $uniteEveil->ajoute_obtention = count($stored_brex_obtentions) > 0 ? true : false;
    }
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

function createAndValidateObjetObtention($brex_unite, $brex_perso_eveil)
{
  if ($brex_unite->stars < 6 || $brex_unite->stars > 8) {
    return;
  }

  $materiauSpecifique = brex_objet::findByPrimaryId($brex_perso_eveil->relation1Nmateriau1);

  $existing_obtention = brex_obtention::findByRelation1N(array('objet' => $materiauSpecifique->id));
  if (count($existing_obtention) > 0) {
    dieWithBadRequest('Storage exception : existing acquisition of prism or fragment found for unit with numero: ' . $brex_unite->numero);
  }

  $brex_obtention = new brex_obtention(array());
  $brex_obtention->setrelationobjet($materiauSpecifique);

  $brex_perso = brex_perso::findByPrimaryId($brex_unite->relation1Nperso);

  $materiauName = $brex_unite->stars == 6 ? 'prisme' : 'fragments';

  $brex_obtention->description = 'Obtenu par conversion d\'une unité de <a href="ffexvius_units.php?persoid=' .
    $brex_perso->id . '">' . $brex_perso->nom .
    '</a> dans l\'onglet "Conversion en ' . $materiauName . '" de l\'écran d\'éveil des personnages.';

  if (!$brex_obtention->verifyValues()) {
    dieWithBadRequest(array_merge($brex_obtention->errors, (array)'Format exception: Validation of $brex_obtention failed'));
  }

  return $brex_obtention;
}

?>
