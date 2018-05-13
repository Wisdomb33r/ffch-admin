import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Unite} from '../model/unite.model';
import {Objet} from '../model/objet.model';
import {UniteMateriauEveil} from '../model/unite-materiau-eveil.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'app-unit-awakening-materials-display',
    templateUrl: 'unit-awakening-materials-display.component.html',
    styleUrls: ['unit-awakening-materials-display.component.css']
})
export class UnitAwakeningMaterialsDisplayComponent implements OnInit, OnChanges {

  @Input() unite: Unite;
  public materiauxEveilErrors: Array<string> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
    this.getObjets();
  }

  ngOnChanges() {
   /* this.materiauxEveilErrors = [];
    this.ffchClientService.getUniteByNumero$(this.unite.numero)
      .subscribe(u => {this.unite.id = (isNullOrUndefined(u) ? null : u.id); console.log(this.unite)},
        error => this.materiauxEveilErrors.push('Erreur lors du traitement de l\'unité ' + this.unite.numero + ' : ' + error));
 */ }

  protected getObjets() {
    this.materiauxEveilErrors = [];
    this.unite.materiauxEveil.forEach(materiauEveil => {
      this.ffchClientService.getObjetByGumiId$(materiauEveil.gumi_id)
        .subscribe(o => {materiauEveil.materiau = isNullOrUndefined(o) ? null: new Objet(o); console.log('objet trouvé: ' + o);},
          error => this.materiauxEveilErrors.push('Erreur lors de la recherche de l\'objet' + materiauEveil.gumi_id + ' : ' + error));
    })
  }

  public hasMateriauxEveil()
  {
    return !isNullOrUndefined(this.unite.materiauxEveil) && (this.unite.materiauxEveil.length > 0);
  }

  public isMateriauEveilPresentInFfchDb(materiauEveil: UniteMateriauEveil)
  {
    return !isNullOrUndefined(materiauEveil) && materiauEveil.isPresentInFfchDb();
  }

  public isImageMateriauEveilPresentInFfchDb(materiauEveil: UniteMateriauEveil)
  {
    return !isNullOrUndefined(materiauEveil) && materiauEveil.isImagePresentInFfchDb();
  }

  public isMateriauxEveilErrorsDisplayed(): boolean {
    return Array.isArray(this.materiauxEveilErrors) && this.materiauxEveilErrors.length > 0;
  }

  /* public sendUniteToFfch(unite: Unite) {
    this.ffchClientService.postUnite(unite)
      .subscribe(u => unite.id = (isNullOrUndefined(u) ? null : u.id));
  }
  */


}
