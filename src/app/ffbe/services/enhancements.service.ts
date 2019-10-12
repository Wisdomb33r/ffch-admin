import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Enhancement} from '../model/enhancement.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {FfbeUtils} from '../utils/ffbe-utils';

@Injectable()
export class EnhancementsService {

  private enhancementsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadEnhancementsFromDataMining();
  }

  public loadEnhancementsFromDataMining() {
    if (this.enhancementsFromDataMining == null) {
      this.dataMiningClientService.getEnhancements$()
        .subscribe(data => this.enhancementsFromDataMining = data);
    }
  }

  public searchForEnhancementsByNames(english: string, french: string): Array<Enhancement> {
    const propertyNames: string[] = Object.getOwnPropertyNames(this.enhancementsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.enhancementsFromDataMining[propertyName].name === english
          && this.enhancementsFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.enhancementsFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.enhancementsFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    return this.createEnhancementsFromMatchingProperties(matchingProperties);
  }

  public searchForEnhancementsBySkillGumiId(skillGumiId: number): Array<Enhancement> {
    const propertyNames: string[] = Object.getOwnPropertyNames(this.enhancementsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (!FfbeUtils.isNullOrUndefined(skillGumiId)) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.enhancementsFromDataMining[propertyName].skill_id_old === skillGumiId
      );

      if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
        matchingProperties.forEach(propertyName => {
          matchingProperties = matchingProperties.concat(propertyNames.filter(
            innerPropertyName =>
              this.enhancementsFromDataMining[innerPropertyName].skill_id_old === this.enhancementsFromDataMining[propertyName].skill_id_new
          ));
        });
      }
    }
    return this.createEnhancementsFromMatchingProperties(matchingProperties);
  }

  public searchForEnhancementsByCharacterGumiId(characterGumiId: number): Array<Enhancement> {
    const propertyNames: string[] = Object.getOwnPropertyNames(this.enhancementsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (!FfbeUtils.isNullOrUndefined(characterGumiId)) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.enhancementsFromDataMining[propertyName].units.some(unit => unit === characterGumiId)
      );
    }
    return this.createEnhancementsFromMatchingProperties(matchingProperties);
  }

  public isLoaded(): boolean {
    return this.enhancementsFromDataMining != null;
  }

  protected createEnhancementsFromMatchingProperties(matchingProperties: Array<string>): Array<Enhancement> {
    const enhancements: Array<Enhancement> = [];
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const enhancement: Enhancement = this.enhancementsFromDataMining[property];
        enhancement.gumi_id = +property;
        this.addBaseSkillAndLevel(enhancement);
        enhancements.push(enhancement);
      });
    }
    return enhancements;
  }

  protected addBaseSkillAndLevel(enhancement: Enhancement) {
    const skillGumiIdChain: Array<number> = [enhancement.skill_id_new, enhancement.skill_id_old];
    let parentSkillGumiId: number;
    while (parentSkillGumiId = this.searchForParentSkillByGumiId(skillGumiIdChain[skillGumiIdChain.length - 1])) {
      skillGumiIdChain.push(parentSkillGumiId);
    }
    enhancement.skill_id_base = skillGumiIdChain[skillGumiIdChain.length - 1];
    enhancement.level = skillGumiIdChain.length - 1;
  }

  protected searchForParentSkillByGumiId(skillGumiId: number) {
    const propertyNames: string[] = Object.getOwnPropertyNames(this.enhancementsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (!FfbeUtils.isNullOrUndefined(skillGumiId)) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.enhancementsFromDataMining[propertyName].skill_id_new === skillGumiId
      );
    }
    let parentSkillGumiId: number = null;
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      parentSkillGumiId = this.enhancementsFromDataMining[matchingProperties[0]].skill_id_old;
    }
    return parentSkillGumiId;
  }
}
