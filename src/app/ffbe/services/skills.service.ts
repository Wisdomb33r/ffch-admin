import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Skill} from '../model/skill.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {forkJoin, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

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
    // this.loadSkillsFromDataMining();
    SkillsService.INSTANCE = this;
  }

  public loadSkillsFromDataMining(): Observable<any> {
    console.log('loading DM skills');
    if (this.skillsFromDataMining == null) {
      const observables = [];
      observables.push(this.dataMiningClientService.getSkillsAbility$());
      observables.push(this.dataMiningClientService.getSkillsMagic$());
      observables.push(this.dataMiningClientService.getSkillsPassive$());
      observables.push(this.dataMiningClientService.getSkillsNames$());
      observables.push(this.dataMiningClientService.getSkillsMagicNames$());
      observables.push(this.dataMiningClientService.getSkillsDescriptions$());
      observables.push(this.dataMiningClientService.getSkillsMagicDescriptions$());
      return forkJoin(observables).pipe(
        tap((data: any) => {console.log('DM loaded');
          this.skillsFromDataMining = {...data[0], ...data[1], ...data[2]};
          this.skillsNamesFromDataMining = {...data[3], ...data[4]};
          this.skillsDescriptionsFromDataMining = {...data[5], ...data[6]};
        })
      );
    } else {
      return of(true);
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
        const skill: Skill = Skill.produce(this.skillsFromDataMining[property]);
        skill.gumi_id = +property;
        skill.names = this.skillsNamesFromDataMining[property];
        skill.descriptions = this.skillsDescriptionsFromDataMining[property];
        skills.push(skill);
      });
    }
    return skills;
  }

  public searchForSkillByGumiId(id: number): Skill {
    console.log('searching for skill with id ' + id);
    if (this.skillsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.skillsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const skill: Skill = Skill.produce(this.skillsFromDataMining[property]);
        skill.gumi_id = +property;
        skill.names = this.skillsNamesFromDataMining[property];
        skill.descriptions = this.skillsDescriptionsFromDataMining[property];
        return skill;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.skillsFromDataMining && this.skillsNamesFromDataMining && this.skillsDescriptionsFromDataMining;
  }
}

