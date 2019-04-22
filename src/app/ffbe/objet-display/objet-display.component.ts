import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../model/objet.model';

@Component({
  selector: 'app-objet-display',
  templateUrl: './objet-display.component.html',
  styleUrls: ['./objet-display.component.css']
})
export class ObjetDisplayComponent implements OnInit {

  @Input() objet: Objet;
  @Input() present: boolean;
  @Input() different: boolean;
  public displayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
