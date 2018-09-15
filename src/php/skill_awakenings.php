<?php
require_once "../gestion/genscripts/object_brex_comp_eveil.class.php";
require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "../gestion/genscripts/object_brex_perso.class.php";
require_once "../gestion/genscripts/object_brex_competence.class.php";

require_once "classes.php";


class Amelioration
{
  public $perso_gumi_id;
  public $skill_id_base;
  public $skill_id_new;
  public $formule;
  public $niveau;
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
  /*
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
  */
} else {
  if (!isset ($_GET ['perso_gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find competence eveil without perso');
  }

  if (!isset ($_GET ['skill_id_base'])) {
    dieWithBadRequest('Format exception: Cannot find competence eveil without competence');
  }

  if (!isset ($_GET ['niveau'])) {
    dieWithBadRequest('Format exception: Cannot find competence eveil without niveau');
  }

  $brex_perso = findPersoByGumiId($_GET ['perso_gumi_id']);
  $brex_competence = findCompetenceByGumiId($_GET ['skill_id_base']);
  $niveau = $_GET ['niveau'];
  $brex_competence_eveil = findCompetenceEveil($brex_perso, $brex_competence, $niveau);
  $amelioration = createAmelioration($brex_competence_eveil);

  echo json_encode($amelioration, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

function findPersoByGumiId($gumi_id)
{
  $brex_persos = brex_perso::finderParGumiId($gumi_id);
  if (count($brex_persos) > 1) {
    dieWithBadRequest('Storage exception : several persos found with gumi ID: ' . $gumi_id);
  } else if (count($brex_persos) == 0) {
    dieWithNotFound('Storage exception : perso not found');
  }
  return $brex_persos[0];
}

function findCompetenceByGumiId($gumi_id)
{
  $brex_competences = brex_competence::finderParGumiId($gumi_id);
  if (count($brex_competences) > 1) {
    dieWithBadRequest('Storage exception : several competences found with gumi ID: ' . $gumi_id);
  } else if (count($brex_competences) == 0) {
    dieWithNotFound('Storage exception : competence not found');
  }
  return $brex_competences[0];
}

function findCompetenceEveil($brex_perso, $brex_competence, $niveau)
{
  $brex_competences_eveil = brex_comp_eveil::findByRelation1N(array('perso' => $brex_perso->id, 'competence' => $brex_competence->id));
  if (count($brex_competences_eveil) == 0) {
    dieWithNotFound('Storage exception : competence eveil found');
  }

  $brex_competences_eveil_filtrees = array_filter($brex_competences_eveil, function ($brex_competence_eveil) use ($niveau) {
    return $brex_competence_eveil->niveau == $niveau;
  });

  //var_dump($brex_competences_eveil_filtrees);

  if (count($brex_competences_eveil_filtrees) > 1) {
    dieWithBadRequest('Storage exception : several competences found with niveau: ' . $niveau);
  } else if (count($brex_competences_eveil_filtrees) == 0) {
    dieWithNotFound('Storage exception : competence not found for niveau: ' . $niveau);
  }

  return $brex_competences_eveil_filtrees[array_keys($brex_competences_eveil_filtrees)[0]];
}

function createAmelioration($brex_competence_eveil)
{
  $amelioration = new Amelioration();
  $amelioration->perso_gumi_id = $brex_competence_eveil->perso->gumi_id;
  $amelioration->skill_id_base = $brex_competence_eveil->competence->gumi_id;
  if ($amelioration->skill_id_new) {
    $amelioration->skill_id_new = $brex_competence_eveil->comp_amelio->gumi_id;
  }
  $amelioration->niveau = $brex_competence_eveil->niveau;

  $formule = createFormule($brex_competence_eveil);

  if ($formule) {
    $formule->gils = $brex_competence_eveil->gils;
    $amelioration->formule = $formule;
  }

  return $amelioration;
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
