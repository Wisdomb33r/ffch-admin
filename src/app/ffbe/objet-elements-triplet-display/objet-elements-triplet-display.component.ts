import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../model/objet/objet.model';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-objet-elements-triplet-display',
  templateUrl: './objet-elements-triplet-display.component.html',
  styleUrls: ['./objet-elements-triplet-display.component.css']
})
export class ObjetElementsTripletDisplayComponent implements OnInit {

  @Input() objet: Objet;

  public displayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public shouldDiplayElementsDetails(): boolean {
    return !isNullOrUndefined(this.objet.resistancesElementaires) && !isNullOrUndefined(this.objet.elementsArme);
  }

}
