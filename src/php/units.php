<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../gestion/genscripts/object_brex_unit_carac.class.php";
class Unite {
  public $id;
  public $perso;
  public $numero;
  public $stars;
  public $limite;
  public $limite_en;
  public $lim_desc;
  public $lim_desc_en;
  public $lim_nb_niv;
  public $lim_hits;
  public $lim_frames;
  public $lim_damages;
  public $lim_cristals_niv_min;
  public $lim_cristals_niv_max;
  public $carac;
  public $competences;

  function __construct($brex_unit) {
    $this->id = $brex_unit->id;
    $this->perso = $brex_unit->perso->id;
    $this->numero = $brex_unit->numero;
    $this->stars = $brex_unit->stars;
    $this->limite = $brex_unit->limite;
    $this->limite_en = $brex_unit->limite_en;
    $this->lim_desc = $brex_unit->lim_desc;
    $this->lim_desc_en = $brex_unit->lim_desc_en;
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

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $unite = json_decode ( file_get_contents ( 'php://input' ) );
  $errors = array ();
  if (isset ( $unite->numero ) && $unite->numero) {
    $brex_unites = brex_unit::finderParNumero ( $unite->numero );
    if (count ( $brex_unites ) == 1) {
      $unite_existante = $brex_unites [0] ;
      $brex_unite_carac_existantes = brex_unit_carac::findByRelation1N(array('unit' => $unite_existante->id));
      $brex_unite_comps_existantes = brex_unit_comp::findByRelation1N(array('unit' => $unite_existante->id));
      if ( (count ( $brex_unite_carac_existantes ) == 0) && (count ( $brex_unite_comps_existantes ) == 0) ) {
        if (isset ( $unite->carac) && $unite->carac) {
          if (isset ( $unite->competences) && (count( $unite->competences ) > 0 )) {
            $brex_unit_carac = creeBrexUnitCarac($unite->carac, $unite_existante, $errors);
            if (isset($brex_unit_carac) && validateBrexUnitCarac($brex_unit_carac, $errors) ) {
              $brex_unit_comp_array = creeBrexUnitCompArray($unite->competences,  $unite_existante, $errors);
              if (isset($brex_unit_comp_array) && validateBrexUnitCompArray($brex_unit_comp_array, $errors) ) {
                copyUnitData($unite_existante, $unite);
                if (validateBrexUnit($unite_existante, $errors)) {
                  if (storeBrexUnitCarac($brex_unit_carac, $errors) && storeBrexUnitCompArray($brex_unit_comp_array, $errors) && storeBrexUnit($unite_existante, $errors)) {
                    $unite_resultante = new Unite ( $unite_existante );
                    echo json_encode ( $unite_resultante, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
                  } else {
                    http_response_code ( 400 );
                    $errors [] = 'Format exception : could not store unit, carac or competences.';
                    echo json_encode ( $errors );
                  }
                } else {
                  http_response_code ( 400 );
                  $errors [] = 'Format exception : cannot copy unit data';
                  echo json_encode ( $errors );
                }
              } else {
                http_response_code ( 400 );
                $errors [] = 'Format exception : cannot create unit comp array';
                echo json_encode ( $errors );
              }
            } else {
              http_response_code ( 400 );
              $errors [] = 'Format exception : cannot create unit carac';
              echo json_encode ( $errors );
            }
          } else {
            http_response_code ( 400 );
            $errors [] = 'Format exception : cannot save without unit competences';
            echo json_encode ( $errors );
          }
        } else {
          http_response_code ( 400 );
          $errors [] = 'Format exception : cannot save without unit carac';
          echo json_encode ( $errors );
        }
      } else {
        http_response_code ( 404 );
        $errors [] = 'Storage exception : found existing characteristics or competences for unit';
        echo json_encode ( $errors );
      }
    } elseif (count ( $brex_unites ) > 1) {
      http_response_code ( 400 );
      $errors [] = 'Storage exception : several units found with numero: ' . $unite->numero . '.';
      echo json_encode ( $errors );
    } else {
      http_response_code ( 400 );
      $errors [] = 'Storage exception : unit not found';
      echo json_encode ( $errors );
    }
  } else {
    http_response_code ( 400 );
    $errors [] = 'Format exception : cannot save without unit number';
    echo json_encode ( $errors );
  }
} else {
  if (isset ( $_GET ['numero'] )) {
    $brex_unites = brex_unit::finderParNumero ( $_GET ['numero'] );
    if (count ( $brex_unites ) > 0) {
      $unite = new Unite ( $brex_unites [0] );
      $brex_unite_carac = brex_unit_carac::findByRelation1N(array('unit' => $unite->id));
      $brex_unite_comps = brex_unit_comp::findByRelation1N(array('unit' => $unite->id));
      if ( (count ( $brex_unite_carac ) > 0) || (count ( $brex_unite_comps ) > 0) )
      {
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

function creeBrexUnitCarac($carac, $unite, &$errors)
{
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
  if (isset ( $unite ))
  {
    $brex_unit_carac->setrelationunit($unite);
  } else {
    return null;
  }

  return $brex_unit_carac;
}

function creeBrexUnitComp($uniteCompetence, $unite, &$errors)
{
  $values = array ();
  if (isset ( $uniteCompetence->niveau )) {
    $values ['niveau'] = $uniteCompetence->niveau;
  } else {
    $errors[] = "Format error: niveau missing in uniteCompetence.";
    return null;
  }
  $brex_unit_comp = new brex_unit_comp ( $values );

  if (isset ( $unite )) {
    $brex_unit_comp->setrelationunit($unite);
  } else {
    $errors[] = "Unexpected error: unite missing when creating unit_comp.";
    return null;
  }

  if (isset ($uniteCompetence->competence))
  {
    if ( isset ($uniteCompetence->competence->id) ) {
      $brex_competence = brex_competence::findByPrimaryId($uniteCompetence->competence->id);
      if ( count( $brex_competence ) > 0 ) {
        $brex_unit_comp->setrelationcompetence($brex_competence);
      } else {
        $errors[] = "Storage error: no competence found with id = " . $uniteCompetence->competence->id . ".";
      }
    }else {
      $errors[] = "Format error: missing competence id in uniteCompetence with gumi_id = " . $uniteCompetence->competence->gumi_id . ".";
      return null;
    }

  } else {
    $errors[] = "Format error: missing competence in uniteCompetence.";
    return null;
  }

  return $brex_unit_comp;
}

function creeBrexUnitCompArray($uniteCompetences, $unite, &$errors)
{
  if (( count($uniteCompetences) > 0) && isset( $unite) ) {
    $brex_unit_comp_array = array();

    foreach ($uniteCompetences as $uniteCompetence) {
      $brex_unit_comp = creeBrexUnitComp($uniteCompetence, $unite, $errors);
      if ( isset( $brex_unit_comp ) ) {
        $brex_unit_comp_array[] = $brex_unit_comp;
      } else {
        $errors[] = 'Format exception: cannot convert uniteCompetence for competence'+ $uniteCompetence->competence->nom + '.';
        return null;
      }
    }
  } else {
    $errors[] = 'Format exception: unit has no competences.';
    return null;
  }

  return $brex_unit_comp_array;
}

function validateBrexUnitCarac($brex_unit_carac, &$errors)
{
  $isValid = $brex_unit_carac->verifyValues();
  if( !$isValid )
  {
    $errors[] = 'Format exception: Validation of brex_unit_carac failed.';
    $errors = array_merge($errors, $brex_unit_carac->errors);
  }
  return $isValid;
}

function validateBrexUnitCompArray($brex_unit_comp_array, &$errors)
{
  $isValid = true;
  foreach ($brex_unit_comp_array as $brex_unit_comp) {
    $isValid = $isValid && $brex_unit_comp->verifyValues();
    if( !$isValid )
    {
      $errors[] = 'Format exception: Validation of brex_unit_comp with gumi id ' . $brex_unit_comp->gumi_id . 'failed.';
      $errors = array_merge($errors, $brex_unit_comp->errors);
    }
  }
  return $isValid;
}

function storeBrexUnitCarac(&$brex_unit_carac, &$errors)
{
  $stored = $brex_unit_carac->store();
  if( !$stored )
  {
    $errors[] = 'Storage exception: Could not store brex_unit_carac.';
    $errors = array_merge($errors, $brex_unit_carac->errors);
  }
  return $stored;
}

function storeBrexUnitCompArray(&$brex_unit_comp_array, &$errors)
{
  $stored = true;
  foreach ($brex_unit_comp_array as $brex_unit_comp) {
    $stored = $stored && $brex_unit_comp->store();
    if( !$stored )
    {
      $errors[] = 'Storage exception: Could not store brex_unit_comp with gumi id ' . $brex_unit_comp->gumi_id . 'failed.';
      $errors = array_merge($errors, $brex_unit_comp->errors);
      break;
    }
  }
  return $stored;
}

function copyUnitData(&$brex_unit, $unite) {
  if (isset ( $unite->stars ) && !isset( $brex_unit->stars ) )
  $brex_unit->stars = $unite->stars;

  if (isset ( $unite->limite) && !isset( $brex_unit->limite ) )
  $brex_unit->limite = $unite->limite;

  if (isset ( $unite->limite_en) && !isset( $brex_unit->limite_en ) )
  $brex_unit->limite_en = $unite->limite_en;

  if (isset ( $unite->lim_desc ) && !isset( $brex_unit->lim_desc ) )
  $brex_unit->lim_desc = $unite->lim_desc;

  if (isset ( $unite->lim_desc_en ) && !isset( $brex_unit->lim_desc_en ) )
  $brex_unit->lim_desc_en = $unite->lim_desc_en;

  if (isset ( $unite->lim_nb_niv ) && !isset( $brex_unit->lim_nb_niv ) )
  $brex_unit->lim_nb_niv = $unite->lim_nb_niv;

  if (isset ( $unite->lim_hits ) && !isset( $brex_unit->lim_hits ) )
  $brex_unit->lim_hits = $unite->lim_hits;

  if (isset ( $unite->lim_frames ) && !isset( $brex_unit->lim_frames ) )
  $brex_unit->lim_frames = $unite->lim_frames;

  if (isset ( $unite->lim_damages ) && !isset( $brex_unit->lim_damages ) )
  $brex_unit->lim_damages = $unite->lim_damages;

  if (isset ( $unite->lim_cristals_niv_min ) && !isset( $brex_unit->lim_cristals_niv_min ) )
  $brex_unit->lim_cristals_niv_min = $unite->lim_cristals_niv_min;

  if (isset ( $unite->lim_cristals_niv_max ) && !isset( $brex_unit->lim_cristals_niv_max ) )
  $brex_unit->lim_cristals_niv_max = $unite->lim_cristals_niv_max;
}

function validateBrexUnit(&$brex_unit, &$errors)
{
  $isValid = $brex_unit->verifyValues();
  if( !$isValid )
  {
    $errors[] = 'Format exception: Validation of brex_unit failed.';
    $errors = array_merge($errors, $brex_unit->errors);
  }
  return $isValid;
}

function storeBrexUnit(&$brex_unit, &$errors)
{
  $stored = $brex_unit->store();
  if( !$stored )
  {
    $errors[] = 'Storage exception: Could not store brex_unit.';
    $errors = array_merge($errors, $brex_unit->errors);
  }
  return $stored;
}

?>
