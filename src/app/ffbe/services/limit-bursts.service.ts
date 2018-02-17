import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {LimitBurst} from '../model/limit-burst.model';

@Injectable()
export class LimitBurstsService {

  private limitBurstsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadLimitBurstsFromDataMining();
  }

  public loadLimitBurstsFromDataMining() {
    if (this.limitBurstsFromDataMining == null) {
      this.dataMiningClientService.getLimitBursts$()
        .subscribe(data => this.limitBurstsFromDataMining = data);
    }
  }

  public searchForLimitBurstByGumiId(id: number): LimitBurst {
    if (this.limitBurstsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.limitBurstsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        return this.limitBurstsFromDataMining[property];
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.limitBurstsFromDataMining != null;
  }
}

