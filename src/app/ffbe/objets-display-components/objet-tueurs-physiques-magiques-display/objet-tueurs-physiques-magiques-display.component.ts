import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../../model/objet/objet.model';

@Component({
  selector: 'app-objet-tueurs-physiques-magiques-display',
  templateUrl: './objet-tueurs-physiques-magiques-display.component.html',
  styleUrls: ['./objet-tueurs-physiques-magiques-display.component.css']
})
export class ObjetTueursPhysiquesMagiquesDisplayComponent implements OnInit {

  @Input() objet: Objet;
  public displayed = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
