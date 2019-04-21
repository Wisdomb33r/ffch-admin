import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ItemRecipesService} from '../services/item-recipes.service';
import {Recette} from '../model/recette.model';
import {ItemRecipe} from '../model/item-recipe.model';
import {ItemRecipeMapper} from '../mappers/item-recipe-mapper';
import {RecettesDisplayComponent} from '../recettes-display/recettes-display.component';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-item-recipes',
  templateUrl: './item-recipes.component.html',
  styleUrls: ['./item-recipes.component.css']
})
export class ItemRecipesComponent implements OnInit {

  englishName: FormControl;
  frenchName: FormControl;
  resultGumiId: FormControl;
  recipeGumiId: FormControl;
  recettes: Array<Recette>;

  constructor(private itemRecipesService: ItemRecipesService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.resultGumiId = new FormControl('');
    this.recipeGumiId = new FormControl('');
  }

  ngOnInit() {
  }

  public searchItemRecipeInDataMining() {
    this.recettes = [];
    if (!isNullOrUndefined(this.recipeGumiId.value) && this.recipeGumiId.value > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      this.resultGumiId.patchValue('');
      const itemRecipe = this.itemRecipesService.searchForItemRecipeByRecipeGumiId(this.recipeGumiId.value);
      if (!isNullOrUndefined((itemRecipe))) {
        this.recettes.push(ItemRecipeMapper.toRecette(itemRecipe));
      }
    } else if (!isNullOrUndefined(this.resultGumiId.value) && this.resultGumiId.value > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      const itemRecipes: Array<ItemRecipe> =
        this.itemRecipesService.searchForItemRecipeByItemGumiId(this.resultGumiId.value);
      itemRecipes.forEach(itemRecipe => this.recettes.push(ItemRecipeMapper.toRecette(itemRecipe)));
    } else {
      const itemRecipes: Array<ItemRecipe> =
        this.itemRecipesService.searchForItemRecipesByNames(this.englishName.value, this.frenchName.value);
      itemRecipes.forEach(itemRecipe => this.recettes.push(ItemRecipeMapper.toRecette(itemRecipe)));
    }
  }

  public isItemRecipeDisplayed(): boolean {
    return Array.isArray(this.recettes) && this.recettes.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.itemRecipesService.isLoaded();
  }
}
