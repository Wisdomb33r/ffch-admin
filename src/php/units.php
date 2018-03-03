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
  public $unit;
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
    $this->unit = $brex_unit_carac->unit->id;
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

class UniteCompetence{
  // variables of the class
  public $id;
  public $unit;
  public $competence;
  public $niveau;

  function __construct($brex_unit_comp) {
    $this->id = $brex_unit_comp->id;
    $this->unit = $brex_unit_comp->unit->id;
    $this->competence = $brex_unit_comp->competence->id;
    $this->niveau = $brex_unit_comp->niveau;
  }
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
/*  $competence = json_decode ( file_get_contents ( 'php://input' ) );
  if (isset ( $competence->gumi_id ) && $competence->gumi_id) {
    $brex_competences = brex_competence::finderParGumiId ( $competence->gumi_id );
    if (count ( $brex_competences ) > 0) {
      http_response_code ( 400 );
      $errors = array ();
      $errors [] = 'Duplicate key exception : Gumi id ' . $competence->gumi_id . ' already exists';
      echo json_encode ( $errors );
    } else {
      $values = array ();
      if (isset ( $competence->nom ))
      $values ['nom'] = $competence->nom;
      if (isset ( $competence->nom_en ))
      $values ['nom_en'] = $competence->nom_en;
      if (isset ( $competence->description ))
      $values ['description'] = $competence->description;
      if (isset ( $competence->effet ))
      $values ['effet'] = $competence->effet;
      if (isset ( $competence->puissance ))
      $values ['puissance'] = $competence->puissance;
      if (isset ( $competence->physique ))
      $values ['physique'] = $competence->physique;
      if (isset ( $competence->magique ))
      $values ['magique'] = $competence->magique;
      if (isset ( $competence->hybride ))
      $values ['hybride'] = $competence->hybride;
      if (isset ( $competence->pm ))
      $values ['pm'] = $competence->pm;
      if (isset ( $competence->hits ))
      $values ['hits'] = $competence->hits;
      if (isset ( $competence->frames ))
      $values ['frames'] = $competence->frames;
      if (isset ( $competence->damages ))
      $values ['damages'] = $competence->damages;
      $values ['gumi_id'] = $competence->gumi_id;
      $brex_competence = new brex_competence ( $values );
      if (isset ( $competence->categorie ) && ($categorie = brex_compet_categ::findByPrimaryId ( $competence->categorie )))
      $brex_competence->setrelationcategorie ( $categorie );
      if (isset ( $competence->icone ) && ($icone = brex_compet_image::findByPrimaryId ( $competence->icone )))
      $brex_competence->setrelationicone ( $icone );
      if ($brex_competence->store ()) {
        $brex_competences = brex_competence::finderParGumiId ( $competence->gumi_id );
        if (count ( $brex_competences ) > 0) {
          http_response_code ( 201 );
          $competence = new Competence ( $brex_competences [0] );
          echo json_encode ( $competence, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
        } else {
          http_response_code ( 500 );
          $errors = array ();
          $errors [] = 'Unexpected error occured, stored gumi id ' . $competence->gumi_id . ' not found';
          echo json_encode ( $errors );
        }
      } else {
        http_response_code ( 400 );
        echo json_encode ( $brex_competence->errors );
      }
    }
  } else {
    http_response_code ( 400 );
    $errors = array ();
    $errors [] = 'Format exception : cannot save without Gumi id';
    echo json_encode ( $errors );
  }*/
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
?>
