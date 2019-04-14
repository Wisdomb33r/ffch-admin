import { Component, Input, OnInit } from '@angular/core';
import {Recette} from '../model/recette.model';
import {RecettesComparingContainer} from '../model/recettes-comparing-container.model';

@Component({
  selector: 'app-recette-display',
  templateUrl: './recette-display.component.html',
  styleUrls: ['./recette-display.component.css']
})
export class RecetteDisplayComponent implements OnInit {

  @Input() recettesContainer: RecettesComparingContainer;
  public displayed = false;

  constructor() { }

  ngOnInit() {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
