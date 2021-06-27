import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Unite} from '../../model/unite.model';
import {FfchClientService} from '../../services/ffch-client.service';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {FFBE_UNITE_BRAVE_SHIFT_RANK, FFBE_UNITE_NEO_VISION_RANK} from '../../ffbe.constants';

@Component({
  selector: 'app-unit-display',
  templateUrl: './unit-display.component.html',
  styleUrls: ['./unit-display.component.css']
})
export class UnitDisplayComponent implements OnInit, OnChanges {

  @Input() unite: Unite;
  public uniteErrors: Array<string> = [];
  public multiLineDisplay = false;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.uniteErrors = [];
    this.ffchClientService.getUniteByNumero$(this.unite.numero)
      .subscribe(u => this.unite.id = (FfbeUtils.isNullOrUndefined(u) ? null : u.id),
        error => this.uniteErrors.push('Erreur lors du traitement de l\'unité ' + this.unite.numero + ' : ' + error));
  }

  public isUniteErrorsDisplayed(): boolean {
    return Array.isArray(this.uniteErrors) && this.uniteErrors.length > 0;
  }

  public sendUniteToFfch(unite: Unite) {
    this.ffchClientService.postUnite$(unite)
      .subscribe(u => unite.id = (FfbeUtils.isNullOrUndefined(u) ? null : u.id));
  }

  public generateLimitLinkToFfch(): string {
    return '<a href="ffexvius_units.php?unitid=' + (this.unite.isPresentInFfchDb() ? this.unite.id.toString() : '')
      + '\"><em>' + this.unite.limite + '</em></a>';
  }

  public generateDisplayableRank(): string {
    let rank = `${this.unite.stars.toString()}\u2605`;
    if (this.unite.stars === FFBE_UNITE_NEO_VISION_RANK) {
      rank = 'NV';
    } else if (this.unite.stars === FFBE_UNITE_BRAVE_SHIFT_RANK) {
      rank = 'BS';
    }
    return rank;
  }

  public shouldDisplayCaracEx(): boolean {
    return (this.unite.stars === FFBE_UNITE_NEO_VISION_RANK || this.unite.stars === FFBE_UNITE_BRAVE_SHIFT_RANK)
      && !FfbeUtils.isNullOrUndefined(this.unite.caracEX);
  }
}
