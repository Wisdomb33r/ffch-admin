import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Skill} from '../model/skill.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

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

  public searchForSkillsByNames(english: string, french: string): Array<Skill> {
    const skills: Array<Skill> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.skillsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.skillsFromDataMining[propertyName].name === english
          && this.skillsFromDataMining[propertyName].strings.name[FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.skillsFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.skillsFromDataMining[propertyName].strings.name[FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const skill: Skill = this.skillsFromDataMining[property];
        skill.gumi_id = +property;
        skills.push(skill);
      });
    }
    return skills;
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

