<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";
class Competence {
  public $id;
  public $categorie;
  public $icone;
  public $nom;
  public $nom_en;
  public $description;
  public $effet;
  public $puissance;
  public $physique;
  public $magique;
  public $hybride;
  public $pm;
  public $hits;
  public $frames;
  public $damages;
  public $gumi_id;
  public $enhanced;
  function __construct($brex_competence) {
    $this->id = $brex_competence->id;
    $this->categorie = $brex_competence->categorie->id;
    $this->icone = $brex_competence->icone->id;
    $this->nom = $brex_competence->nom;
    $this->nom_en = $brex_competence->nom_en;
    $this->description = $brex_competence->description;
    $this->effet = $brex_competence->effet;
    $this->puissance = $brex_competence->puissance;
    $this->physique = $brex_competence->physique;
    $this->magique = $brex_competence->magique;
    $this->hybride = $brex_competence->hybride;
    $this->pm = $brex_competence->pm;
    $this->hits = $brex_competence->hits;
    $this->frames = $brex_competence->frames;
    $this->damages = $brex_competence->damages;
    $this->gumi_id = $brex_competence->gumi_id;
    $this->enhanced = $brex_competence->enhanced ? true : false;
  }
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $competence = json_decode ( file_get_contents ( 'php://input' ) );
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
      if (isset ( $competence->enhanced ))
        $values ['enhanced'] = ($competence->enhanced == true) ? '1' : '0';
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
  }
} else {
  if (isset ( $_GET ['id'] )) {
    $brex_competences = brex_competence::finderParGumiId ( $_GET ['id'] );
    if (count ( $brex_competences ) > 0) {
      $competence = new Competence ( $brex_competences [0] );
      echo json_encode ( $competence, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    } else {
      http_response_code ( 404 );
    }
  } else {
    http_response_code ( 400 );
  }
}
?>
