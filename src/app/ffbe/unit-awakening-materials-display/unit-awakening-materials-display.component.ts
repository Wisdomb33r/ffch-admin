import {Component, Input, OnChanges} from '@angular/core';
import {Unite} from '../model/unite.model';
import {Objet} from '../model/objet.model';
import {Ingredient} from '../model/ingredient.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';
import {UniteMateriauxEveil} from '../model/unite-materiaux-eveil.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-unit-awakening-materials-display',
  templateUrl: 'unit-awakening-materials-display.component.html',
  styleUrls: ['unit-awakening-materials-display.component.css']
})
export class UnitAwakeningMaterialsDisplayComponent implements OnChanges {

  @Input() unite: Unite;
  public materiauxEveilErrors: Array<string> = [];
  public materiauxEveilFromFfch: Array<Ingredient> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnChanges() {
    this.materiauxEveilErrors = [];
    this.getObjets();
    this.getAwakeningMaterials();
  }

  protected getObjets() {
    this.unite.materiauxEveil.forEach(materiauEveil => {
      this.ffchClientService.getObjetByGumiId$(materiauEveil.gumi_id)
        .subscribe(o => {
            materiauEveil.materiau = isNullOrUndefined(o) ? null : (Objet.produce(o));
          },
          error => this.materiauxEveilErrors.push('Erreur lors de la recherche de l\'objet' + materiauEveil.gumi_id + ' : ' + error));
    });
  }

  protected getAwakeningMaterials() {
    this.ffchClientService.getUniteMateriauxEveilByUniteNumero$(this.unite.numero)
      .subscribe(ume => {
          this.materiauxEveilFromFfch = isNullOrUndefined(ume) ? null : (UniteMateriauxEveil.produce(ume).materiaux);
          FfbeUtils.sortArrayIngredients(this.materiauxEveilFromFfch);
        },
        error => this.materiauxEveilErrors.push('Erreur lors de la recherche des matériaux d\'éveil de l\'unité '
          + this.unite.numero + ' : ' + error));
  }

  public hasMateriauxEveil() {
    return !isNullOrUndefined(this.unite.materiauxEveil) && (this.unite.materiauxEveil.length > 0);
  }

  public isMateriauEveilPresentInFfchDb(materiauEveil: Ingredient) {
    return !isNullOrUndefined(materiauEveil) && materiauEveil.isPresentInFfchDb();
  }

  public isImageMateriauEveilPresentInFfchDb(materiauEveil: Ingredient) {
    return !isNullOrUndefined(materiauEveil) && materiauEveil.isImagePresentInFfchDb();
  }

  public areMateriauxEveilPresentInFfchDB(): boolean {
    return !isNullOrUndefined(this.materiauxEveilFromFfch) && this.materiauxEveilFromFfch.length > 0;
  }

  public areMateriauxEveilCorrectInFfchDB(): boolean {
    return (this.materiauxEveilFromFfch.length === this.unite.materiauxEveil.length)
      && this.unite.materiauxEveil.every(materiauEveil => this.materiauxEveilFromFfch.some(materiauEveilFromFfch =>
        (materiauEveilFromFfch.gumi_id === materiauEveil.gumi_id) && (materiauEveilFromFfch.quantite === materiauEveil.quantite))
      );
  }

  public isMateriauxEveilErrorsDisplayed(): boolean {
    return Array.isArray(this.materiauxEveilErrors) && this.materiauxEveilErrors.length > 0;
  }

  public sendUniteMateriauxEveilToFfch() {
    const uniteMateriauxEveil = new UniteMateriauxEveil(this.unite.numero, this.unite.materiauxEveil);
    this.ffchClientService.postUniteMateriauxEveil(uniteMateriauxEveil)
      .subscribe(ume => this.materiauxEveilFromFfch = (isNullOrUndefined(ume) ? null : (UniteMateriauxEveil.produce(ume).materiaux)),
        status => this.materiauxEveilErrors.push('Could not send awakening materials'));
  }
}
