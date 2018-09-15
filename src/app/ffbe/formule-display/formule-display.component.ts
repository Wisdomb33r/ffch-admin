import {Component, Input, OnInit} from '@angular/core';
import {Formule} from '../model/formule.model';
import {isNullOrUndefined} from 'util';
import {Ingredient} from '../model/ingredient.model';

@Component({
  selector: 'app-formule-display',
  templateUrl: './formule-display.component.html',
  styleUrls: ['./formule-display.component.css']
})
export class FormuleDisplayComponent implements OnInit {

  @Input() formule: Formule;
  @Input() displayCost: boolean = false;
  @Input() isFormuleCorrectInFfchDb;
  @Input() isFormulePresentInFfchDb;

  constructor() {
  }

  ngOnInit() {
  }

  public isImageIngredientPresentInFfchDb(ingredient: Ingredient) {
    return !isNullOrUndefined(ingredient) && ingredient.isImagePresentInFfchDb();
  }

  public isIngredientPresentInFfchDb(ingredient: Ingredient) {
    return !isNullOrUndefined(ingredient) && ingredient.isPresentInFfchDb();
  }
}
