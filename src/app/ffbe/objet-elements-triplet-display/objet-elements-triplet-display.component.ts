import {Component, Input, OnInit} from '@angular/core';
import {ObjetElements} from '../model/objet/objet-elements';

@Component({
  selector: 'app-objet-elements-triplet-display',
  templateUrl: './objet-elements-triplet-display.component.html',
  styleUrls: ['./objet-elements-triplet-display.component.css']
})
export class ObjetElementsTripletDisplayComponent implements OnInit {

  @Input() objetElements: ObjetElements;

  constructor() {
  }

  ngOnInit() {
  }
}
