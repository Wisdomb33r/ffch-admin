import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Skill} from '../model/skill.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {forkJoin} from 'rxjs';
import {plainToClass} from 'class-transformer';

@Injectable()
export class SkillsService {
  private static INSTANCE: SkillsService;

  private skillsFromDataMining = null;
  private skillsNamesFromDataMining = null;
  private skillsDescriptionsFromDataMining = null;

  public static getInstance(): SkillsService {
    return SkillsService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadSkillsFromDataMining();
    SkillsService.INSTANCE = this;
  }

  public loadSkillsFromDataMining() {
    if (this.skillsFromDataMining == null) {
      const observables = [];
      observables.push(this.dataMiningClientService.getSkillsAbility$());
      observables.push(this.dataMiningClientService.getSkillsMagic$());
      observables.push(this.dataMiningClientService.getSkillsPassive$());
      observables.push(this.dataMiningClientService.getSkillsNames$());
      observables.push(this.dataMiningClientService.getSkillsMagicNames$());
      observables.push(this.dataMiningClientService.getSkillsDescriptions$());
      observables.push(this.dataMiningClientService.getSkillsMagicDescriptions$());
      forkJoin(observables)
        .subscribe((data: any) => {
          this.skillsFromDataMining = {...data[0], ...data[1], ...data[2]};
          this.skillsNamesFromDataMining = {...data[3], ...data[4]};
          this.skillsDescriptionsFromDataMining = {...data[5], ...data[6]};
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
        skills.push(this.convertPlainDataMiningObjectToSkill(property));
      });
    }
    return skills;
  }

  public searchForSkillByGumiId(id: number): Skill {
    if (this.skillsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.skillsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        return this.convertPlainDataMiningObjectToSkill(property);
      }
    }
    return null;
  }

  private convertPlainDataMiningObjectToSkill(property: string): Skill {
    const skill: Skill = plainToClass(Skill, this.skillsFromDataMining[property]);
    skill.gumi_id = +property;
    skill.names = this.skillsNamesFromDataMining[property];
    skill.descriptions = this.skillsDescriptionsFromDataMining[property];
    skill.initializeSkillEffects();
    return skill;
  }

  public isLoaded(): boolean {
    return this.skillsFromDataMining && this.skillsNamesFromDataMining && this.skillsDescriptionsFromDataMining;
  }
}

