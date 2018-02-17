import {Component, Input, OnInit} from '@angular/core';
import {Personnage} from '../model/personnage.model';
import {Unite} from '../model/unite.model';
import {Equipment} from '../model/equipment.model';

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit {

  @Input() personnage: Personnage;

  constructor() {
  }

  ngOnInit() {
  }

}
