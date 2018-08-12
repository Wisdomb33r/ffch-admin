import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Enhancement} from '../model/enhancement.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {isNullOrUndefined} from 'util';

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
    const enhancements: Array<Enhancement> = [];
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
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const enhancement: Enhancement = this.enhancementsFromDataMining[property];
        enhancement.gumi_id = +property;
        enhancements.push(enhancement);
      });
    }
    return enhancements;
  }

  public searchForEnhancementsBySkillGumiId(skillGumiId: number): Array<Enhancement> {
    const enhancements: Array<Enhancement> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.enhancementsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (!isNullOrUndefined(skillGumiId)) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.enhancementsFromDataMining[propertyName].skill_id_old === skillGumiId
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const enhancement: Enhancement = this.enhancementsFromDataMining[property];
        enhancement.gumi_id = +property;
        enhancements.push(enhancement);
      });
    }
    return enhancements;
  }

  public searchForEnhancementsByCharacterGumiId(characterGumiId: number): Array<Enhancement> {
    const enhancements: Array<Enhancement> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.enhancementsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (!isNullOrUndefined(characterGumiId)) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.enhancementsFromDataMining[propertyName].units.some(unit => unit === characterGumiId)
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const enhancement: Enhancement = this.enhancementsFromDataMining[property];
        enhancement.gumi_id = +property;
        enhancements.push(enhancement);
      });
    }
    return enhancements;
  }

  public isLoaded(): boolean {
    return this.enhancementsFromDataMining != null;
  }
}
