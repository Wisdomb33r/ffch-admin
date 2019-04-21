import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Item} from '../model/item.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

@Injectable()
export class ItemsService {

  private itemsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadItemsFromDataMining();
  }

  public loadItemsFromDataMining() {
    if (this.itemsFromDataMining == null) {
      this.dataMiningClientService.getItems$()
        .subscribe(data => this.itemsFromDataMining = data);
    }
  }

  public searchForItemsByNames(english: string, french: string): Array<Item> {
    const items: Array<Item> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.itemsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.itemsFromDataMining[propertyName].name === english
          && this.itemsFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.itemsFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.itemsFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const item: Item = this.itemsFromDataMining[property];
        item.gumi_id = +property;
        items.push(item);
      });
    }
    return items;
  }

  public searchForItemByGumiId(id: number): Item {
    if (this.itemsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.itemsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const item: Item = this.itemsFromDataMining[property];
        item.gumi_id = +property;
        return item;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.itemsFromDataMining != null;
  }
}

