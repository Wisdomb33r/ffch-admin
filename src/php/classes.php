<?php

require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "../gestion/genscripts/object_brex_objet_categ.class.php";

class ObjetCategorie
{
  public $gumiId;
  public $ffchId;
  public $name;

  function __construct($brex_objet_categ)
  {
    $this->gumiId = $brex_objet_categ->gumi_id;
    $this->ffchId = $brex_objet_categ->id;
    $this->name = $brex_objet_categ->nom;
  }
}

class ObjetCarac
{
  public $pv;
  public $pm;
  public $att;
  public $def;
  public $mag;
  public $psy;

  function __construct($pv, $pm, $att, $def, $mag, $psy)
  {
    $this->pv = $pv;
    $this->pm = $pm;
    $this->att = $att;
    $this->def = $def;
    $this->mag = $mag;
    $this->psy = $psy;

  }
}

class Objet
{
  public $id;
  public $categorie;
  public $nom;
  public $nom_en;
  public $stars;
  public $icone;
  public $gumi_id;
  public $description;
  public $description_en;
  public $effet;
  public $effet_en;
  public $carac;
  public $caracp;
  public $competences;

  function __construct($brex_objet)
  {
    $this->id = $brex_objet->id;
    $this->categorie = new ObjetCategorie($brex_objet->categorie);
    $this->nom = $brex_objet->nom;
    $this->nom_en = $brex_objet->nom_en;
    $this->stars = $brex_objet->stars;
    $this->description = $brex_objet->description;
    $this->description_en = $brex_objet->description_en;
    $this->effet = $brex_objet->effet;
    $this->effet_en = $brex_objet->effet_en;
    $this->carac = new ObjetCarac($brex_objet->pv, $brex_objet->pm, $brex_objet->att, $brex_objet->def, $brex_objet->mag, $brex_objet->psy);
    $this->caracp = new ObjetCarac($brex_objet->pvp, $brex_objet->pmp, $brex_objet->attp, $brex_objet->defp, $brex_objet->magp, $brex_objet->psyp);

    if (strlen($brex_objet->img) > 0) {
      $this->icone = $brex_objet->getImageimgPath();
    }
    $this->gumi_id = $brex_objet->gumi_id;
  }
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

class Ingredient
{
  public $gumi_id;
  public $materiau;
  public $quantite;
}

class Formule
{
  public $ingredients;
  public $gils;
}

/*class brex_materiaux_eveil
{
  public $relation1Nmateriau1;
  public $relation1Nmateriau2;
  public $relation1Nmateriau3;
  public $relation1Nmateriau4;
  public $relation1Nmateriau5;
  public $nbmateriau1;
  public $nbmateriau2;
  public $nbmateriau3;
  public $nbmateriau4;
  public $nbmateriau5;
}*/

const nbMateriauxEveilMin = 1;
const nbMateriauxEveilMax = 5;

function createFormule($brex_materiaux_eveil)
{
  $formule = new Formule();

  for ($i = nbMateriauxEveilMin; $i <= nbMateriauxEveilMax; ++$i) {

    $ingredient = createIngredient($brex_materiaux_eveil, $i);
    if ($ingredient) {
      $formule->ingredients[] = $ingredient;
    }
  }

  return $formule;
}

function createIngredient($brex_materiaux_eveil, $numeroAttributMateriau)
{
  $nomAttributMateriau = 'materiau' . $numeroAttributMateriau;
  $nomAttributNbMateriau = 'nbmateriau' . $numeroAttributMateriau;

  $brex_materiau = $brex_materiaux_eveil->$nomAttributMateriau;
  $quantiteMateriau = $brex_materiaux_eveil->$nomAttributNbMateriau;

  if (!$brex_materiau || $quantiteMateriau == 0) {
    return null;
  }

  $ingredient = new Ingredient();
  $ingredient->materiau = new Objet($brex_materiau);
  $ingredient->gumi_id = $brex_materiau->gumi_id;
  $ingredient->quantite = $quantiteMateriau;

  return $ingredient;
}

function updateMateriauxEveil($brex_materiaux_eveil, $formule)
{
  $numeroAttributMateriau = nbMateriauxEveilMin;
  foreach ($formule->ingredients as $ingredient) {
    updateMateriauEveil($brex_materiaux_eveil, $numeroAttributMateriau, $ingredient);

    ++$numeroAttributMateriau;
  }
}

function updateMateriauEveil($brex_materiaux_eveil, $numeroAttributMateriau, $ingredient)
{
  if ($numeroAttributMateriau > nbMateriauxEveilMax) {
    dieWithBadRequest('Format exception : Too many awakening materials, allowed number: ' . nbMateriauxEveilMax);
  }

  if (!$ingredient->quantite || $ingredient->quantite == 0) {
    dieWithBadRequest('Format exception : Missing quantity for awakening material with gumiId: ' . $ingredient->gumi_id);
  }

  if (!$ingredient->gumi_id) {
    dieWithBadRequest('Format exception : Missing gumiId for awakening material number: ' . $numeroAttributMateriau);
  }
  $brex_objet = findObjetByGumiId($ingredient->gumi_id);

  $nomMethodeSetRelation = 'setrelationmateriau' . $numeroAttributMateriau;
  $nomAttributNbMateriau = 'nbmateriau' . $numeroAttributMateriau;

  $brex_materiaux_eveil->$nomMethodeSetRelation($brex_objet);
  $brex_materiaux_eveil->$nomAttributNbMateriau = $ingredient->quantite;
}

?>

