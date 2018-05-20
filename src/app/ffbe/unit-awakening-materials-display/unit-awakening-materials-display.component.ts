import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Unite} from '../model/unite.model';
import {Objet} from '../model/objet.model';
import {UniteMateriauEveil} from '../model/unite-materiau-eveil.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';
import {UniteMateriauxEveil} from '../model/unite-materiaux-eveil.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-unit-awakening-materials-display',
  templateUrl: 'unit-awakening-materials-display.component.html',
  styleUrls: ['unit-awakening-materials-display.component.css']
})
export class UnitAwakeningMaterialsDisplayComponent implements OnInit, OnChanges {

  @Input() unite: Unite;
  public materiauxEveilErrors: Array<string> = [];
  public materiauxEveilFromFfch: Array<UniteMateriauEveil> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
    this.getObjets();
  }

  ngOnChanges() {
    this.materiauxEveilFromFfch = [];
    this.getAwakeningMaterials();
  }

  protected getObjets() {
    this.materiauxEveilErrors = [];
    this.unite.materiauxEveil.forEach(materiauEveil => {
      this.ffchClientService.getObjetByGumiId$(materiauEveil.gumi_id)
        .subscribe(o => {
            materiauEveil.materiau = isNullOrUndefined(o) ? null : (Objet.produce(o));
          },
          error => this.materiauxEveilErrors.push('Erreur lors de la recherche de l\'objet' + materiauEveil.gumi_id + ' : ' + error));
    });
  }

  protected getAwakeningMaterials() {
    this.materiauxEveilErrors = [];
    this.ffchClientService.getUniteMateriauxEveilByUniteNumero$(this.unite.numero)
      .subscribe(ume => {
          this.materiauxEveilFromFfch = isNullOrUndefined(ume) ? null : (UniteMateriauxEveil.produce(ume).materiaux);
          FfbeUtils.sortArrayMateriauxEveil(this.materiauxEveilFromFfch);
        },
        error => this.materiauxEveilErrors.push('Erreur lors de la recherche des matériaux d\'éveil de l\'unité '
          + this.unite.numero + ' : ' + error));
  }

  public hasMateriauxEveil() {
    return !isNullOrUndefined(this.unite.materiauxEveil) && (this.unite.materiauxEveil.length > 0);
  }

  public isMateriauEveilPresentInFfchDb(materiauEveil: UniteMateriauEveil) {
    return !isNullOrUndefined(materiauEveil) && materiauEveil.isPresentInFfchDb();
  }

  public isImageMateriauEveilPresentInFfchDb(materiauEveil: UniteMateriauEveil) {
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
