<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";

require_once "includes/die_with.php";
require_once "includes/skill_class.php";
require_once "includes/unit_skill_class.php";

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  dieWithBadRequest('Not implemented yet');
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
          storeAndRespond ( $brex_unit_comp, $competence, 200 );
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

?>
