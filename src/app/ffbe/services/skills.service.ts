import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Skill} from '../model/skill.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {forkJoin} from 'rxjs';
import {SkillStrings} from '../model/skill-strings.model';

@Injectable()
export class SkillsService {

  private skillsFromDataMining = null;
  private skillsNamesFromDataMining = null;
  private skillsDescriptionsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadSkillsFromDataMining();
  }

  public loadSkillsFromDataMining() {
    if (this.skillsFromDataMining == null) {
      const observables = [];
      observables.push(this.dataMiningClientService.getSkillsAbility$());
      observables.push(this.dataMiningClientService.getSkillsMagic$());
      observables.push(this.dataMiningClientService.getSkillsPassive$());
      observables.push(this.dataMiningClientService.getSkillsNames$());
      observables.push(this.dataMiningClientService.getSkillsDescriptions$());
      forkJoin(observables)
        .subscribe(data => {
          this.skillsFromDataMining = {...data[0], ...data[1], ...data[2]};
          this.skillsNamesFromDataMining = data[1];
          this.skillsDescriptionsFromDataMining = data[2];
        });
    }
  }

  public searchForSkillsByNames(english: string, french: string): Array<Skill> {
    const skills: Array<Skill> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.skillsNamesFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.skillsNamesFromDataMining[propertyName][FFBE_ENGLISH_TABLE_INDEX] === english
          && this.skillsNamesFromDataMining[propertyName][FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.skillsNamesFromDataMining[propertyName][FFBE_ENGLISH_TABLE_INDEX] === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.skillsNamesFromDataMining[propertyName][FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const skill: Skill = this.skillsFromDataMining[property];
        skill.gumi_id = +property;
        skill.strings = new SkillStrings();
        skill.strings.name = this.skillsNamesFromDataMining[property];
        skill.strings.desc_short = this.skillsDescriptionsFromDataMining[property];
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
    return this.skillsFromDataMining && this.skillsNamesFromDataMining && this.skillsDescriptionsFromDataMining;
  }
}

