<?php
require_once "../gestion/genscripts/object_brex_unit_comp.class.php";

require_once "includes/die_with.php";
require_once "includes/skill_class.php";

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

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  dieWithBadRequest('Not implemented yet');
} else if ($_SERVER ['REQUEST_METHOD'] == 'PUT') {
  dieWithBadRequest('Not implemented yet');
} else {
  if (isset ($_GET ['id'])) {
    $unit_comp_id = $_GET ['id'];
    if ($brex_unit_comp = brex_unit_comp::findByPrimaryId($unit_comp_id)) {
      echo json_encode(new UniteCompetence($brex_unit_comp), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    } else {
      dieWithNotFound('Storage exception : no UniteCompetence found with ID: ' . $unit_comp_id);
    }
  }
}

?>
