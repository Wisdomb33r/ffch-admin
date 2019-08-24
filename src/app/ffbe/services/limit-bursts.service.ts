import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {LimitBurst} from '../model/limit-burst.model';
import {forkJoin} from 'rxjs';

@Injectable()
export class LimitBurstsService {

  private limitBurstsFromDataMining = null;
  private limitBurstsNamesFromDataMining = null;
  private limitBurstsDescriptionsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadLimitBurstsFromDataMining();
  }

  public loadLimitBurstsFromDataMining() {
    if (this.limitBurstsFromDataMining == null) {
      const observables = [];
      observables.push(this.dataMiningClientService.getLimitBursts$());
      observables.push(this.dataMiningClientService.getLimitBurstsNames$());
      observables.push(this.dataMiningClientService.getLimitBurstsDescriptions$());
      forkJoin(observables)
        .subscribe(data => {
          this.limitBurstsFromDataMining = data[0];
          this.limitBurstsNamesFromDataMining = data[1];
          this.limitBurstsDescriptionsFromDataMining = data[2];
        });
    }
  }

  public searchForLimitBurstByGumiId(id: number): LimitBurst {
    if (this.limitBurstsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.limitBurstsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const lb: LimitBurst = this.limitBurstsFromDataMining[property];
        lb.names = this.limitBurstsNamesFromDataMining[property];
        lb.descriptions = this.limitBurstsDescriptionsFromDataMining[property];
        return lb;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.limitBurstsFromDataMining != null && this.limitBurstsNamesFromDataMining != null && this.limitBurstsDescriptionsFromDataMining != null;
  }
}

