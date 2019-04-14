import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Personnage} from '../model/personnage.model';
import {EquipmentCategory} from '../model/equipment-category.model';
import {UniteEquipements} from '../model/unite-equipements.model';
import {FfchClientService} from '../services/ffch-client.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'app-character-equipments-display',
    templateUrl: 'character-equipments-display.component.html',
    styleUrls: ['character-equipments-display.component.css']
})
export class CharacterEquipmentsDisplayComponent implements OnChanges, OnInit {

  @Input() personnage: Personnage;
  public equipmentErrors: Array<string> = [];
  public equipmentsFromFfch: Array<EquipmentCategory> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.equipmentsFromFfch = [];
    this.getEquipmentsFromFfch();
  }

  public getEquipmentsFromFfch() {
    this.equipmentErrors = [];
    this.ffchClientService.getUniteEquipementsByUniteNumero$(this.personnage.unites[0].numero)
      .subscribe(uE => this.equipmentsFromFfch = (isNullOrUndefined(uE) ? null : FfbeUtils.findEquipmentCategoriesByFfchIds(uE.equipements_ffch_ids)),
      error => this.equipmentErrors.push('Erreur lors du traitement de l\'unité ' + this.personnage.unites[0].numero + ' : ' + error));
  }

  public isEquipementPresentInFfchDB(): boolean {
    return !isNullOrUndefined(this.equipmentsFromFfch) && this.equipmentsFromFfch.length > 0;
  }

  public isEquipementCorrectInFfchDB(): boolean {
    return (this.equipmentsFromFfch.length === this.personnage.equipements.length)
      && this.personnage.equipements.every(equipement => this.equipmentsFromFfch.some(equipmentFromFfch =>
      equipmentFromFfch.ffchId === equipement.ffchId));
  }

  public isEquipmentErrorsDisplayed(): boolean {
    return Array.isArray(this.equipmentErrors) && this.equipmentErrors.length > 0;
  }

  public sendEquipmentsToFfch() {
    const uniteEquipements = new UniteEquipements(this.personnage.unites[0].numero,
      this.personnage.equipements.map(equipement => equipement.ffchId));
    this.ffchClientService.postUniteEquipements$(uniteEquipements)
      .subscribe(status => this.getEquipmentsFromFfch(), status => this.equipmentErrors.push('Could not send equipments'));
  }
}
