<?php
require_once "../gestion/genscripts/object_brex_craft.class.php";
require_once "../gestion/genscripts/object_brex_craft_compo.class.php";
require_once "../gestion/genscripts/object_brex_objet.class.php";

require_once "classes.php";


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
    if (is_null($this->nb_resultat))
    {
      $this->nb_resultat = 1;
    }
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

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
/*
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
*/
} else {

  if (!isset ($_GET ['recette_gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find recette without recette_gumi_id');
  }

  if (!isset ($_GET ['recette_gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find recette eveil without resultat_gumi_id');
  }

  $brex_objet_recette = findObjetByGumiId($_GET ['recette_gumi_id']);
  $brex_objet_resultat = findObjetByGumiId($_GET ['resultat_gumi_id']);

  $brex_craft = findCraft($brex_objet_recette, $brex_objet_resultat);

  $recette = createRecette($brex_craft, $brex_objet_recette, $brex_objet_resultat);

  echo json_encode($recette, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

function findCraft($brex_objet_recette, $brex_objet_resultat)
{
  $brex_craft = brex_craft::findByRelation1N(array('recette' => $brex_objet_recette->id, 'resultat' => $brex_objet_resultat->id));

  if (count($brex_craft) > 1) {
    dieWithBadRequest('Storage exception : several recettes found with recette gumi ID: ' . $brex_objet_recette->gumi_id . ' and resultat gumi ID' . $brex_objet_resultat->gumi_id);
  } else if (count($brex_craft) == 0) {
    dieWithNotFound('Storage exception : recette not found');
  }
  return $brex_craft[0];
}

function createRecette($brex_craft, $brex_recette, $brex_resultat)
{
  $recette = new Recette($brex_craft);
  $recette->recette_gumi_id = $brex_recette->gumi_id;
  $recette->resultat_gumi_id = $brex_resultat->gumi_id;
  $recette->recette = new Objet($brex_recette);
  $recette->resultat = new Objet($brex_resultat);

/*  if ($brex_competence_eveil->comp_amelio && $brex_competence_eveil->comp_amelio->gumi_id) {
    $amelioration->skill_id_new = $brex_competence_eveil->comp_amelio->gumi_id;
  }
  $amelioration->niveau = $brex_competence_eveil->niveau;

  $formule = createFormule($brex_competence_eveil);

  if ($formule) {
    $formule->gils = $brex_competence_eveil->gils;
    $amelioration->formule = $formule;
  }

  $amelioration->released = $brex_competence_eveil->released ? true : false;
*/
  return $recette;
}

?>
