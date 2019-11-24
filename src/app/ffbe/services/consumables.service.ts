import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Consumable} from '../model/consumable.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

@Injectable()
export class ConsumablesService {
  private static INSTANCE: ConsumablesService;
  private consumablesFromDataMining = null;

  public static getInstance(): ConsumablesService {
    return ConsumablesService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadConsumablesFromDataMining();
    ConsumablesService.INSTANCE = this;
  }

  public loadConsumablesFromDataMining() {
    if (this.consumablesFromDataMining == null) {
      this.dataMiningClientService.getConsumables$()
        .subscribe(data => this.consumablesFromDataMining = data);
    }
  }

  public searchForConsumablesByNames(english: string, french: string): Array<Consumable> {
    const consumables: Array<Consumable> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.consumablesFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.consumablesFromDataMining[propertyName].name === english
          && this.consumablesFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.consumablesFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.consumablesFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const consumable: Consumable = this.consumablesFromDataMining[property];
        consumable.gumi_id = +property;
        consumables.push(consumable);
      });
    }
    return consumables;
  }

  public searchForConsumableByGumiId(id: number): Consumable {
    if (this.consumablesFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.consumablesFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const consumable: Consumable = this.consumablesFromDataMining[property];
        consumable.gumi_id = +property;
        return consumable;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.consumablesFromDataMining != null;
  }
}

