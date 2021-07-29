<?php

class UniteCompetence
{
  // variables of the class
  public $id;
  public $competence;
  public $niveau;

  function __construct($brex_unit_comp)
  {
    $this->id = $brex_unit_comp->id;
    $this->competence = new Competence($brex_unit_comp->competence);
    $this->niveau = $brex_unit_comp->niveau;
  }
}

?>
