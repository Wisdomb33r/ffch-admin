<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";

require_once "includes/die_with.php";
require_once "includes/skill_class.php";
require_once "includes/unit_skill_class.php";

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $uniteCompetence = json_decode ( file_get_contents ( 'php://input' ) );

  if (!isset ($uniteCompetence->competence) || !$uniteCompetence->competence) {
    dieWithBadRequest('Format exception : cannot save without Compétence');
  }

  if (!isset ($uniteCompetence->competence->id) || !$uniteCompetence->competence->id) {
    dieWithBadRequest('Format exception : cannot save without Compétence id');
  }

  if (!isset ($uniteCompetence->niveau) || !$uniteCompetence->niveau) {
    dieWithBadRequest('Format exception : cannot save without niveau');
  }

  $post_query_string = $_SERVER ['QUERY_STRING'];
  if (!isset($post_query_string) || !$post_query_string) {
    dieWithBadRequest('Format exception: Query string must contain uniteId');
  }

  parse_str($post_query_string, $parsed_query_string);

  if (!isset ( $parsed_query_string ['uniteId'] )) {
      dieWithBadRequest('Format exception : cannot save without Unité id');
  }

  $brex_unit_comp = createAndValidateBrexUnitComp($uniteCompetence, $parsed_query_string ['uniteId']);
  storeAndRespond($brex_unit_comp, 201);

} else if ($_SERVER ['REQUEST_METHOD'] == 'PUT') {
  $uniteCompetence = json_decode ( file_get_contents ( 'php://input' ) );
  if (isset($uniteCompetence->id) && $uniteCompetence->id) {
    $brex_unit_comp = brex_unit_comp::findByPrimaryId($uniteCompetence->id);

        if (count ( $brex_unit_comp ) == 0) {
          dieWithBadRequest ( 'Missing target exception : UniteCompetence with id ' . $uniteCompetence->id . ' does not exists' );
        } else if ($brex_unit_comp->competence->id != $uniteCompetence->competence->id) {
          dieWithBadRequest ( 'Storage exception : UniteCompetence with id ' . $uniteCompetence->id . ' is linked to Competence with id ' . $brex_unit_comp->competence->id . ', not '. $uniteCompetence->competence->id);
        } else {
          $brex_unit_comp->niveau = $uniteCompetence->niveau;
          storeAndRespond ( $brex_unit_comp, 200 );
        }

  } else {
    dieWithBadRequest('Storage exception: missing UniteCompetence id');
  }
} else {
  if (isset ($_GET ['id'])) {
    $unit_comp_id = $_GET ['id'];
    if ($brex_unit_comp = brex_unit_comp::findByPrimaryId($unit_comp_id)) {
      echo json_encode(new UniteCompetence($brex_unit_comp), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    } else {
      dieWithNotFound('Storage exception : no UniteCompetence found with ID: ' . $unit_comp_id);
    }
  }
}

function storeAndRespond($brex_unit_comp, $successCode) {
  if ($brex_unit_comp->store ()) {
    if ($stored_brex_unit_comp = brex_unit_comp::findByPrimaryId ( $brex_unit_comp->id )) {
      http_response_code ( $successCode );
      $uniteCompetence = new UniteCompetence ( $stored_brex_unit_comp );
      echo json_encode ( $uniteCompetence, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    } else {
      http_response_code ( 500 );
      $errors = array ();
      $errors [] = 'Unexpected error occurred, stored FFCH id ' . $brex_unit_comp->id . ' not found';
      echo json_encode ( $errors );
    }
  } else {
    http_response_code ( 400 );
    echo json_encode ( $brex_unit_comp->errors );
  }
}


function createAndValidateBrexUnitComp($uniteCompetence, $uniteId)
{
  $brex_unit = brex_unit::findByPrimaryId($uniteId);
  if(!$brex_unit) {
    dieWithBadRequest('Storage exception: Unite with id ' . $uniteId .  ' not found.');
  }

  $brex_competence = brex_competence::findByPrimaryId($uniteCompetence->competence->id);
  if(!$brex_competence) {
    dieWithBadRequest('Storage exception: Competence with id ' . $uniteId . ' (gumiId=' . $uniteCompetence->competence->gumi_id . ') not found.');
  }

  $values = array();
  $values ['niveau'] = $uniteCompetence->niveau;

  $brex_unit_comp = new brex_unit_comp ($values);

  $brex_unit_comp->setrelationunit($brex_unit);
  $brex_unit_comp->setrelationcompetence($brex_competence);

  if (!$brex_unit_comp->verifyValues()) {
    dieWithBadRequest(array_merge($brex_unit_comp->errors, (array)'Format exception: Validation of brex_unit_comp failed for competence ' . $brex_competence->gumi_id));
  }

  return $brex_unit_comp;
}

?>
