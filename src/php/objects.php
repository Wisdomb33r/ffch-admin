<?php
require_once "../gestion/genscripts/object_brex_objet.class.php";
require_once "../gestion/genscripts/object_brex_objet_categ.class.php";
require_once "../gestion/genscripts/object_brex_obj_comp.class.php";
require_once "../gestion/genscripts/object_brex_perso_trust.class.php";
require_once "classes.php";
require_once "skill_class.php";

function dieWithBadRequest($errorMessages)
{
  http_response_code(400);
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages
  ));
  die ();
}

function dieWithNotFound($errorMessages)
{
  http_response_code(404);
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages
  ));
  die ();
}

if ($_SERVER ['REQUEST_METHOD'] == 'POST') {
  $objet = json_decode(file_get_contents('php://input'));

  verifyObjet($objet);

  $brex_objet = createAndValidateObjet($objet);

  storeObjet($brex_objet);

  $stored_brex_objet = findObjetByGumiId($objet->gumi_id);
  $stored_objet = new Objet($stored_brex_objet);

  $brex_perso_trust = createAndValidateObjetLienTMR($objet, $stored_brex_objet);
  storeLienTMR($brex_perso_trust);
  updateObjetWithLienTMR($stored_objet);

  echo json_encode($stored_objet, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
} else {
  if (!isset ($_GET ['gumi_id'])) {
    dieWithBadRequest('Format exception: Cannot find object without gumiId');
  }

  $brex_objet = findObjetByGumiId($_GET ['gumi_id']);
  $objet = new Objet($brex_objet);
  updateObjetWithCompetences($objet);
  updateObjetWithLienTMR($objet);
  echo json_encode($objet, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

function verifyObjet($objet)
{
  if (!isset ($objet->nom) || !$objet->nom) {
    dieWithBadRequest('Format exception: Cannot save objet without nom');
  }

  if (!isset ($objet->nom_en) || !$objet->nom_en) {
    dieWithBadRequest('Format exception: Cannot save objet without nom_en');
  }

  if (!isset ($objet->description) || !$objet->description) {
    dieWithBadRequest('Format exception: Cannot save objet without description');
  }

  if (!isset ($objet->description_en) || !$objet->description_en) {
    dieWithBadRequest('Format exception: Cannot save objet without description_en');
  }

  if (!isset ($objet->gumi_id) || !$objet->gumi_id) {
    dieWithBadRequest('Format exception: Cannot save objet without Gumi ID');
  }

}

function updateObjetWithCompetences($objet)
{
  $objet->competences = [];
  $brex_obj_comps = brex_obj_comp::findByRelation1N(array('objet' => $objet->id));

  if (is_array($brex_obj_comps)) {
    foreach ($brex_obj_comps as $brex_obj_comp) {
      $objet->competences[] = new Competence($brex_obj_comp->competence);
    }
  }
}

function updateObjetWithLienTMR($objet)
{
  $brex_perso_trusts = brex_perso_trust::findByRelation1N(array('reward' => $objet->id));

  if (is_array($brex_perso_trusts)) {
    foreach ($brex_perso_trusts as $brex_perso_trust) {
      $brex_perso = brex_perso::findByPrimaryId($brex_perso_trust->relation1Nperso);
      $objet->lienTMR = new ObjetLienTMR($brex_perso->gumi_id, $brex_perso->nom, $brex_perso_trust->super);
    }
  }

}

function createAndValidateObjet($objet)
{
  $values = array();
  $values ['nom'] = $objet->nom;
  $values ['nom_en'] = $objet->nom_en;
  $values ['stars'] = $objet->stars;
  $values ['icone'] = null;
  $values ['gumi_id'] = $objet->gumi_id;
  $values ['description'] = $objet->description;
  $values ['description_en'] = $objet->description_en;
  $values ['effet'] = $objet->effet;
  $values ['effet_en'] = $objet->effet_en;

  $values ['pv'] = $objet->carac->pv;
  $values ['pm'] = $objet->carac->pm;
  $values ['att'] = $objet->carac->att;
  $values ['def'] = $objet->carac->def;
  $values ['mag'] = $objet->carac->mag;
  $values ['psy'] = $objet->carac->psy;

  $values ['pvp'] = $objet->caracp->pv;
  $values ['pmp'] = $objet->caracp->pm;
  $values ['attp'] = $objet->caracp->att;
  $values ['defp'] = $objet->caracp->def;
  $values ['magp'] = $objet->caracp->mag;
  $values ['psyp'] = $objet->caracp->psy;

  $values ['res_feu'] = $objet->elements->feu;
  $values ['res_glace'] = $objet->elements->glace;
  $values ['res_foudre'] = $objet->elements->foudre;
  $values ['res_eau'] = $objet->elements->eau;
  $values ['res_air'] = $objet->elements->air;
  $values ['res_terre'] = $objet->elements->terre;
  $values ['res_lumiere'] = $objet->elements->lumiere;
  $values ['res_tenebres'] = $objet->elements->tenebres;

  $values ['res_poison'] = $objet->resistancesAlterations->poison;
  $values ['res_cecite'] = $objet->resistancesAlterations->cecite;
  $values ['res_sommeil'] = $objet->resistancesAlterations->sommeil;
  $values ['res_mutisme'] = $objet->resistancesAlterations->silence;
  $values ['res_paralysie'] = $objet->resistancesAlterations->paralysie;
  $values ['res_confusion'] = $objet->resistancesAlterations->confusion;
  $values ['res_maladie'] = $objet->resistancesAlterations->maladie;
  $values ['res_petrification'] = $objet->resistancesAlterations->petrification;

  if (isset ($objet->two_handed))
    $values ['two_handed'] = ($objet->two_handed == true) ? '1' : '0';
  if (property_exists($objet, 'variance_min')) $values ['variance_min'] = $objet->variance_min;
  if (property_exists($objet, 'variance_max')) $values ['variance_max'] = $objet->variance_max;

  $values ['tueurs'] = $objet->tueurs;
  $values ['tueurs_m'] = $objet->tueurs_m;

  $values ['pv_dh'] = $objet->caracpDoublehand->pv;
  $values ['pm_dh'] = $objet->caracpDoublehand->pm;
  $values ['build_att_dh'] = $objet->caracpDoublehand->att;
  $values ['def_dh'] = $objet->caracpDoublehand->def;
  $values ['build_mag_dh'] = $objet->caracpDoublehand->mag;
  $values ['psy_dh'] = $objet->caracpDoublehand->psy;

  $values ['pv_tdh'] = $objet->caracpTrueDoublehand->pv;
  $values ['pm_tdh'] = $objet->caracpTrueDoublehand->pm;
  $values ['build_att_tdh'] = $objet->caracpTrueDoublehand->att;
  $values ['def_tdh'] = $objet->caracpTrueDoublehand->def;
  $values ['build_mag_tdh'] = $objet->caracpTrueDoublehand->mag;
  $values ['psy_tdh'] = $objet->caracpTrueDoublehand->psy;

  $values ['pv_dw'] = $objet->caracpDualwield->pv;
  $values ['pm_dw'] = $objet->caracpDualwield->pm;
  $values ['att_dw'] = $objet->caracpDualwield->att;
  $values ['def_dw'] = $objet->caracpDualwield->def;
  $values ['mag_dw'] = $objet->caracpDualwield->mag;
  $values ['psy_dw'] = $objet->caracpDualwield->psy;

  $brex_objet = new brex_objet($values);

  $brex_objet_categ = brex_objet_categ::findByPrimaryId($objet->categorie->ffchId);
  $brex_objet->setrelationcategorie($brex_objet_categ);

  $brex_objet->verifyValues();

  return $brex_objet;
}

function storeObjet($brex_objet)
{
  if (!$brex_objet->store()) {
    http_response_code(400);
    echo json_encode($brex_objet->errors);
  }
}

function createAndValidateObjetLienTMR($objet, $brex_objet)
{
  if (is_null($objet->lienTMR)) {
    return null;
  }

  $brex_persos = brex_perso::finderParGumiId($objet->lienTMR->perso_gumi_id);

  if (is_null($brex_persos) || count($brex_persos) != 1) {
    return null;
  }

  $brex_perso = $brex_persos[0];

  $values = array();
  $values['super'] = $objet->lienTMR->isSTMR ? '1' : '0';
  $values['creation_datedate'] = date('Y-m-d');
  $values['creation_datehour'] = date('H');
  $values['creation_datemins'] = date('i');

  $brex_perso_trust = new brex_perso_trust($values);
  $brex_perso_trust->setrelationperso($brex_perso);
  $brex_perso_trust->setrelationreward($brex_objet);

  $brex_perso_trust->verifyValues();

  return $brex_perso_trust;
}

function storeLienTMR($brex_perso_trust)
{
  if (is_null($brex_perso_trust)) {
    return;
  }

  if (!$brex_perso_trust->store()) {
    http_response_code(400);
    echo json_encode($brex_perso_trust->errors);
  }
}

?>
