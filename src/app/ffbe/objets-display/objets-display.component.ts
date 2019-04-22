import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../model/objet.model';

@Component({
  selector: 'app-objets-display',
  templateUrl: './objets-display.component.html',
  styleUrls: ['./objets-display.component.css']
})
export class ObjetsDisplayComponent implements OnInit {

  @Input() objets: Array<Objet>;

  constructor() {
  }

  ngOnInit() {
  }

}
