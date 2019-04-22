import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {ItemRecipe} from '../model/item-recipe.model';
import {ItemsService} from './items.service';

@Injectable({
  providedIn: 'root'
})
export class ItemRecipesService {

  private itemRecipesFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService,
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
    const items = this.itemsService.searchForItemsByNames(english, french);

    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        const extendedGumiId = item.getExtendedGumiId();

        matchingProperties = propertyNames.filter(
          propertyName =>
            this.itemRecipesFromDataMining[propertyName].item === extendedGumiId
        );
        if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
          matchingProperties.forEach(property => {
            const itemRecipe: ItemRecipe = this.itemRecipesFromDataMining[property];
            itemRecipe.gumi_id = +property;
            itemRecipe.dmItem = item;
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
          itemRecipe.dmItem = this.itemsService.searchForItemByExtendedGumiId(itemRecipe.item);
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
        itemRecipe.dmItem = this.itemsService.searchForItemByExtendedGumiId(itemRecipe.item);
        return itemRecipe;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.itemRecipesFromDataMining != null;
  }
}
