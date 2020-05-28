<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../gestion/genscripts/object_brex_unit_carac.class.php";
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
class UniteCarac {
  // variables of the class
  public $id;
  public $level;
  public $level_max;
  public $pv;
  public $pm;
  public $att;
  public $def;
  public $mag;
  public $psy;
  public $pv_pots;
  public $pm_pots;
  public $att_pots;
  public $def_pots;
  public $mag_pots;
  public $psy_pots;
  function __construct($brex_unit_carac) {
    $this->id = $brex_unit_carac->id;
    $this->level = $brex_unit_carac->level;
    $this->level_max = $brex_unit_carac->level_max;
    $this->pv = $brex_unit_carac->pv;
    $this->pm = $brex_unit_carac->pm;
    $this->att = $brex_unit_carac->att;
    $this->def = $brex_unit_carac->def;
    $this->mag = $brex_unit_carac->mag;
    $this->psy = $brex_unit_carac->psy;
    $this->pv_pots = $brex_unit_carac->pv_pots;
    $this->pm_pots = $brex_unit_carac->pm_pots;
    $this->att_pots = $brex_unit_carac->att_pots;
    $this->def_pots = $brex_unit_carac->def_pots;
    $this->mag_pots = $brex_unit_carac->mag_pots;
    $this->psy_pots = $brex_unit_carac->psy_pots;
  }
}
class UniteCompetence {
  // variables of the class
  public $id;
  public $competence;
  public $niveau;
  function __construct($brex_unit_comp) {
    $this->id = $brex_unit_comp->id;
    $this->competence = $brex_unit_comp->competence->id;
    $this->niveau = $brex_unit_comp->niveau;
  }
}
function dieWithBadRequest($errorMessages) {
  http_response_code ( 400 );
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages
  ));
  die ();
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $unite = json_decode ( file_get_contents ( 'php://input' ) );
  if (! isset ( $unite->numero ) || ! $unite->numero) {
    dieWithBadRequest ( 'Format exception : cannot save without unit number' );
  }

  if (! isset ( $unite->carac ) || ! $unite->carac) {
    dieWithBadRequest ( 'Format exception : cannot save without unit carac' );
  }

  if (! isset ( $unite->competences ) || ! is_array ( $unite->competences ) || count ( $unite->competences ) == 0) {
    dieWithBadRequest ( 'Format exception : cannot save without unit competences' );
  }

  $brex_unites = brex_unit::finderParNumero ( $unite->numero );
  if (count ( $brex_unites ) > 1) {
    dieWithBadRequest ( 'Storage exception : several units found with numero: ' . $unite->numero );
  } else if (count ( $brex_unites ) == 0) {
    dieWithBadRequest ( 'Storage exception : unit not found' );
  }

  $unite_existante = $brex_unites [0];
  $brex_unite_carac_existantes = brex_unit_carac::findByRelation1N(array('unit' => $unite_existante->id
  ));
  $brex_unite_comps_existantes = brex_unit_comp::findByRelation1N(array('unit' => $unite_existante->id
  ));
  if ((count ( $brex_unite_carac_existantes ) > 0) || (count ( $brex_unite_comps_existantes ) > 0)) {
    dieWithBadRequest ( 'Storage exception : found existing characteristics or competences for unit' );
  }

  $brex_unit_carac = createAndValidateBrexUnitCarac ( $unite->carac, $unite_existante );
  $brex_unit_comp_array = createAndValidateBrexUnitCompArray ( $unite->competences, $unite_existante );
  copyUnitDataAndValidate ( $unite_existante, $unite );
  $unite_existante->store ();
  $brex_unit_carac->store ();
  foreach ( $brex_unit_comp_array as $brex_unit_comp ) {
    $brex_unit_comp->store ();
  }
  $unite_resultante = new Unite ( $unite_existante );
  echo json_encode ( $unite_resultante, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
} else {
  if (isset ( $_GET ['numero'] )) {
    $brex_unites = brex_unit::finderParNumero ( $_GET ['numero'] );
    if (count ( $brex_unites ) > 0) {
      $unite = new Unite ( $brex_unites [0] );
      $brex_unite_carac = brex_unit_carac::findByRelation1N(array('unit' => $unite->id
      ));
      $brex_unite_comps = brex_unit_comp::findByRelation1N(array('unit' => $unite->id
      ));
      if ((count ( $brex_unite_carac ) > 0) || (count ( $brex_unite_comps ) > 0)) {
        echo json_encode ( $unite, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
      } else {
        http_response_code ( 404 );
      }
    } else {
      http_response_code ( 404 );
    }
  } else {
    http_response_code ( 400 );
  }
}
function createAndValidateBrexUnitCarac($carac, $brex_unite) {
  $values = array ();
  if (isset ( $carac->level ))
    $values ['level'] = $carac->level;
  if (isset ( $carac->level_max ))
    $values ['level_max'] = $carac->level_max;
  if (isset ( $carac->pv ))
    $values ['pv'] = $carac->pv;
  if (isset ( $carac->pm ))
    $values ['pm'] = $carac->pm;
  if (isset ( $carac->att ))
    $values ['att'] = $carac->att;
  if (isset ( $carac->def ))
    $values ['def'] = $carac->def;
  if (isset ( $carac->mag ))
    $values ['mag'] = $carac->mag;
  if (isset ( $carac->psy ))
    $values ['psy'] = $carac->psy;
  if (isset ( $carac->pv_pots ))
    $values ['pv_pots'] = $carac->pv_pots;
  if (isset ( $carac->pm_pots ))
    $values ['pm_pots'] = $carac->pm_pots;
  if (isset ( $carac->att_pots ))
    $values ['att_pots'] = $carac->att_pots;
  if (isset ( $carac->def_pots ))
    $values ['def_pots'] = $carac->def_pots;
  if (isset ( $carac->mag_pots ))
    $values ['mag_pots'] = $carac->mag_pots;
  if (isset ( $carac->psy_pots ))
    $values ['psy_pots'] = $carac->psy_pots;

  $brex_unit_carac = new brex_unit_carac ( $values );
  $brex_unit_carac->setrelationunit ( $brex_unite );
  if (! $brex_unit_carac->verifyValues ()) {
    dieWithBadRequest ( array_merge ( $brex_unit_carac->errors, (array)'Format exception: Validation of brex_unit_carac failed.' ) );
  }

  return $brex_unit_carac;
}
function createAndValidateBrexUnitComp($uniteCompetence, $brex_unite) {
  if (! isset ( $uniteCompetence->competence ) || ! $uniteCompetence->competence) {
    dieWithBadRequest ( 'Format error: missing competence in uniteCompetence.' );
  }
  if (! isset ( $uniteCompetence->competence->id ) || ! $uniteCompetence->competence->id) {
    dieWithBadRequest ( 'Format error: missing competence id in uniteCompetence with gumi_id = ' . $uniteCompetence->competence->gumi_id );
  }

  $values = array ();
  if (isset ( $uniteCompetence->niveau )) {
    $values ['niveau'] = $uniteCompetence->niveau;
  }
  $brex_unit_comp = new brex_unit_comp ( $values );
  $brex_unit_comp->setrelationunit ( $brex_unite );

  if ($brex_competence = brex_competence::findByPrimaryId ( $uniteCompetence->competence->id )) {
    $brex_unit_comp->setrelationcompetence ( $brex_competence );
  } else {
    dieWithBadRequest ( 'Storage error: no competence found with id = ' . $uniteCompetence->competence->id );
  }

  if (! $brex_unit_comp->verifyValues ()) {
    dieWithBadRequest ( array_merge ( $brex_unit_comp->errors, (array)'Format exception: Validation of brex_unit_comp failed for gumi_id ' . $uniteCompetence->competence->gumi_id ) );
  }

  return $brex_unit_comp;
}
function createAndValidateBrexUnitCompArray($uniteCompetences, $brex_unite) {
  $brex_unit_comp_array = array ();

  foreach ( $uniteCompetences as $uniteCompetence ) {
    $brex_unit_comp_array [] = createAndValidateBrexUnitComp ( $uniteCompetence, $brex_unite );
  }

  return $brex_unit_comp_array;
}
function copyUnitDataAndValidate(&$brex_unit, $unite)
{
  if (isset ($unite->stars) && !isset ($brex_unit->stars))
    $brex_unit->stars = $unite->stars;
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
  if (isset ( $unite->lim_cristals_niv_max ) && ! isset ( $brex_unit->lim_cristals_niv_max ))
    $brex_unit->lim_cristals_niv_max = $unite->lim_cristals_niv_max;

  if (! $brex_unit->verifyValues ()) {
    dieWithBadRequest ( array_merge ( $brex_unit->errors, (array)'Format exception: Validation of brex_unit failed.' ) );
  }
}

?>
