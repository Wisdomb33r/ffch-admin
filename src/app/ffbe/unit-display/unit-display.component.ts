import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../model/unite.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-unit-display',
  templateUrl: './unit-display.component.html',
  styleUrls: ['./unit-display.component.css']
})
export class UnitDisplayComponent implements OnInit {

  @Input() unite: Unite;
  public uniteErrors: Array<string> = [];
  skillsColumnsToDisplay = ['level', 'id_nom', 'description'];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.uniteErrors = [];
    this.ffchClientService.getUniteByNumero$(this.unite.numero)
      .subscribe(u => this.unite.id = (isNullOrUndefined(u) ? null : u.id),
      error => this.uniteErrors.push('Erreur lors du traitement de l\'unité ' + this.unite.numero + ' : ' + error));
  }

  public isUniteErrorsDisplayed(): boolean {
    return Array.isArray(this.uniteErrors) && this.uniteErrors.length > 0;
  }

}
