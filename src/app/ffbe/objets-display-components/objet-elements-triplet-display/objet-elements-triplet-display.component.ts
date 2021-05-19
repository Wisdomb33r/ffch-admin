import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../../model/objet/objet.model';
import {FfbeUtils} from '../../utils/ffbe-utils';

@Component({
  selector: 'app-objet-elements-triplet-display',
  templateUrl: './objet-elements-triplet-display.component.html',
  styleUrls: ['./objet-elements-triplet-display.component.css']
})
export class ObjetElementsTripletDisplayComponent implements OnInit {

  @Input() objet: Objet;
  @Input() editable: boolean;

  public displayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public shouldDiplayElementsDetails(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.objet.resistancesElementaires) && !FfbeUtils.isNullOrUndefined(this.objet.elementsArme);
  }

}
