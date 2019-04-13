import {Component, Input, OnInit} from '@angular/core';
import {Recette} from '../model/recette.model';

@Component({
  selector: 'app-recettes-display',
  templateUrl: './recettes-display.component.html',
  styleUrls: ['./recettes-display.component.css']
})
export class RecettesDisplayComponent implements OnInit {

  @Input() recettes: Array<Recette>;

  constructor() { }

  ngOnInit() {
  }

}
