import {Component, Input, OnInit} from '@angular/core';
import {CaracteristiquesContainer} from '../model/caracteristiques-container.model';

@Component({
  selector: 'app-objet-carac-display',
  templateUrl: './objet-carac-display.component.html',
  styleUrls: ['./objet-carac-display.component.css']
})
export class ObjetCaracDisplayComponent implements OnInit {

  @Input() container: CaracteristiquesContainer;
  public displayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
