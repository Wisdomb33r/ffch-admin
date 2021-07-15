<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "./includes/skill_class.php";

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $competence = json_decode ( file_get_contents ( 'php://input' ) );
  if (isset ( $competence->gumi_id ) && $competence->gumi_id) {
    $brex_competences = brex_competence::finderParGumiId ( $competence->gumi_id );
    if (count ( $brex_competences ) > 0) {
      http_response_code ( 400 );
      $errors = array ();
      $errors [] = 'Duplicate key exception : Gumi id ' . $competence->gumi_id . ' already exists';
      echo json_encode ( $errors );
    } else {
      $values = createPropertyArray ( $competence );
      $brex_competence = new brex_competence ( $values );
      updateRelations ( $brex_competence, $competence );
      storeAndRespond ( $brex_competence, $competence, 201 );
    }
  } else {
    http_response_code ( 400 );
    $errors = array ();
    $errors [] = 'Format exception : cannot save without Gumi id';
    echo json_encode ( $errors );
  }
} else if ($_SERVER ['REQUEST_METHOD'] == 'PUT') {
  $competence = json_decode ( file_get_contents ( 'php://input' ) );
  if (isset ( $competence->gumi_id ) && $competence->gumi_id) {
    $brex_competences = brex_competence::finderParGumiId ( $competence->gumi_id );
    if (count ( $brex_competences ) == 0) {
      dieWithBadRequest ( 'Missing target exception : Gumi id ' . $competence->gumi_id . ' does not exists' );
    } else if (count ( $brex_competences ) > 1) {
      dieWithBadRequest ( 'Duplicate key exception : Gumi id ' . $competence->gumi_id . ' found several times in DB' );
    } else {
      $brex_competence = $brex_competences [0];
      $values = createPropertyArray ( $competence );
      $brex_competence->updateObject ( $values );
      updateRelations ( $brex_competence, $competence );
      storeAndRespond ( $brex_competence, $competence, 200 );
    }
  } else {
    http_response_code ( 400 );
    $errors = array ();
    $errors [] = 'Format exception : cannot save without Gumi id';
    echo json_encode ( $errors );
  }
} else {
  if (isset ( $_GET ['id'] )) {
    $brex_competences = brex_competence::finderParGumiId ( $_GET ['id'] );
    if (count ( $brex_competences ) > 0) {
      $competence = new Competence ( $brex_competences [0] );
      echo json_encode ( $competence, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    } else {
      http_response_code ( 404 );
    }
  } else {
    http_response_code ( 400 );
  }
}
function dieWithBadRequest($errorMessages) {
  http_response_code ( 400 );
  echo json_encode ( is_array ( $errorMessages ) ? $errorMessages : array ($errorMessages) );
  die ();
}
function dieWithNotFound($errorMessages) {
  http_response_code ( 404 );
  echo json_encode ( is_array ( $errorMessages ) ? $errorMessages : array ($errorMessages) );
  die ();
}
function createPropertyArray($competence) {
  $values = array ();
  if (isset ( $competence->nom ))
    $values ['nom'] = $competence->nom;
  if (isset ( $competence->nom_en ))
    $values ['nom_en'] = $competence->nom_en;
  if (isset ( $competence->description ))
    $values ['description'] = $competence->description;
  else
    $values ['description'] = '';
  if (isset ( $competence->effet ))
    $values ['effet'] = $competence->effet;
  $values ['puissance'] = isset ( $competence->puissance ) && $competence->puissance > 0 ? $competence->puissance : '';
  if (isset ( $competence->physique ) && $competence->physique)
    $values ['physique'] = '1';
  else
    $values ['physique'] = '0';
  if (isset ( $competence->magique ) && $competence->magique)
    $values ['magique'] = '1';
  else
    $values ['magique'] = '0';
  if (isset ( $competence->hybride ) && $competence->hybride)
    $values ['hybride'] = '1';
  else
    $values ['hybride'] = '0';
  if (isset ( $competence->fixe ) && $competence->fixe)
    $values ['fixe'] = '1';
  else
    $values ['fixe'] = '0';
  if (isset ( $competence->esper ) && $competence->esper)
    $values ['esper'] = '1';
  else
    $values ['esper'] = '0';
  $values ['pm'] = isset ( $competence->pm ) && $competence->pm > 0 ? $competence->pm : '';
  $values ['lb'] = isset ( $competence->lb ) && $competence->lb > 0 ? $competence->lb : '';
  $values ['ep'] = isset ( $competence->ep ) && $competence->ep > 0 ? $competence->ep : '';
  $values ['hits'] = isset ($competence->hits) && $competence->hits > 0 ? $competence->hits : '';
  $values ['frames'] = isset ($competence->frames) && ($competence->frames || $competence->frames == '0') ? $competence->frames : '';
  $values ['damages'] = isset ($competence->damages) && $competence->damages ? $competence->damages : '';
  $values ['elements'] = isset ( $competence->elements ) ? $competence->elements : '';
  $values ['gumi_id'] = $competence->gumi_id;
  if (isset ( $competence->gumi_id_lie )) {
    $values ['gumi_id_lie'] = $competence->gumi_id_lie;
  }
  if (isset ( $competence->enhanced ))
    $values ['enhanced'] = ($competence->enhanced == true) ? '1' : '0';

  return $values;
}
function updateRelations($brex_competence, $competence) {
  if (isset ( $competence->categorie ) && ($categorie = brex_compet_categ::findByPrimaryId ( $competence->categorie )))
    $brex_competence->setrelationcategorie ( $categorie );
  if (isset ( $competence->icone ) && ($icone = brex_compet_image::findByPrimaryId ( $competence->icone )))
    $brex_competence->setrelationicone ( $icone );
}
function storeAndRespond($brex_competence, $competence, $successCode) {
  if ($brex_competence->store ()) {
    $brex_competences = brex_competence::finderParGumiId ( $competence->gumi_id );
    if (count ( $brex_competences ) > 0) {
      http_response_code ( $successCode );
      $competence = new Competence ( $brex_competences [0] );
      echo json_encode ( $competence, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    } else {
      http_response_code ( 500 );
      $errors = array ();
      $errors [] = 'Unexpected error occurred, stored gumi id ' . $competence->gumi_id . ' not found';
      echo json_encode ( $errors );
    }
  } else {
    http_response_code ( 400 );
    echo json_encode ( $brex_competence->errors );
  }
}

?>
