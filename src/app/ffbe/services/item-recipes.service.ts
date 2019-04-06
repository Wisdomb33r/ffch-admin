import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {ItemRecipe} from '../model/item-recipe.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

@Injectable({
  providedIn: 'root'
})
export class ItemRecipesService {

  private itemRecipesFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
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

  public searchForItemRecipeByGumiId(id: number): ItemRecipe {
    if (this.itemRecipesFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.itemRecipesFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const itemRecipe: ItemRecipe = this.itemRecipesFromDataMining[property];
        itemRecipe.gumi_id = +property;
        return itemRecipe;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.itemRecipesFromDataMining != null;
  }
}
