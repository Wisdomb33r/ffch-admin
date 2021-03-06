import {Component, OnInit} from '@angular/core';
import {ItemRecipesService} from '../services/item-recipes.service';
import {Recette} from '../model/recette.model';
import {ItemRecipe} from '../model/items/item-recipe.model';
import {ItemRecipeMapper} from '../mappers/items/item-recipe-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {CharactersService} from '../services/characters.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  templateUrl: './item-recipes.component.html',
  styleUrls: ['./item-recipes.component.css']
})
export class ItemRecipesComponent implements OnInit {

  searchForm: FormGroup;
  englishName: FormControl;
  frenchName: FormControl;
  resultGumiId: FormControl;
  recipeGumiId: FormControl;
  recettes: Array<Recette>;
  localStorageLabel = 'recipes-search-form';

  constructor(private itemRecipesService: ItemRecipesService,
              // do not remove the injection of Characters, it serves to load the INSTANCE singletons
              private charactersService: CharactersService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.resultGumiId = new FormControl('');
    this.recipeGumiId = new FormControl('');
    this.searchForm = new FormGroup({
      englishName: this.englishName,
      frenchName: this.frenchName,
      resultGumiId: this.resultGumiId,
      recipeGumiId: this.recipeGumiId,
    });
  }

  ngOnInit() {
    const storedValue = localStorage.getItem(this.localStorageLabel);
    if (storedValue) {
      this.searchForm.patchValue(JSON.parse(storedValue));
    }
  }

  public searchItemRecipeInDataMining() {
    this.recettes = [];
    if (!FfbeUtils.isNullOrUndefined(this.recipeGumiId.value) && this.recipeGumiId.value > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      this.resultGumiId.patchValue('');
      const itemRecipe = this.itemRecipesService.searchForItemRecipeByRecipeGumiId(this.recipeGumiId.value);
      if (!FfbeUtils.isNullOrUndefined((itemRecipe))) {
        this.recettes.push(ItemRecipeMapper.toRecette(itemRecipe));
      }
    } else if (!FfbeUtils.isNullOrUndefined(this.resultGumiId.value) && this.resultGumiId.value > 0) {
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
    localStorage.setItem(this.localStorageLabel, JSON.stringify(this.searchForm.value));
  }

  public isItemRecipeDisplayed(): boolean {
    return Array.isArray(this.recettes) && this.recettes.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.itemRecipesService.isLoaded();
  }
}
