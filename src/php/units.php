<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../gestion/genscripts/object_brex_unit_carac.class.php";
require_once "classes.php";
require_once "skill_class.php";


class Unite
{
  public $id;
  public $perso;
  public $numero;
  public $stars;
  public $limite;
  public $limite_en;
  public $lim_min;
  public $lim_max;
  public $lim_up_min;
  public $lim_up_max;
  public $lim_nb_niv;
  public $lim_hits;
  public $lim_frames;
  public $lim_damages;
  public $lim_cristals_niv_min;
  public $lim_cristals_niv_max;
  public $carac;
  public $competences;
  public $competencesActivees;
  public $caracEX;

  function __construct($brex_unit)
  {
    $this->id = $brex_unit->id;
    $this->perso = $brex_unit->perso->id;
    $this->numero = $brex_unit->numero;
    $this->stars = $brex_unit->stars;
    $this->limite = $brex_unit->limite;
    $this->limite_en = $brex_unit->limite_en;
    $this->lim_min = $brex_unit->lim_min;
    $this->lim_max = $brex_unit->lim_max;
    $this->lim_up_min = $brex_unit->lim_up_min;
    $this->lim_up_max = $brex_unit->lim_up_max;
    $this->lim_nb_niv = $brex_unit->lim_nb_niv;
    $this->lim_hits = $brex_unit->lim_hits;
    $this->lim_frames = $brex_unit->lim_frames;
    $this->lim_damages = $brex_unit->lim_damages;
    $this->lim_cristals_niv_min = $brex_unit->lim_cristals_niv_min;
    $this->lim_cristals_niv_max = $brex_unit->lim_cristals_niv_max;
  }
}

class UniteCarac
{
  // variables of the class
  public $id;
  public $level;
  public $level_max;
  public $base;
  public $pots;
  public $bonusBasePercent;
  public $bonusDoublehandPercent;
  public $bonusTrueDoublehandPercent;
  public $bonusDualwieldPercent;

  function __construct($brex_unit_carac)
  {
    $this->id = $brex_unit_carac->id;
    $this->level = $brex_unit_carac->level;
    $this->level_max = $brex_unit_carac->level_max;
    $this->base = new Caracteristiques($brex_unit_carac->pv, $brex_unit_carac->pm, $brex_unit_carac->att,
      $brex_unit_carac->def, $brex_unit_carac->mag, $brex_unit_carac->psy);
    $this->pots = new Caracteristiques($brex_unit_carac->pv_pots, $brex_unit_carac->pm_pots, $brex_unit_carac->att_pots,
      $brex_unit_carac->def_pots, $brex_unit_carac->mag_pots, $brex_unit_carac->psy_pots);
    $this->bonusBasePercent = new Caracteristiques($brex_unit_carac->pv_passif, $brex_unit_carac->pm_passif, $brex_unit_carac->att_passif,
      $brex_unit_carac->def_passif, $brex_unit_carac->mag_passif, $brex_unit_carac->psy_passif);
    $this->bonusDoublehandPercent = new Caracteristiques($brex_unit_carac->pv_dh, $brex_unit_carac->pm_dh, $brex_unit_carac->att_dh,
      $brex_unit_carac->def_dh, $brex_unit_carac->mag_dh, $brex_unit_carac->psy_dh);
    $this->bonusTrueDoublehandPercent = new Caracteristiques($brex_unit_carac->pv_tdh, $brex_unit_carac->pm_tdh, $brex_unit_carac->att_tdh,
      $brex_unit_carac->def_tdh, $brex_unit_carac->mag_tdh, $brex_unit_carac->psy_tdh);
    $this->bonusDualwieldPercent = new Caracteristiques($brex_unit_carac->pv_dw, $brex_unit_carac->pm_dw, $brex_unit_carac->att_dw,
      $brex_unit_carac->def_dw, $brex_unit_carac->mag_dw, $brex_unit_carac->psy_dw);
  }
}

class UniteCompetence
{
  // variables of the class
  public $id;
  public $competence;
  public $niveau;

  function __construct($brex_unit_comp)
  {
    $this->id = $brex_unit_comp->id;
    $this->competence = new Competence( $brex_unit_comp->competence );
    $this->niveau = $brex_unit_comp->niveau;
  }
}

