import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ItemRecipesService} from '../services/item-recipes.service';
import {Recette} from '../model/recette.model';
import {ItemRecipe} from '../model/item-recipe.model';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-item-recipes',
  templateUrl: './item-recipes.component.html',
  styleUrls: ['./item-recipes.component.css']
})
export class ItemRecipesComponent implements OnInit {

  englishName: FormControl;
  frenchName: FormControl;
  gumiId: FormControl;
  recettes: Array<Recette>;

  constructor(private itemRecipesService: ItemRecipesService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.gumiId = new FormControl('');
  }

  ngOnInit() {
  }

  public searchItemRecipeInDataMining() {
    this.recettes = [];
    if (!isNullOrUndefined(this.gumiId.value) && this.gumiId.value > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      const itemRecipe = this.itemRecipesService.searchForItemRecipeByGumiId(this.gumiId.value);
      if (!isNullOrUndefined((itemRecipe))) {
        console.log(itemRecipe);
        //this.competences.push(SkillMapper.toCompetence(skill));
      }
    } else {
      const itemRecipes: Array<ItemRecipe> = this.itemRecipesService.searchForItemRecipesByNames(this.englishName.value, this.frenchName.value);
      console.log(itemRecipes);
      //itemRecipes.forEach(skill => this.competences.push(SkillMapper.toCompetence(skill)));
    }
  }

  public isItemRecipeDisplayed(): boolean {
    return Array.isArray(this.recettes) && this.recettes.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.itemRecipesService.isLoaded();
  }
}
