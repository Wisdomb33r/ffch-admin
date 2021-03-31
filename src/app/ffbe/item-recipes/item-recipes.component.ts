import {Component, OnInit} from '@angular/core';
import {ItemRecipesService} from '../services/item-recipes.service';
import {Recette} from '../model/recette.model';
import {ItemRecipe} from '../model/items/item-recipe.model';
import {ItemRecipeMapper} from '../mappers/items/item-recipe-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {CharactersService} from '../services/characters.service';
import {StorableFormControl} from '../model/storable-form-control';

@Component({
  templateUrl: './item-recipes.component.html',
  styleUrls: ['./item-recipes.component.css']
})
export class ItemRecipesComponent implements OnInit {

  englishName: StorableFormControl;
  frenchName: StorableFormControl;
  resultGumiId: StorableFormControl;
  recipeGumiId: StorableFormControl;
  recettes: Array<Recette>;

  constructor(private itemRecipesService: ItemRecipesService,
              // do not remove the injection of Characters, it serves to load the INSTANCE singletons
              private charactersService: CharactersService) {
    this.englishName = new StorableFormControl('recipe-search-english-name');
    this.frenchName = new StorableFormControl('recipe-search-french-name');
    this.resultGumiId = new StorableFormControl('recipe-search-result-gumi-id', true);
    this.recipeGumiId = new StorableFormControl('recipe-search-recipe-gumi-id', true);
  }

  ngOnInit() {
    this.englishName.fetch();
    this.frenchName.fetch();
    this.resultGumiId.fetch();
    this.recipeGumiId.fetch();
  }

  public searchItemRecipeInDataMining() {
    this.recettes = [];
    if (!FfbeUtils.isNullOrUndefined(this.recipeGumiId.value) && this.recipeGumiId.value > 0) {
      this.englishName.formControl.patchValue('');
      this.frenchName.formControl.patchValue('');
      this.resultGumiId.formControl.patchValue('');
      const itemRecipe = this.itemRecipesService.searchForItemRecipeByRecipeGumiId(this.recipeGumiId.value);
      if (!FfbeUtils.isNullOrUndefined((itemRecipe))) {
        this.recettes.push(ItemRecipeMapper.toRecette(itemRecipe));
      }
    } else if (!FfbeUtils.isNullOrUndefined(this.resultGumiId.value) && this.resultGumiId.value > 0) {
      this.englishName.formControl.patchValue('');
      this.frenchName.formControl.patchValue('');
      const itemRecipes: Array<ItemRecipe> =
        this.itemRecipesService.searchForItemRecipeByItemGumiId(this.resultGumiId.value);
      itemRecipes.forEach(itemRecipe => this.recettes.push(ItemRecipeMapper.toRecette(itemRecipe)));
    } else {
      const itemRecipes: Array<ItemRecipe> =
        this.itemRecipesService.searchForItemRecipesByNames(this.englishName.value, this.frenchName.value);
      itemRecipes.forEach(itemRecipe => this.recettes.push(ItemRecipeMapper.toRecette(itemRecipe)));
    }
    this.englishName.store();
    this.frenchName.store();
    this.resultGumiId.store();
    this.recipeGumiId.store();
  }

  public isItemRecipeDisplayed(): boolean {
    return Array.isArray(this.recettes) && this.recettes.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.itemRecipesService.isLoaded();
  }
}