function dieWithBadRequest($errorMessages)
{
  http_response_code(400);
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages
  ));
  die ();
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $unite = json_decode(file_get_contents('php://input'));
  if (!isset ($unite->numero) || !$unite->numero) {
    dieWithBadRequest('Format exception : cannot save without unit number');
  }

  if (!isset ($unite->carac) || !$unite->carac) {
    dieWithBadRequest('Format exception : cannot save without unit carac');
  }

  if (!isset ($unite->competences) || !is_array($unite->competences) || count($unite->competences) == 0) {
    dieWithBadRequest('Format exception : cannot save without unit competences');
  }

  $brex_unites = brex_unit::finderParNumero($unite->numero);
  if (count($brex_unites) > 1) {
    dieWithBadRequest('Storage exception : several units found with numero: ' . $unite->numero);
  } else if (count($brex_unites) == 0) {
    dieWithBadRequest('Storage exception : unit not found');
  }

  $unite_existante = $brex_unites [0];
  $brex_unite_carac_existantes = brex_unit_carac::findByRelation1N(array('unit' => $unite_existante->id
  ));
  $brex_unite_comps_existantes = brex_unit_comp::findByRelation1N(array('unit' => $unite_existante->id
  ));
  if ((count($brex_unite_carac_existantes) > 0) || (count($brex_unite_comps_existantes) > 0)) {
    dieWithBadRequest('Storage exception : found existing characteristics or competences for unit');
  }

  if ($unite_existante->stars != 8 && isset($unite->caracEX)) {
    dieWithBadRequest('Format exception : Cannot handle carac EX for non-NeoVision unit');
  } else if ($unite_existante->stars == 8 && !isset($unite->caracEX)) {
    dieWithBadRequest('Format exception : Missing carac EX for NeoVision unit');
  }

  $brex_unit_caracs = createAndValidateBrexUnitCaracs ( $unite, $unite_existante );
  $brex_unit_comp_array = createAndValidateBrexUnitCompArray ( $unite->competences, $unite_existante );
  $activated_unit_comp_array = createAndValidateBrexUnitCompArray ( $unite->competencesActivees, $unite_existante );
  copyUnitDataAndValidate ( $unite_existante, $unite );
  $unite_existante->store ();
  foreach ( $brex_unit_caracs as $brex_unit_carac ) {
    $brex_unit_carac->store ();
  }
  foreach ( $brex_unit_comp_array as $brex_unit_comp ) {
    $brex_unit_comp->store ();
  }
  foreach ( $activated_unit_comp_array as $brex_unit_comp ) {
    $brex_unit_comp->store ();
  }
  $unite_resultante = new Unite ( $unite_existante );
  echo json_encode($unite_resultante, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
} else {
  if (isset ($_GET ['numero'])) {
    $brex_unites = brex_unit::finderParNumero($_GET ['numero']);
    if (count($brex_unites) > 0) {
      $unite = new Unite ($brex_unites [0]);
      $brex_unite_caracs = brex_unit_carac::findByRelation1N(array('unit' => $unite->id
      ));
      $brex_unite_comps = brex_unit_comp::findByRelation1N(array('unit' => $unite->id
      ));
      if ((count($brex_unite_caracs) > 0) || (count($brex_unite_comps) > 0)) {
        updateUniteWithCarac($unite, $brex_unite_caracs);
        updateUniteWithCompetences($unite, $brex_unite_comps);
        echo json_encode($unite, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
      } else {
        http_response_code(404);
      }
    } else {
      http_response_code(404);
    }
  } else {
    http_response_code(400);
  }
}

function createAndValidateBrexUnitCaracs($unite, $brex_unite)
{
  $brex_unit_caracs = array();

  $brex_unit_caracs [] = createAndValidateBrexUnitCarac($unite->carac, $brex_unite);

  if ($unite->stars == 8) {
    foreach ($unite->caracEX as $caracEX) {
      $brex_unit_caracs [] = createAndValidateBrexUnitCarac($caracEX, $brex_unite);
    }
  }

  return $brex_unit_caracs;
}

function createAndValidateBrexUnitCarac($carac, $brex_unite)
{
  $values = array();
  if (isset ($carac->level))
    $values ['level'] = $carac->level;
  if (isset ($carac->level_max))
    $values ['level_max'] = $carac->level_max;
  if (isset ($carac->base->pv))
    $values ['pv'] = $carac->base->pv;
  if (isset ($carac->base->pm))
    $values ['pm'] = $carac->base->pm;
  if (isset ($carac->base->att))
    $values ['att'] = $carac->base->att;
  if (isset ($carac->base->def))
    $values ['def'] = $carac->base->def;
  if (isset ($carac->base->mag))
    $values ['mag'] = $carac->base->mag;
  if (isset ($carac->base->psy))
    $values ['psy'] = $carac->base->psy;
  if (isset ($carac->pots->pv))
    $values ['pv_pots'] = $carac->pots->pv;
  if (isset ($carac->pots->pm))
    $values ['pm_pots'] = $carac->pots->pm;
  if (isset ($carac->pots->att))
    $values ['att_pots'] = $carac->pots->att;
  if (isset ($carac->pots->def))
    $values ['def_pots'] = $carac->pots->def;
  if (isset ($carac->pots->mag))
    $values ['mag_pots'] = $carac->pots->mag;
  if (isset ($carac->pots->psy))
    $values ['psy_pots'] = $carac->pots->psy;
  if (isset ($carac->bonusBasePercent->pv))
    $values ['pv_passif'] = $carac->bonusBasePercent->pv;
  if (isset ($carac->bonusBasePercent->pm))
    $values ['pm_passif'] = $carac->bonusBasePercent->pm;
  if (isset ($carac->bonusBasePercent->att))
    $values ['att_passif'] = $carac->bonusBasePercent->att;
  if (isset ($carac->bonusBasePercent->def))
    $values ['def_passif'] = $carac->bonusBasePercent->def;
  if (isset ($carac->bonusBasePercent->mag))
    $values ['mag_passif'] = $carac->bonusBasePercent->mag;
  if (isset ($carac->bonusBasePercent->psy))
    $values ['psy_passif'] = $carac->bonusBasePercent->psy;

  if (isset ($carac->bonusDoublehandPercent->pv))
    $values ['pv_dh'] = $carac->bonusDoublehandPercent->pv;
  if (isset ($carac->bonusDoublehandPercent->pm))
    $values ['pm_dh'] = $carac->bonusDoublehandPercent->pm;
  if (isset ($carac->bonusDoublehandPercent->att))
    $values ['att_dh'] = $carac->bonusDoublehandPercent->att;
  if (isset ($carac->bonusDoublehandPercent->def))
    $values ['def_dh'] = $carac->bonusDoublehandPercent->def;
  if (isset ($carac->bonusDoublehandPercent->mag))
    $values ['mag_dh'] = $carac->bonusDoublehandPercent->mag;
  if (isset ($carac->bonusDoublehandPercent->psy))
    $values ['psy_dh'] = $carac->bonusDoublehandPercent->psy;

  if (isset ($carac->bonusTrueDoublehandPercent->pv))
    $values ['pv_tdh'] = $carac->bonusTrueDoublehandPercent->pv;
  if (isset ($carac->bonusTrueDoublehandPercent->pm))
    $values ['pm_tdh'] = $carac->bonusTrueDoublehandPercent->pm;
  if (isset ($carac->bonusTrueDoublehandPercent->att))
    $values ['att_tdh'] = $carac->bonusTrueDoublehandPercent->att;
  if (isset ($carac->bonusTrueDoublehandPercent->def))
    $values ['def_tdh'] = $carac->bonusTrueDoublehandPercent->def;
  if (isset ($carac->bonusTrueDoublehandPercent->mag))
    $values ['mag_tdh'] = $carac->bonusTrueDoublehandPercent->mag;
  if (isset ($carac->bonusTrueDoublehandPercent->psy))
    $values ['psy_tdh'] = $carac->bonusTrueDoublehandPercent->psy;

  if (isset ($carac->bonusDualwieldPercent->pv))
    $values ['pv_dw'] = $carac->bonusDualwieldPercent->pv;
  if (isset ($carac->bonusDualwieldPercent->pm))
    $values ['pm_dw'] = $carac->bonusDualwieldPercent->pm;
  if (isset ($carac->bonusDualwieldPercent->att))
    $values ['att_dw'] = $carac->bonusDualwieldPercent->att;
  if (isset ($carac->bonusDualwieldPercent->def))
    $values ['def_dw'] = $carac->bonusDualwieldPercent->def;
  if (isset ($carac->bonusDualwieldPercent->mag))
    $values ['mag_dw'] = $carac->bonusDualwieldPercent->mag;
  if (isset ($carac->bonusDualwieldPercent->psy))
    $values ['psy_dw'] = $carac->bonusDualwieldPercent->psy;

  $brex_unit_carac = new brex_unit_carac ($values);
  $brex_unit_carac->setrelationunit($brex_unite);
  if (!$brex_unit_carac->verifyValues()) {
    dieWithBadRequest(array_merge($brex_unit_carac->errors, (array)'Format exception: Validation of brex_unit_carac failed.'));
  }

  return $brex_unit_carac;
}

function createAndValidateBrexUnitComp($uniteCompetence, $brex_unite)
{
  if (!isset ($uniteCompetence->competence) || !$uniteCompetence->competence) {
    dieWithBadRequest('Format error: missing competence in uniteCompetence.');
  }
  if (!isset ($uniteCompetence->competence->id) || !$uniteCompetence->competence->id) {
    dieWithBadRequest('Format error: missing competence id in uniteCompetence with gumi_id = ' . $uniteCompetence->competence->gumi_id);
  }

  $values = array();
  if (isset ($uniteCompetence->niveau)) {
    $values ['niveau'] = $uniteCompetence->niveau;
  }
  $brex_unit_comp = new brex_unit_comp ($values);
  $brex_unit_comp->setrelationunit($brex_unite);

  if ($brex_competence = brex_competence::findByPrimaryId($uniteCompetence->competence->id)) {
    $brex_unit_comp->setrelationcompetence($brex_competence);
  } else {
    dieWithBadRequest('Storage error: no competence found with id = ' . $uniteCompetence->competence->id);
  }

  if (!$brex_unit_comp->verifyValues()) {
    dieWithBadRequest(array_merge($brex_unit_comp->errors, (array)'Format exception: Validation of brex_unit_comp failed for gumi_id ' . $uniteCompetence->competence->gumi_id));
  }

  return $brex_unit_comp;
}

function createAndValidateBrexUnitCompArray($uniteCompetences, $brex_unite)
{
  $brex_unit_comp_array = array();

  foreach ($uniteCompetences as $uniteCompetence) {
    $brex_unit_comp_array [] = createAndValidateBrexUnitComp($uniteCompetence, $brex_unite);
  }

  return $brex_unit_comp_array;
}

function copyUnitDataAndValidate(&$brex_unit, $unite)
{
  if (isset ($unite->limite) && !isset ($brex_unit->limite))
    $brex_unit->limite = $unite->limite;
  if (isset ($unite->limite_en) && !isset ($brex_unit->limite_en))
    $brex_unit->limite_en = $unite->limite_en;
  if (isset ($unite->lim_min) && !isset ($brex_unit->lim_min))
    $brex_unit->lim_min = $unite->lim_min;
  if (isset ($unite->lim_max) && !isset ($brex_unit->lim_max))
    $brex_unit->lim_max = $unite->lim_max;
  if (isset ($unite->lim_up_min) && !isset ($brex_unit->lim_up_min))
    $brex_unit->lim_up_min = $unite->lim_up_min;
  if (isset ($unite->lim_up_max) && !isset ($brex_unit->lim_up_max))
    $brex_unit->lim_up_max = $unite->lim_up_max;
  if (isset ($unite->lim_nb_niv) && !isset ($brex_unit->lim_nb_niv))
    $brex_unit->lim_nb_niv = $unite->lim_nb_niv;
  if (isset ($unite->lim_hits) && !isset ($brex_unit->lim_hits))
    $brex_unit->lim_hits = $unite->lim_hits;
  if (isset ($unite->lim_frames) && !isset ($brex_unit->lim_frames))
    $brex_unit->lim_frames = $unite->lim_frames;
  if (isset ($unite->lim_damages) && !isset ($brex_unit->lim_damages))
    $brex_unit->lim_damages = $unite->lim_damages;
  if (isset ($unite->lim_cristals_niv_min) && !isset ($brex_unit->lim_cristals_niv_min))
    $brex_unit->lim_cristals_niv_min = $unite->lim_cristals_niv_min;
  if (isset ($unite->lim_cristals_niv_max) && !isset ($brex_unit->lim_cristals_niv_max))
    $brex_unit->lim_cristals_niv_max = $unite->lim_cristals_niv_max;

  if (!$brex_unit->verifyValues()) {
    dieWithBadRequest(array_merge($brex_unit->errors, (array)'Format exception: Validation of brex_unit failed.'));
  }
}

function updateUniteWithCarac($unite, $brex_unit_caracs)
{
  $caracsEX = array();

  foreach ($brex_unit_caracs as $brex_unit_carac) {
    if ($brex_unit_carac->level == $brex_unit_carac->level_max) {
      $unite->carac = new UniteCarac($brex_unit_carac);
    } else {
      $caracsEX [] = new UniteCarac($brex_unit_carac);
    }
  }

  if (count($caracsEX) > 0) {
    $unite->caracEX = $caracsEX;
  }
}

function updateUniteWithCompetences($unite, $brex_unit_comps)
{
  $unite->competences = [];
  foreach ($brex_unit_comps as $brex_unit_comp) {
    $unite->competences [] = new UniteCompetence($brex_unit_comp);
  }
}

?>
