import {Component, Input, OnInit} from '@angular/core';
import {ObjetAlterationsEtat} from '../model/objet/objet-alterations-etat.model';

@Component({
  selector: 'app-objet-alterations-etat-display',
  templateUrl: './objet-alterations-etat-display.component.html',
  styleUrls: ['./objet-alterations-etat-display.component.css']
})
export class ObjetAlterationsEtatDisplayComponent implements OnInit {

  @Input() objetAlterationsEtat: ObjetAlterationsEtat;
  @Input() titre: string;
  @Input() estModifiable: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
