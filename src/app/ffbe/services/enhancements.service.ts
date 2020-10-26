import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Enhancement} from '../model/enhancement.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {FfbeUtils} from '../utils/ffbe-utils';
import {BaseActivatedEnhancementsContainer} from '../model/base-activated-enhancements-container.model';
import {SkillsService} from './skills.service';
import {Skill} from '../model/skill.model';

@Injectable()
export class EnhancementsService {

  private enhancementsFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService) {
    this.loadEnhancementsFromDataMining();
  }

  public loadEnhancementsFromDataMining() {
    if (this.enhancementsFromDataMining == null) {
      this.dataMiningClientService.getEnhancements$()
        .subscribe(data => this.enhancementsFromDataMining = data);
    }
  }

  public searchForEnhancementsByNames(english: string, french: string): BaseActivatedEnhancementsContainer {
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

  public searchForEnhancementsBySkillGumiId(skillGumiId: number): BaseActivatedEnhancementsContainer {
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

  public searchForEnhancementsByCharacterGumiId(characterGumiId: number): BaseActivatedEnhancementsContainer {
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

  protected createEnhancementsFromMatchingProperties(matchingProperties: Array<string>): BaseActivatedEnhancementsContainer {
    const baseEnhancements: Array<Enhancement> = [];
    // TODO: Change enhancementContainer so that both arrays have length 0 by default
    const activatedEnhancements: Array<Enhancement> = [];
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const enhancement: Enhancement = this.enhancementsFromDataMining[property];
        enhancement.gumi_id = +property;
        this.addBaseSkillAndLevel(enhancement);
        baseEnhancements.push(enhancement);
        Array.prototype.push.apply(activatedEnhancements, this.computeActivatedEnhancements(enhancement));
      });
    }
    return new BaseActivatedEnhancementsContainer(baseEnhancements, activatedEnhancements);
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

  protected computeActivatedEnhancements(baseEnhancement: Enhancement): Array<Enhancement> {
    const activatedEnhancements = [];

    console.log('searching old skill:');
    const oldSkill = this.skillsService.searchForSkillByGumiId(baseEnhancement.skill_id_old);
    const newSkill = this.skillsService.searchForSkillByGumiId(baseEnhancement.skill_id_new);
    const baseSkill = this.skillsService.searchForSkillByGumiId(baseEnhancement.skill_id_base);
    console.log('old skill:');
    console.log(oldSkill);
    console.log('new skill:');

    console.log(newSkill);

    const skillsActivatedByOldSkill = oldSkill.activatedSkills;
    const skillsActivatedByNewSkill = newSkill.activatedSkills;
    const skillsActivatedByBaseSkill = baseSkill.activatedSkills;

    console.log(skillsActivatedByOldSkill);
    console.log(skillsActivatedByNewSkill);

    if (skillsActivatedByOldSkill.length > 0 && skillsActivatedByNewSkill.length > 0
      && skillsActivatedByOldSkill.length === skillsActivatedByNewSkill.length) {
      skillsActivatedByOldSkill.forEach((skill: Skill, index: number) => {
        const activatedEnhancement = new Enhancement();
        activatedEnhancement.units = baseEnhancement.units;
        activatedEnhancement.skill_id_old = skill.gumi_id;
        activatedEnhancement.skill_id_new = skillsActivatedByNewSkill[index].gumi_id;
        activatedEnhancement.skill_id_base = skillsActivatedByBaseSkill[index].gumi_id;
        activatedEnhancement.level = baseEnhancement.level;
        // TODO: Add cost
        // TODO: Add names & description
        activatedEnhancements.push(activatedEnhancement);
      });
    }
    console.log('activated enhancements:');
    console.log(activatedEnhancements);
    return activatedEnhancements;
  }
}
