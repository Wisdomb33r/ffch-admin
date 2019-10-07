<?php

class Competence
{
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
  public $fixe;
  public $esper;
  public $pm;
  public $lb;
  public $ep;
  public $hits;
  public $frames;
  public $damages;
  public $gumi_id;
  public $enhanced;

  function __construct($brex_competence)
  {
    $this->id = $brex_competence->id;
    $this->categorie = $brex_competence->categorie->id;
    $this->icone = $brex_competence->icone->id;
    $this->nom = $brex_competence->nom;
    $this->nom_en = $brex_competence->nom_en;
    $this->description = $brex_competence->description;
    $this->effet = $brex_competence->effet;
    $this->puissance = $brex_competence->puissance;
    $this->physique = $brex_competence->physique == '1' ? true : false;
    $this->magique = $brex_competence->magique == '1' ? true : false;
    $this->hybride = $brex_competence->hybride == '1' ? true : false;
    $this->fixe = $brex_competence->fixe == '1' ? true : false;
    $this->esper = $brex_competence->esper == '1' ? true : false;
    $this->pm = $brex_competence->pm;
    $this->lb = $brex_competence->lb;
    $this->ep = $brex_competence->ep;
    $this->hits = $brex_competence->hits;
    $this->frames = $brex_competence->frames;
    $this->damages = $brex_competence->damages;
    $this->gumi_id = $brex_competence->gumi_id;
    $this->enhanced = $brex_competence->enhanced ? true : false;
  }
}

?>
