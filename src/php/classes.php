<?php

class Objet
{
  public $id;
  public $nom;
  public $nom_en;
  public $icone;
  public $gumi_id;

  function __construct($brex_objet)
  {
    $this->id = $brex_objet->id;
    $this->nom = $brex_objet->nom;
    $this->nom_en = $brex_objet->nom_en;
    if (strlen($brex_objet->img) > 0) {
      $this->icone = $brex_objet->getImageimgPath();
    }
    $this->gumi_id = $brex_objet->gumi_id;
  }
}

?>

