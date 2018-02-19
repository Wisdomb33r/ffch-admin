import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Skill} from '../model/skill.model';

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

  public searchForSkillByGumiId(id: number): Skill {
    if (this.skillsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.skillsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const skill: Skill = this.skillsFromDataMining[property];
        skill.gumi_id = +property;
        return skill;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.skillsFromDataMining != null;
  }
}

