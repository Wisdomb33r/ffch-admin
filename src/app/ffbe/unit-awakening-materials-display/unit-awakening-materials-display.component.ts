import {Component, Input, OnChanges} from '@angular/core';
import {Unite} from '../model/unite.model';
import {Objet} from '../model/objet.model';
import {Ingredient} from '../model/ingredient.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';
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

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnChanges() {
    this.materiauxEveilErrors = [];
    this.getAwakeningMaterials();
  }

  protected getAwakeningMaterials() {
    this.ffchClientService.getUniteMateriauxEveilByUniteNumero$(this.unite.numero)
      .subscribe(uniteEveil => {
          this.materiauxEveilFromFfch = isNullOrUndefined(uniteEveil) ? null : (UniteEveil.produce(uniteEveil).formule);
          FfbeUtils.sortArrayIngredients(this.materiauxEveilFromFfch.ingredients);
        },
        error => this.materiauxEveilErrors.push('Erreur lors de la recherche des matériaux d\'éveil de l\'unité '
          + this.unite.numero + ' : ' + error));
  }

  public getFormuleFromFfchUniteEveil(): Formule {
    if (!isNullOrUndefined(this.materiauxEveilFromFfch)) {
      return this.materiauxEveilFromFfch;
    } else {
      return undefined;
    }
  }

  public hasMateriauxEveil() {
    return !isNullOrUndefined(this.unite.materiauxEveil) && (this.unite.materiauxEveil.ingredients.length > 0);
  }

  public areMateriauxEveilPresentInFfchDB(): boolean {
    return !isNullOrUndefined(this.materiauxEveilFromFfch)
      && !isNullOrUndefined(this.materiauxEveilFromFfch.ingredients)
      && this.materiauxEveilFromFfch.ingredients.length > 0;
  }

  public isMateriauxEveilErrorsDisplayed(): boolean {
    return Array.isArray(this.materiauxEveilErrors) && this.materiauxEveilErrors.length > 0;
  }

  public sendUniteMateriauxEveilToFfch() {
    const uniteMateriauxEveil = new UniteEveil(this.unite.numero, this.unite.materiauxEveil);
    this.ffchClientService.postUniteMateriauxEveil$(uniteMateriauxEveil)
      .subscribe(uniteEveil =>
          this.materiauxEveilFromFfch = (isNullOrUndefined(uniteEveil) ? null : (UniteEveil.produce(uniteEveil).formule)),
        status => this.materiauxEveilErrors.push('Could not send awakening materials'));
  }
}
