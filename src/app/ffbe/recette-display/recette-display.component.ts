import { Component, Input, OnInit } from '@angular/core';
import {Recette} from '../model/recette.model';

@Component({
  selector: 'app-recette-display',
  templateUrl: './recette-display.component.html',
  styleUrls: ['./recette-display.component.css']
})
export class RecetteDisplayComponent implements OnInit {

  @Input() recette: Recette;

  constructor() { }

  ngOnInit() {
  }

}
