import {Injectable} from '@angular/core';
import {DataMiningClientService} from './data-mining-client.service';

@Injectable()
export class LatentSkillsService {

  private latentSkillsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadLatentSkillsFromDataMining();
  }

  public loadLatentSkillsFromDataMining() {
    if (this.latentSkillsFromDataMining == null) {
      this.dataMiningClientService.getLatentSkills()
        .subscribe(data => this.latentSkillsFromDataMining = data);
    }
  }

  public isLoaded(): boolean {
    return this.latentSkillsFromDataMining != null;
  }
}
