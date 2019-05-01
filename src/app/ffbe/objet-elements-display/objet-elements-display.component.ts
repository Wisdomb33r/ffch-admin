import {Component, Input, OnInit} from '@angular/core';
import {ObjetElements} from '../model/objet/objet-elements';

@Component({
  selector: 'app-objet-elements-display',
  templateUrl: './objet-elements-display.component.html',
  styleUrls: ['./objet-elements-display.component.css']
})
export class ObjetElementsDisplayComponent implements OnInit {

  @Input() objetElements: ObjetElements;

  public displayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
