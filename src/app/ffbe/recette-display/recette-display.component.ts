import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {Recette} from '../model/recette.model';
import {RecettesComparingContainer} from '../model/recettes-comparing-container.model';
import {Objet} from '../model/objet.model';
import {isNullOrUndefined} from "util";

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
    return isNullOrUndefined(this.objetRecette) ? this.recettesContainer.recette.recette_gumi_id.toString() : this.objetRecette.nom;
  }


  public nomResultatAffichable() : string {
    return isNullOrUndefined(this.objetResultat) ? this.recettesContainer.recette.resultat_gumi_id.toString() : this.objetResultat.nom;
  }

  public isImageObjetPresentInFfchDb(objet: Objet) {
    return !isNullOrUndefined(objet) && objet.isImagePresentInFfchDb();
  }

  public isObjetPresentInFfchDb(objet: Objet) {
    return !isNullOrUndefined(objet) && objet.isPresentInFfchDb();
  }

}
