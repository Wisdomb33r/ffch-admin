import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Competence} from '../model/competence.model';
import {SkillMapper} from '../mappers/skill-mapper';

@Injectable()
export class SkillsService {

  private skillsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadSkillsFromDataMining();
  }

  public loadSkillsFromDataMining() {
    if (this.skillsFromDataMining == null) {
      this.dataMiningClientService.getSkills$()
        .subscribe(data => this.skillsFromDataMining = data);
    }
  }

  public searchForSkillByGumiId(id: number): Competence {
    if (this.skillsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.skillsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        return SkillMapper.toCompetence(this.skillsFromDataMining[property]);
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.skillsFromDataMining != null;
  }
}

