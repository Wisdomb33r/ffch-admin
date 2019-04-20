import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {ItemRecipe} from '../model/item-recipe.model';
import {ItemsService} from './items.service';
import {CraftableItemsService} from './craftable-items.service';

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
    const craftableItems = this.craftableItemsService.searchForCraftableItemsByNames(english, french);

    if (Array.isArray(craftableItems) && craftableItems.length > 0) {
      craftableItems.forEach(craftableItem => {
        const extendedGumiId = craftableItem.getExtendedGumiId();

        matchingProperties = propertyNames.filter(
          propertyName =>
            this.itemRecipesFromDataMining[propertyName].item === extendedGumiId
        );
        if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
          matchingProperties.forEach(property => {
            const itemRecipe: ItemRecipe = this.itemRecipesFromDataMining[property];
            itemRecipe.gumi_id = +property;
            itemRecipe.craftableItem = craftableItem;
            itemRecipes.push(itemRecipe);
          });
        }
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
