<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "./skill_class.php";

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $competence = json_decode(file_get_contents('php://input'));
  if (isset ($competence->gumi_id) && $competence->gumi_id) {
    $brex_competences = brex_competence::finderParGumiId($competence->gumi_id);
    if (count($brex_competences) > 0) {
      http_response_code(400);
      $errors = array();
      $errors [] = 'Duplicate key exception : Gumi id ' . $competence->gumi_id . ' already exists';
      echo json_encode($errors);
    } else {
      $values = createPropertyArray($competence);
      $brex_competence = new brex_competence ($values);
      updateRelations($brex_competence, $competence);
      storeAndRespond($brex_competence, $competence, 201);
    }
  } else {
    http_response_code(400);
    $errors = array();
    $errors [] = 'Format exception : cannot save without Gumi id';
    echo json_encode($errors);
  }
} else if ($_SERVER ['REQUEST_METHOD'] == 'PUT') {
  $competence = json_decode(file_get_contents('php://input'));
  if (isset ($competence->gumi_id) && $competence->gumi_id) {
    $brex_competences = brex_competence::finderParGumiId($competence->gumi_id);
    if (count($brex_competences) == 0) {
      dieWithBadRequest('Missing target exception : Gumi id ' . $competence->gumi_id . ' does not exists');
    } else if (count($brex_competences) > 1) {
      dieWithBadRequest('Duplicate key exception : Gumi id ' . $competence->gumi_id . ' found several times in DB');
    } else {
      $brex_competence = $brex_competences[0];
      $values = createPropertyArray($competence);
      $brex_competence->updateObject($values);
      updateRelations($brex_competence, $competence);
      storeAndRespond($brex_competence, $competence, 200);
    }
  } else {
    http_response_code(400);
    $errors = array();
    $errors [] = 'Format exception : cannot save without Gumi id';
    echo json_encode($errors);
  }
} else {
  if (isset ($_GET ['id'])) {
    $brex_competences = brex_competence::finderParGumiId($_GET ['id']);
    if (count($brex_competences) > 0) {
      $competence = new Competence ($brex_competences [0]);
      echo json_encode($competence, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    } else {
      http_response_code(404);
    }
  } else {
    http_response_code(400);
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

function createPropertyArray($competence)
{
  $values = array();
  if (isset ($competence->nom))
    $values ['nom'] = $competence->nom;
  if (isset ($competence->nom_en))
    $values ['nom_en'] = $competence->nom_en;
  if (isset ($competence->description))
    $values ['description'] = $competence->description;
  if (isset ($competence->effet))
    $values ['effet'] = $competence->effet;
  if (isset ($competence->puissance))
    $values ['puissance'] = $competence->puissance;
  if (isset ($competence->physique))
    $values ['physique'] = $competence->physique;
  if (isset ($competence->magique))
    $values ['magique'] = $competence->magique;
  if (isset ($competence->hybride))
    $values ['hybride'] = $competence->hybride;
  if (isset ($competence->pm))
    $values ['pm'] = $competence->pm;
  if (isset ($competence->lb))
    $values ['lb'] = $competence->lb;
  if (isset ($competence->ep))
    $values ['ep'] = $competence->ep;
  if (isset ($competence->hits))
    $values ['hits'] = $competence->hits;
  if (isset ($competence->frames))
    $values ['frames'] = $competence->frames;
  if (isset ($competence->damages))
    $values ['damages'] = $competence->damages;
  $values ['gumi_id'] = $competence->gumi_id;
  if (isset ($competence->enhanced))
    $values ['enhanced'] = ($competence->enhanced == true) ? '1' : '0';

  return $values;
}

function updateRelations($brex_competence, $competence)
{
  if (isset ($competence->categorie) && ($categorie = brex_compet_categ::findByPrimaryId($competence->categorie)))
    $brex_competence->setrelationcategorie($categorie);
  if (isset ($competence->icone) && ($icone = brex_compet_image::findByPrimaryId($competence->icone)))
    $brex_competence->setrelationicone($icone);
}

function storeAndRespond($brex_competence, $competence, $successCode)
{
  if ($brex_competence->store()) {
    $brex_competences = brex_competence::finderParGumiId($competence->gumi_id);
    if (count($brex_competences) > 0) {
      http_response_code($successCode);
      $competence = new Competence ($brex_competences [0]);
      echo json_encode($competence, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    } else {
      http_response_code(500);
      $errors = array();
      $errors [] = 'Unexpected error occurred, stored gumi id ' . $competence->gumi_id . ' not found';
      echo json_encode($errors);
    }
  } else {
    http_response_code(400);
    echo json_encode($brex_competence->errors);
  }
}

?>
