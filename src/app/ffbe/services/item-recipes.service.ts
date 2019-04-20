import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {ItemRecipe} from '../model/item-recipe.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemsService} from './items.service';
import {CraftableItemsService} from './craftable-items.service';
import {FfbeUtils} from '../utils/ffbe-utils';

@Injectable({
  providedIn: 'root'
})
export class ItemRecipesService {

  private itemRecipesFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService,
              private craftableItemsService: CraftableItemsService,
              private itemsService: ItemsService) {
    this.loadItemRecipesFromDataMining();
  }

  public loadItemRecipesFromDataMining() {
    if (this.itemRecipesFromDataMining == null) {
      this.dataMiningClientService.getItemRecipes$()
        .subscribe(data => this.itemRecipesFromDataMining = data);
    }
  }

  public searchForItemRecipesByNames(english: string, french: string): Array<ItemRecipe> {
    const itemRecipes: Array<ItemRecipe> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.itemRecipesFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.itemRecipesFromDataMining[propertyName].name === english
         // && this.skillsFromDataMining[propertyName].strings.name[FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.itemRecipesFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.itemRecipesFromDataMining[propertyName].strings.name[FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const itemRecipe: ItemRecipe = this.itemRecipesFromDataMining[property];
        itemRecipe.gumi_id = +property;
        itemRecipes.push(itemRecipe);
      });
    }
    return itemRecipes;
  }

  public searchForItemRecipeByItemGumiId(id: number): Array<ItemRecipe> {
    if (this.itemRecipesFromDataMining != null) {
      const itemRecipes: Array<ItemRecipe> = [];
      const propertyNames: string[] = Object.getOwnPropertyNames(this.itemRecipesFromDataMining);
      let matchingProperties: Array<string> = [];
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.itemRecipesFromDataMining[propertyName].item.includes(id.toString())
      );
      if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
        matchingProperties.forEach(property => {
          const itemRecipe: ItemRecipe = this.itemRecipesFromDataMining[property];
          itemRecipe.gumi_id = +property;
          itemRecipe.craftableItem = this.craftableItemsService.searchForCraftableItemByExtendedGumiId(itemRecipe.item);
          itemRecipes.push(itemRecipe);
        });
      }
      return itemRecipes;
    }
    return null;
  }

  public searchForItemRecipeByRecipeGumiId(id: number): ItemRecipe {
    if (this.itemRecipesFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.itemRecipesFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const itemRecipe: ItemRecipe = this.itemRecipesFromDataMining[property];
        itemRecipe.gumi_id = +property;
        itemRecipe.craftableItem = this.craftableItemsService.searchForCraftableItemByExtendedGumiId(itemRecipe.item);
        return itemRecipe;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.itemRecipesFromDataMining != null;
  }
}
