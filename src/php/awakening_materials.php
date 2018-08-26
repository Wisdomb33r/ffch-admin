<?php
require_once "../gestion/genscripts/object_brex_perso_eveil.class.php";
require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "classes.php";

class Ingredient {
  public $gumi_id;
  public $materiau;
  public $quantite;
}

class UniteMateriauxEveil {
  public $unite_numero;
  public $materiaux;
}

const nbMateriauxMin = 1;
const nbMateriauxMax = 5;

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

  $uniteMateriauxEveil = json_decode ( file_get_contents ( 'php://input' ) );
  if (! isset ( $uniteMateriauxEveil->unite_numero ) || ! $uniteMateriauxEveil->unite_numero) {
    dieWithBadRequest ( 'Format exception : cannot save without unit number' );
  }

  if (! isset ( $uniteMateriauxEveil->materiaux ) || ! is_array ( $uniteMateriauxEveil->materiaux ) || count ( $uniteMateriauxEveil->materiaux ) == 0) {
    dieWithBadRequest ( 'Format exception : cannot save without awakening materials' );
  }

  $brex_unite = findUnitByNumber($uniteMateriauxEveil->unite_numero);
  $brex_persos_eveil = brex_perso_eveil::findByRelation1N( array ('unit' => $brex_unite->id) );
  if (count ( $brex_persos_eveil ) > 0) {
    dieWithBadRequest ( 'Storage exception : found existing awakening materials for unit with numero: ' . $brex_unite->numero );
  }

  $brex_perso_eveil = createAndValidatePersoEveil($brex_unite, $uniteMateriauxEveil);
  $brex_perso_eveil->store();

  $stored_brex_perso_eveil = findPersoEveilByUnit($brex_unite);
  $stored_unite_materiaux_eveil = createUniteMateriauxEveil($brex_unite, $brex_perso_eveil);

  echo json_encode ( $stored_unite_materiaux_eveil, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
} else {
  if (!isset ( $_GET ['numero'] )) {
    dieWithBadRequest('Format exception: Cannot find unit without number');
  }

  $brex_unite = findUnitByNumber($_GET ['numero']);
  $brex_perso_eveil = findPersoEveilByUnit($brex_unite);
  $unite_materiaux_eveil = createUniteMateriauxEveil($brex_unite, $brex_perso_eveil);

  echo json_encode ( $unite_materiaux_eveil, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
}

function findUnitByNumber($number)
{
  $brex_unites = brex_unit::finderParNumero ( $number );
  if (count ( $brex_unites ) > 1) {
    dieWithBadRequest ( 'Storage exception : several units found with numero: ' . $number );
  } else if (count ( $brex_unites ) == 0) {
    dieWithNotFound ( 'Storage exception : unit not found' );
  }
  return $brex_unites[0];
}

function findPersoEveilByUnit($brex_unite)
{
  $brex_persos_eveil = brex_perso_eveil::findByRelation1N( array ('unit' => $brex_unite->id) );
  if (count ( $brex_persos_eveil ) > 1) {
    dieWithBadRequest ( 'Storage exception : several sets of awakening materials found for unit with numero: ' . $brex_unite->numero );
  } else if (count ( $brex_persos_eveil ) == 0) {
    dieWithNotFound ( 'Storage exception : awakening material not found' );
  }
  return $brex_persos_eveil[0];
}

function createUniteMateriauxEveil($brex_unite, $brex_perso_eveil)
{
  $uniteMateriauxEveil = new UniteMateriauxEveil();
  $uniteMateriauxEveil->unite_numero=$brex_unite->numero;

  for ($i = nbMateriauxMin; $i <= nbMateriauxMax; ++$i)
  {
    $materiauEveil = createUniteMateriauEveil($brex_perso_eveil, $i);
    if ($materiauEveil) {
      $uniteMateriauxEveil->materiaux[] = createUniteMateriauEveil($brex_perso_eveil, $i);
    }
  }

  return $uniteMateriauxEveil;
}

function createUniteMateriauEveil($brex_perso_eveil, $numeroAttributMateriau)
{
  $nomAttributMateriau = 'materiau' . $numeroAttributMateriau;
  $nomAttributNbMateriau = 'nbmateriau' . $numeroAttributMateriau;

  $brex_materiau = $brex_perso_eveil->$nomAttributMateriau;
  $quantiteMateriau = $brex_perso_eveil->$nomAttributNbMateriau;

  if (!$brex_materiau || $quantiteMateriau == 0)
  {
    return null;
  }
  $uniteMateriauEveil = new Ingredient();
  $uniteMateriauEveil->materiau = new Objet($brex_materiau);
  $uniteMateriauEveil->gumi_id = $brex_materiau->gumi_id;
  $uniteMateriauEveil->quantite = $quantiteMateriau;

  return $uniteMateriauEveil;
}

function findObjetByGumiId($gumi_id)
{
  $brex_objets = brex_objet::finderParGumiId($gumi_id);
  if (count($brex_objets) > 1) {
    dieWithBadRequest('Storage exception : several objects found with gumiId: ' . $gumi_id);
  } else if (count($brex_objets) == 0) {
    dieWithNotFound('Storage exception : object not found');
  }
  return $brex_objets[0];
}

function createAndValidatePersoEveil($brex_unite, $uniteMateriauxEveil)
{
  $brex_perso_eveil = new brex_perso_eveil(array ());
  $brex_perso_eveil->setrelationunit($brex_unite);

  $numeroAttributMateriau = nbMateriauxMin;
  foreach ($uniteMateriauxEveil->materiaux as $materiauEveil) {
    updatePersoEveil($brex_perso_eveil, $numeroAttributMateriau, $materiauEveil);

    ++$numeroAttributMateriau;
  }

  if (!$brex_perso_eveil->verifyValues()) {
    dieWithBadRequest(array_merge($brex_perso_eveil->errors, (array)'Format exception: Validation of brex_perso_eveil failed'));
  }

  return $brex_perso_eveil;
}

function updatePersoEveil($brex_perso_eveil, $numeroAttributMateriau, $materiauEveil)
{
  if ($numeroAttributMateriau > nbMateriauxMax)
  {
    dieWithBadRequest('Format exception : Too many awakening materials, allowed number: ' . nbMateriauxMax);
  }

  if (! $materiauEveil->quantite || $materiauEveil->quantite == 0)
  {
    dieWithBadRequest('Format exception : Missing quantity for awakening material with gumiId: ' . $materiauEveil->gumi_id);
  }

  if ( !$materiauEveil->gumi_id )
  {
    dieWithBadRequest('Format exception : Missing gumiId for awakening material number: ' . $numeroAttributMateriau);
  }
  $brex_objet = findObjetByGumiId($materiauEveil->gumi_id);

  $nomMethodeSetRelation = 'setrelationmateriau' . $numeroAttributMateriau;
  $nomAttributNbMateriau = 'nbmateriau' . $numeroAttributMateriau;

  $brex_perso_eveil->$nomMethodeSetRelation($brex_objet);
  $brex_perso_eveil->$nomAttributNbMateriau = $materiauEveil->quantite;
}


?>
