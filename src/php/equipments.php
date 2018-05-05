<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../gestion/genscripts/object_brex_unit_carac.class.php";
require_once "../gestion/genscripts/object_brex_objet_categ.class.php";
require_once "../gestion/genscripts/object_brex_perso.class.php";

class UniteEquipements {
  public $unite_ffch_id;
  public $unite_numero;
  public $equipements_ffch_ids;
}

function dieWithBadRequest($errorMessages) {
  http_response_code ( 400 );
  echo json_encode ( is_array ( $errorMessages ) ? $errorMessages : array ($errorMessages
) );
die ();
}

function dieWithNotFound($errorMessages) {
  http_response_code ( 404 );
  echo json_encode ( is_array ( $errorMessages ) ? $errorMessages : array ($errorMessages
) );
die ();
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {

  $uniteEquipements = json_decode ( file_get_contents ( 'php://input' ) );
  if (! isset ( $uniteEquipements->unite_numero ) || ! $uniteEquipements->unite_numero) {
    dieWithBadRequest ( 'Format exception : cannot save without unit number' );
  }

  if (! isset ( $uniteEquipements->equipements_ffch_ids ) || ! is_array ( $uniteEquipements->equipements_ffch_ids ) || count ( $uniteEquipements->equipements_ffch_ids ) == 0) {
    dieWithBadRequest ( 'Format exception : cannot save without equipment ids' );
  }

  $brex_unite = findUnitByNumber($uniteEquipements->unite_numero);
  $brex_perso = $brex_unite->perso;
  if (count ( $brex_perso->equipement ) > 0)
  {
    dieWithBadRequest( 'Storage exception: Found existing equipements for unit' );
  }

  updateAndValidatePersoEquipments($brex_perso, $uniteEquipements);
  $brex_perso->store();

  http_response_code ( 200 );
} else {
  if (!isset ( $_GET ['numero'] )) {
    dieWithBadRequest('Format exception: Cannot find unit without number');
  }

  $brex_unite = findUnitByNumber($_GET ['numero']);

  $uniteEquipements = createUniteEquipments($brex_unite);

  echo json_encode ( $uniteEquipements, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
}

function findUnitByNumber($number)
{
  $brex_unites = brex_unit::finderParNumero ( $number );
  if (count ( $brex_unites ) > 1) {
    dieWithBadRequest ( 'Storage exception : several units found with numero: ' . $number );
  } else if (count ( $brex_unites ) == 0) {
    dieWithBadRequest ( 'Storage exception : unit not found' );
  }
  return $brex_unites[0];
}

function createUniteEquipments($brex_unite)
{
  $brex_perso = $brex_unite->perso;
  if (count ( $brex_perso->equipement ) == 0)
  {
    dieWithNotFound('Storage exception: No equipment found for unit');
  }

  $uniteEquipements = new UniteEquipements();
  $uniteEquipements->unite_ffch_id = $brex_unite->id;
  $uniteEquipements->unite_numero=$brex_unite->numero;

  $uniteEquipements->equipements_ffch_ids = array();
  foreach ($brex_perso->equipement as $equipement) {
    $uniteEquipements->equipements_ffch_ids[] = $equipement->id;
  }

  return $uniteEquipements;
}

function updateAndValidatePersoEquipments($brex_perso, $uniteEquipements)
{
  foreach ($uniteEquipements->equipements_ffch_ids as $equipement_id) {
    $brex_equipment = brex_objet_categ::findByPrimaryId($equipement_id);

    if (! $brex_equipment)
    {
      dieWithBadRequest('Format exception : Did not find equipment with id' . $equipement_id);
    }
    $brex_perso->addrelationequipement($brex_equipment);
  }

  if (! $brex_perso->verifyValues ()) {
    dieWithBadRequest ( array_merge ( $brex_perso->errors, 'Format exception: Validation of brex_perso failed' ) );
  }
}

?>
