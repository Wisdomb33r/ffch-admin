import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {Recette} from '../model/recette.model';
import {RecettesComparingContainer} from '../model/recettes-comparing-container.model';
import {Objet} from '../model/objet.model';
import {isNullOrUndefined} from "util";
import {Formule} from '../model/formule.model';

@Component({
  selector: 'app-recette-display',
  templateUrl: './recette-display.component.html',
  styleUrls: ['./recette-display.component.css']
})
export class RecetteDisplayComponent implements OnInit {

  @Input() recettesContainer: RecettesComparingContainer;
  public displayed = false;
  public objetRecette : Objet;
  public objetResultat : Objet;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.objetRecette = this.recettesContainer.recette.recette;
    this.objetResultat = this.recettesContainer.recette.resultat;
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public nomRecetteAffichable() : string {
    if (!isNullOrUndefined(this.objetRecette)) {
      return this.objetRecette.nom;
    } else if (!isNullOrUndefined(this.recettesContainer.recette.nom_item)) {
      return '(Recette de) ' + this.recettesContainer.recette.nom_item;
    }
    return this.recettesContainer.recette.recette_gumi_id.toString();
  }


  public nomResultatAffichable() : string {
    if (!isNullOrUndefined(this.objetResultat)) {
      return this.objetResultat.nom;
    } else if (!isNullOrUndefined(this.recettesContainer.recette.nom_item)) {
      return this.recettesContainer.recette.nom_item;
    }
    return this.recettesContainer.recette.resultat_gumi_id.toString()
  }

  public isImageObjetPresentInFfchDb(objet: Objet) {
    return !isNullOrUndefined(objet) && objet.isImagePresentInFfchDb();
  }

  public isObjetPresentInFfchDb(objet: Objet) {
    return !isNullOrUndefined(objet) && objet.isPresentInFfchDb();
  }

  public getFormuleFromFfchRecette(): Formule {
    if (!isNullOrUndefined(this.recettesContainer.dbRecette) && !isNullOrUndefined(this.recettesContainer.dbRecette.formule)) {
      return this.recettesContainer.dbRecette.formule;
    } else {
      return undefined;
    }
  }

}
