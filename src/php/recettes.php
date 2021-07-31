<?php
require_once "../gestion/genscripts/object_brex_craft.class.php";
require_once "../gestion/genscripts/object_brex_craft_compo.class.php";
require_once "../gestion/genscripts/object_brex_objet.class.php";

require_once "includes/classes.php";
require_once "includes/die_with.php";

class Recette
{
  public $id;
  public $recette_gumi_id;
  public $resultat_gumi_id;
  public $recette;
  public $resultat;
  public $craft_time;
  public $formule;
  public $nb_resultat;

  function __construct($brex_craft)
  {
    $this->id = $brex_craft->id;
    $this->craft_time = $brex_craft->craft_time;
    $this->nb_resultat = $brex_craft->nb_resultat;
    if (!isset($this->nb_resultat)) {
      $this->nb_resultat = 1;
    }
  }
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {

  $recette = json_decode(file_get_contents('php://input'));

  if (!isset ($recette->recette_gumi_id) || !$recette->recette_gumi_id) {
    dieWithBadRequest('Format exception: Cannot save recette without recette Gumi ID');
  }

  if (!isset ($recette->resultat_gumi_id) || !$recette->resultat_gumi_id) {
    dieWithBadRequest('Format exception: Cannot save recette without resultat Gumi ID');
  }

  if (!isset ($recette->nb_resultat) || !$recette->nb_resultat) {
    dieWithBadRequest('Format exception: Cannot save recette without number of crafted items');
  }

  if (!isset ($recette->formule) || !isset ($recette->formule->ingredients) || !is_array($recette->formule->ingredients) || count($recette->formule->ingredients) == 0) {
    dieWithBadRequest('Format exception : cannot save recette without materials');
  }

  if (!isset ($recette->formule) || !isset ($recette->formule->gils)) {
    dieWithBadRequest('Format exception : cannot save recette without price');
  }

  $brex_objet_recette = findObjetByGumiId($recette->recette_gumi_id);
  $brex_objet_resultat = findObjetByGumiId($recette->resultat_gumi_id);

  checkThatNoCraftExists($brex_objet_recette, $brex_objet_resultat);
  checkThatAllIngredientsExist($recette->formule);

  $brex_craft = createAndValidateCraft($brex_objet_recette, $brex_objet_resultat, $recette->nb_resultat, $recette->formule->gils);
  $brex_craft->store();

  $brex_craft_compos = createAndValidateCraftCompos($brex_craft, $recette->formule);
  storeCraftCompos($brex_craft_compos);

  $stored_brex_craft = findCraft($brex_objet_recette, $brex_objet_resultat);
  $stored_brex_craft_compos = findCompos($stored_brex_craft);

  $stored_recette = createRecette($stored_brex_craft, $stored_brex_craft_compos, $brex_objet_recette, $brex_objet_resultat, $recette->recette_gumi_id);

  echo json_encode($stored_recette, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);

} else {

  if (!isset ($_GET ['recette_gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find recette without recette_gumi_id');
  }

  if (!isset ($_GET ['resultat_gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find recette without resultat_gumi_id');
  }

  $brex_objet_recette = findRecetteByGumiId($_GET ['recette_gumi_id']);
  $brex_objet_resultat = findObjetByGumiId($_GET ['resultat_gumi_id']);

  $brex_craft = findCraft($brex_objet_recette, $brex_objet_resultat);
  $brex_craft_compos = findCompos($brex_craft);

  $recette = createRecette($brex_craft, $brex_craft_compos, $brex_objet_recette, $brex_objet_resultat, $_GET ['recette_gumi_id']);

  echo json_encode($recette, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

function findRecetteByGumiId($gumi_id)
{
  $brex_objets = brex_objet::finderParGumiId($gumi_id);
  if (count($brex_objets) > 1) {
    dieWithBadRequest('Storage exception : several recettes found with gumiId: ' . $gumi_id);
  } else if (count($brex_objets) == 0) {
    dieWithNotFound('Storage exception : no recette found with gumiId: ' . $gumi_id);
  }
  return $brex_objets[0];
}

function findCraft($brex_objet_recette, $brex_objet_resultat)
{
  $brex_craft = brex_craft::findByRelation1N(array('recette' => $brex_objet_recette->id, 'resultat' => $brex_objet_resultat->id));;

  if (count($brex_craft) > 1) {
    dieWithBadRequest('Storage exception : several recettes found with recette gumi ID: ' . $brex_objet_recette->gumi_id . ' and resultat gumi ID: ' . $brex_objet_resultat->gumi_id);
  } else if (count($brex_craft) == 0) {
    dieWithNotFound('Storage exception : recette not found');
  }
  return $brex_craft[0];
}

function findCompos($brex_craft)
{
  return brex_craft_compo::findByRelation1N(array('craft' => $brex_craft->id));
}

function createFormuleFromCraft($brex_craft, $brex_craft_compos)
{
  $formule = new Formule();

  foreach ($brex_craft_compos as $compo) {
    $ingredient = createIngredientFromCraftCompo($compo);
    if ($ingredient) {
      $formule->ingredients[] = $ingredient;
    }
  }

  $formule->gils = $brex_craft->price;

  return $formule;
}

function createIngredientFromCraftCompo($brex_craft_compo)
{
  $ingredient = new Ingredient();
  $ingredient->materiau = new Objet($brex_craft_compo->composant);
  $ingredient->gumi_id = $brex_craft_compo->composant->gumi_id;
  $ingredient->quantite = $brex_craft_compo->nombre;

  return $ingredient;
}

function createRecette($brex_craft, $brex_craft_compos, $brex_recette, $brex_resultat, $brex_recette_gumi_id)
{
  $recette = new Recette($brex_craft);

  $recette->resultat_gumi_id = $brex_resultat->gumi_id;
  $recette->resultat = new Objet($brex_resultat);

  if (isset($brex_recette)) {
    $recette->recette_gumi_id = $brex_recette->gumi_id;
    $recette->recette = new Objet($brex_recette);
  } else {
    $recette->recette_gumi_id = $brex_recette_gumi_id;
  }

  $recette->formule = createFormuleFromCraft($brex_craft, $brex_craft_compos);

  return $recette;
}

function checkThatNoCraftExists($brex_objet_recette, $brex_objet_resultat)
{
  $brex_crafts = brex_craft::findByRelation1N(array('recette' => $brex_objet_recette->id, 'resultat' => $brex_objet_resultat->id));

  if (count($brex_crafts) > 0) {
    dieWithBadRequest('Storage exception : found existing craft with recette gumi ID: ' . $brex_objet_recette->gumi_id . ' and resultat gumi ID' . $brex_objet_resultat->gumi_id);
  }

}

function checkThatAllIngredientsExist($formule)
{
  foreach ($formule->ingredients as $ingredient) {
    if (!isset($ingredient->gumi_id)) {
      dieWithBadRequest('Storage exception : cannot use ingredient with missing gumi ID');
    }
    findObjetByGumiId($ingredient->gumi_id);
  }
}

function createAndValidateCraft($brex_objet_recette, $brex_objet_resultat, $nb_resultat, $gils)
{
  $brex_craft = new brex_craft(array());
  $brex_craft->setrelationrecette($brex_objet_recette);
  $brex_craft->setrelationresultat($brex_objet_resultat);

  $brex_craft->nb_resultat = $nb_resultat;
  $brex_craft->price = $gils;
  $brex_craft->craft_time = 0;

  if (!$brex_craft->verifyValues()) {
    dieWithBadRequest(array_merge($brex_craft->errors, (array)'Format exception: Validation of brex_craft failed'));
  }

  return $brex_craft;
}

function createAndValidateCraftCompos($brex_craft, $formule)
{
  $brex_craft_compos = array();

  foreach ($formule->ingredients as $ingredient) {
    $brex_craft_compos[] = createAndValidateCraftCompo($brex_craft, $ingredient);
  }

  return $brex_craft_compos;
}

function createAndValidateCraftCompo($brex_craft, $ingredient)
{
  $brex_craft_compo = new brex_craft_compo(array());
  $materiau = findObjetByGumiId($ingredient->gumi_id);

  $brex_craft_compo->setrelationcraft($brex_craft);
  $brex_craft_compo->setrelationcomposant($materiau);

  $brex_craft_compo->nombre = $ingredient->quantite;

  if (!$brex_craft_compo->verifyValues()) {
    dieWithBadRequest(array_merge($brex_craft->errors, (array)'Format exception: Validation of brex_craft_compo failed'));
  }

  return $brex_craft_compo;
}

function storeCraftCompos($brex_craft_compos)
{
  foreach ($brex_craft_compos as $brex_craft_compo) {
    $brex_craft_compo->store();
  }
}

?>
