import {Component, Input, OnChanges} from '@angular/core';
import {Unite} from '../model/unite.model';
import {FfchClientService} from '../services/ffch-client.service';
import {UniteEveil} from '../model/unite-eveil.model';
import {Formule} from '../model/formule.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-unit-awakening-materials-display',
  templateUrl: 'unit-awakening-materials-display.component.html',
  styleUrls: ['unit-awakening-materials-display.component.css']
})
export class UnitAwakeningMaterialsDisplayComponent implements OnChanges {

  @Input() unite: Unite;
  public materiauxEveilErrors: Array<string> = [];
  public materiauxEveilFromFfch: Formule;
  public ajouteObtention: boolean;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnChanges() {
    this.materiauxEveilErrors = [];
    this.getAwakeningMaterials();
  }

  protected getAwakeningMaterials() {
    this.ffchClientService.getUniteMateriauxEveilByUniteNumero$(this.unite.numero)
      .subscribe(uniteEveil => {
          this.materiauxEveilFromFfch = FfbeUtils.isNullOrUndefined(uniteEveil) ? null : (UniteEveil.produce(uniteEveil).formule);
          if (!FfbeUtils.isNullOrUndefined(this.materiauxEveilFromFfch)) {
            FfbeUtils.sortArrayIngredients(this.materiauxEveilFromFfch.ingredients);
            this.ajouteObtention = uniteEveil.ajoute_obtention;
          }
        },
        error => this.materiauxEveilErrors.push('Erreur lors de la recherche des matériaux d\'éveil de l\'unité '
          + this.unite.numero + ' : ' + error));
  }

  public getFormuleFromFfchUniteEveil(): Formule {
    if (!FfbeUtils.isNullOrUndefined(this.materiauxEveilFromFfch)) {
      return this.materiauxEveilFromFfch;
    } else {
      return undefined;
    }
  }

  public hasMateriauxEveil() {
    return !FfbeUtils.isNullOrUndefined(this.unite.materiauxEveil) && (this.unite.materiauxEveil.ingredients.length > 0);
  }

  public areMateriauxEveilPresentInFfchDB(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.materiauxEveilFromFfch)
      && !FfbeUtils.isNullOrUndefined(this.materiauxEveilFromFfch.ingredients)
      && this.materiauxEveilFromFfch.ingredients.length > 0;
  }

  public shouldDisplayObtention(): boolean {
    return this.unite.stars === 6 || this.unite.stars === 7;
  }

  public isMateriauxEveilErrorsDisplayed(): boolean {
    return Array.isArray(this.materiauxEveilErrors) && this.materiauxEveilErrors.length > 0;
  }

  public sendUniteMateriauxEveilToFfch() {
    const uniteMateriauxEveil = new UniteEveil(this.unite.numero, this.unite.materiauxEveil, this.ajouteObtention);
    this.ffchClientService.postUniteMateriauxEveil$(uniteMateriauxEveil)
      .subscribe(uniteEveil =>
          this.materiauxEveilFromFfch = (FfbeUtils.isNullOrUndefined(uniteEveil) ? null : (UniteEveil.produce(uniteEveil).formule)),
        status => this.materiauxEveilErrors.push('Could not send awakening materials'));
  }
}
