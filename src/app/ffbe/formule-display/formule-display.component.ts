import {Component, Input, OnInit} from '@angular/core';
import {Formule} from '../model/formule.model';
import {Ingredient} from '../model/ingredient.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-formule-display',
  templateUrl: './formule-display.component.html',
  styleUrls: ['./formule-display.component.css']
})
export class FormuleDisplayComponent implements OnInit {

  @Input() formule: Formule;
  @Input() displayCost = false;
  @Input() displaySuccessfulStatus = true;
  @Input() isFormuleCorrectInFfchDb;
  @Input() isFormulePresentInFfchDb;

  constructor() {
  }

  ngOnInit() {
  }

  public isImageIngredientPresentInFfchDb(ingredient: Ingredient) {
    return !FfbeUtils.isNullOrUndefined(ingredient) && ingredient.isImagePresentInFfchDb();
  }

  public isIngredientPresentInFfchDb(ingredient: Ingredient) {
    return !FfbeUtils.isNullOrUndefined(ingredient) && ingredient.isPresentInFfchDb();
  }
}
