import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Formule} from '../model/formule.model';
import {Objet} from '../model/objet.model';
import {isNullOrUndefined} from 'util';
import {FfchClientService} from '../services/ffch-client.service';

@Component({
  selector: 'app-formules-display',
  templateUrl: './formules-display.component.html',
  styleUrls: ['./formules-display.component.css']
})
export class FormulesDisplayComponent implements OnInit, OnChanges {
  @Input() formule: Formule;
  @Input() formuleFromFfch: Formule;
  @Input() displayCost: boolean = false;
  public ingredientsErrors = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getObjets();
  }

  protected getObjets() {
    if (!isNullOrUndefined(this.formule)) {
      this.formule.ingredients.forEach(ingredient => {
        this.ffchClientService.getObjetByGumiId$(ingredient.gumi_id)
          .subscribe(i => {
              ingredient.materiau = isNullOrUndefined(i) ? null : (Objet.produce(i));
            },
            error => this.ingredientsErrors.push('Erreur lors de la recherche de l\'objet' + ingredient.gumi_id + ' : ' + error));
      });
    }
  }

  public isFormulePresent(): boolean {
    return !isNullOrUndefined(this.formule) && !isNullOrUndefined(this.formule.ingredients) && this.formule.ingredients.length > 0;
  }

  public isFormulePresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.formuleFromFfch) && !isNullOrUndefined(this.formuleFromFfch.ingredients) && this.formuleFromFfch.ingredients.length > 0;
  }

  public isFormuleCorrectInFfchDb(): boolean {
    return this.isFormulePresent() && this.isFormulePresentInFfchDb()
      && (this.formuleFromFfch.ingredients.length === this.formule.ingredients.length)
      && this.formule.ingredients.every(ingredient => this.formuleFromFfch.ingredients.some(ingredientFromFfch =>
        (ingredientFromFfch.gumi_id === ingredient.gumi_id) && (ingredientFromFfch.quantite === ingredient.quantite))
      );
  }

  public areIngredientErrorsDisplayed(): boolean {
    return Array.isArray(this.ingredientsErrors) && this.ingredientsErrors.length > 0;
  }
}
