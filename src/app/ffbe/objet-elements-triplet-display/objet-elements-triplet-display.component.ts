import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../model/objet/objet.model';

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

}
