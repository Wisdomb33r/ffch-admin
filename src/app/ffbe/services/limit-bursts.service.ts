import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {LimitBurstMapper} from '../mappers/limit-burst-mapper';
import {Limite} from '../model/limite.model';

@Injectable()
export class LimitBurstsService {

  public limitBurstsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadLimitBurstsFromDataMining();
  }

  public loadLimitBurstsFromDataMining() {
    if (this.limitBurstsFromDataMining == null) {
      this.dataMiningClientService.getLimitBursts$()
        .subscribe(data => this.limitBurstsFromDataMining = data);
    }
  }

  public searchForLimitBurstByGumiId(id: number): Limite {
    if (this.limitBurstsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.limitBurstsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        return LimitBurstMapper.toLimite(this.limitBurstsFromDataMining[property]);
      }
    }
    return null;
  }
}

