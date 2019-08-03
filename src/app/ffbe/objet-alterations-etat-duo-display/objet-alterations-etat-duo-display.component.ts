import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../model/objet/objet.model';

@Component({
  selector: 'app-objet-alterations-etat-duo-display',
  templateUrl: './objet-alterations-etat-duo-display.component.html',
  styleUrls: ['./objet-alterations-etat-duo-display.component.css']
})
export class ObjetAlterationsEtatDuoDisplayComponent implements OnInit {

  @Input() objet: Objet;

  constructor() {
  }

  ngOnInit() {
  }

}
