import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../model/objet/objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-objet-alterations-etat-duo-display',
  templateUrl: './objet-alterations-etat-duo-display.component.html',
  styleUrls: ['./objet-alterations-etat-duo-display.component.css']
})
export class ObjetAlterationsEtatDuoDisplayComponent implements OnInit {

  @Input() objet: Objet;

  public displayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public shouldDiplayInflicts(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.objet.alterationsArme);
  }

}
