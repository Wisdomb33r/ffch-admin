import {Component, Input, OnInit} from '@angular/core';
import {Personnage} from '../model/personnage.model';

@Component({
    selector: 'app-character-equipments-display',
    templateUrl: 'character-equipments-display.component.html',
    styleUrls: ['character-equipments-display.component.css']
})
export class CharacterEquipmentsDisplayComponent implements OnInit {

  @Input() personnage: Personnage;

  constructor() {
  }

  ngOnInit() {
  }

}
