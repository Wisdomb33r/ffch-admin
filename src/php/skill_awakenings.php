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
  public $released;
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

  $amelioration = json_decode(file_get_contents('php://input'));

  if (!isset ($amelioration->perso_gumi_id) || !$amelioration->perso_gumi_id) {
    dieWithBadRequest('Format exception: Cannot save competence eveil without perso');
  }

  if (!isset ($amelioration->skill_id_base) || !$amelioration->skill_id_base) {
    dieWithBadRequest('Format exception: Cannot save competence eveil without base competence');
  }

  if (!isset ($amelioration->skill_id_new) || !$amelioration->skill_id_new) {
    dieWithBadRequest('Format exception: Cannot save competence eveil without enhanced competence');
  }

  if (!isset ($amelioration->niveau) || !$amelioration->niveau) {
    dieWithBadRequest('Format exception: Cannot save competence eveil without niveau');
  }

  if (!isset ($amelioration->formule) || !isset ($amelioration->formule->ingredients) || !is_array($amelioration->formule->ingredients) || count($amelioration->formule->ingredients) == 0) {
    dieWithBadRequest('Format exception : cannot save without awakening materials');
  }

  $brex_perso = findPersoByGumiId($amelioration->perso_gumi_id);
  $brex_competence_base = findCompetenceByGumiId($amelioration->skill_id_base);
  $brex_competence_amelioree = findCompetenceByGumiId($amelioration->skill_id_new);

  checkThatNoCompetenceEveilExists($brex_perso, $brex_competence_base, $amelioration->niveau);

  $brex_competence_eveil = createAndValidateCompetenceEveil($amelioration, $brex_perso, $brex_competence_base, $brex_competence_amelioree);
  $brex_competence_eveil->store();

  $stored_brex_competence_eveil = findCompetenceEveil($brex_perso, $brex_competence_base, $amelioration->niveau);
  $stored_amelioration = createAmelioration($stored_brex_competence_eveil);

  echo json_encode($stored_amelioration, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
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
  $brex_competences_eveil = findCompetencesEveil($brex_perso, $brex_competence);
  if (count($brex_competences_eveil) == 0) {
    dieWithNotFound('Storage exception : competence eveil not found');
  }

  $brex_competence_eveil = filtreCompetencesEveilParNiveau($brex_competences_eveil, $niveau);

  if (!$brex_competence_eveil) {
    dieWithNotFound('Storage exception : competence not found for niveau: ' . $niveau);
  }

  return $brex_competence_eveil;
}

function checkThatNoCompetenceEveilExists($brex_perso, $brex_competence, $niveau)
{
  $brex_competences_eveil = findCompetencesEveil($brex_perso, $brex_competence);

  $brex_competence_eveil = filtreCompetencesEveilParNiveau($brex_competences_eveil, $niveau);

  if ($brex_competence_eveil) {
    dieWithBadRequest('Storage exception : found existing competence with niveau: ' . $niveau);
  }
}

function findCompetencesEveil($brex_perso, $brex_competence)
{
  return brex_comp_eveil::findByRelation1N(array('perso' => $brex_perso->id, 'competence' => $brex_competence->id));
}

function filtreCompetencesEveilParNiveau($brex_competences_eveil, $niveau)
{
  $brex_competences_eveil_filtrees = array_filter($brex_competences_eveil, function ($brex_competence_eveil) use ($niveau) {
    return $brex_competence_eveil->niveau == $niveau;
  });

  //var_dump($brex_competences_eveil_filtrees);

  if (count($brex_competences_eveil_filtrees) > 1) {
    dieWithBadRequest('Storage exception : several competences found with niveau: ' . $niveau);
  }

  $brex_competence_eveil = null;
  if (count($brex_competences_eveil_filtrees) == 1) {
    $brex_competence_eveil = $brex_competences_eveil_filtrees[array_keys($brex_competences_eveil_filtrees)[0]];
  }

  return $brex_competence_eveil;
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

  $amelioration->released = $brex_competence_eveil->released ? true : false;

  return $amelioration;
}

function createAndValidateCompetenceEveil($amelioration, $brex_perso, $brex_competence_base, $brex_competence_amelioree)
{
  $brex_competence_eveil = new brex_comp_eveil(array());
  $brex_competence_eveil->setrelationperso($brex_perso);
  $brex_competence_eveil->setrelationcompetence($brex_competence_base);
  $brex_competence_eveil->setrelationcomp_amelio($brex_competence_amelioree);

  $brex_competence_eveil->released = ($amelioration->released == true) ? '1' : '0';

  updateMateriauxEveil($brex_competence_eveil, $amelioration->formule);

  $brex_competence_eveil->niveau = $amelioration->niveau;
  $brex_competence_eveil->gils = $amelioration->formule->gils;


  if (!$brex_competence_eveil->verifyValues()) {
    dieWithBadRequest(array_merge($brex_competence_eveil->errors, (array)'Format exception: Validation of brex_comp_eveil failed'));
  }

  return $brex_competence_eveil;
}

?>
