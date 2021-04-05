import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Formule} from '../model/formule.model';
import {Objet} from '../model/objet/objet.model';
import {FfchClientService} from '../services/ffch-client.service';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-formules-display',
  templateUrl: './formules-display.component.html',
  styleUrls: ['./formules-display.component.css']
})
export class FormulesDisplayComponent implements OnInit, OnChanges {
  @Input() formule: Formule;
  @Input() formuleFromFfch: Formule;
  @Input() displayCost = false;
  @Input() displaySuccessfulStatus = true;
  @Input() titreFormule = 'Materiaux d\'éveil';
  public ingredientsErrors = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getObjets();
  }

  protected getObjets() {
    if (!FfbeUtils.isNullOrUndefined(this.formule)) {
      this.formule.ingredients.forEach(ingredient => {
        this.ffchClientService.getObjetByGumiId$(ingredient.gumi_id)
          .subscribe(i => {
              ingredient.materiau = FfbeUtils.isNullOrUndefined(i) ? null : i;
            },
            error => this.ingredientsErrors.push('Erreur lors de la recherche de l\'objet' + ingredient.gumi_id + ' : ' + error));
      });
    }
  }

  public isFormulePresent(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.formule)
      && !FfbeUtils.isNullOrUndefined(this.formule.ingredients)
      && this.formule.ingredients.length > 0;
  }

  public isFormulePresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.formuleFromFfch) &&
      !FfbeUtils.isNullOrUndefined(this.formuleFromFfch.ingredients) && this.formuleFromFfch.ingredients.length > 0;
  }

  public isFormuleCorrectInFfchDb(): boolean {
    return this.isFormulePresent() && this.isFormulePresentInFfchDb()
      && this.formule.areIngredientsEqual(this.formuleFromFfch)
      && this.isCostCorrectInFfchDb();
  }

  public isCostCorrectInFfchDb(): boolean {
    return !this.displayCost || this.formule.areCostsEqual(this.formuleFromFfch);
  }

  public areIngredientErrorsDisplayed(): boolean {
    return Array.isArray(this.ingredientsErrors) && this.ingredientsErrors.length > 0;
  }
}
