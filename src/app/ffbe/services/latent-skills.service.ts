import {Injectable} from '@angular/core';
import {DataMiningClientService} from './data-mining-client.service';
import {LatentSkill} from '../model/latent-skill.model';
import {FfbeUtils} from '../utils/ffbe-utils';

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

  public searchForLatentSkillsByCharacterGumiId(characterGumiId: number): Array<LatentSkill> {
    const propertyNames: string[] = Object.getOwnPropertyNames(this.latentSkillsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (!FfbeUtils.isNullOrUndefined(characterGumiId)) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.latentSkillsFromDataMining[propertyName].units.some(unit => unit === characterGumiId)
      );
    }
    return this.createLatentSkillsFromMatchingProperties(matchingProperties);
  }

  protected createLatentSkillsFromMatchingProperties(matchingProperties: Array<string>): Array<LatentSkill> {
    const latentSkills: Array<LatentSkill> = [];
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const latentSkill: LatentSkill = this.latentSkillsFromDataMining[property];
        latentSkill.gumi_id = +property;
        this.addBaseSkillAndLevel(latentSkill);
        latentSkills.push(latentSkill);
      });
    }
    return latentSkills;
  }

  protected addBaseSkillAndLevel(latentSkill: LatentSkill) {
    const latentSkillGumiIdChain: Array<number> = [latentSkill.gumi_id];
    let parentSkillGumiId: number;
    while (parentSkillGumiId = this.searchForParentLatentSkillByGumiId(latentSkillGumiIdChain[latentSkillGumiIdChain.length - 1])) {
      latentSkillGumiIdChain.push(parentSkillGumiId);
    }
    latentSkill.skill_id_base = this.latentSkillsFromDataMining[latentSkillGumiIdChain[latentSkillGumiIdChain.length - 1]].skill_id;
    if (latentSkillGumiIdChain.length >= 2) {
      latentSkill.skill_id_parent = this.latentSkillsFromDataMining[latentSkillGumiIdChain[1]].skill_id;
    }
    latentSkill.level = latentSkillGumiIdChain.length - 1;
  }

  protected searchForParentLatentSkillByGumiId(skillGumiId: number): number {
    const propertyNames: string[] = Object.getOwnPropertyNames(this.latentSkillsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (!FfbeUtils.isNullOrUndefined(skillGumiId)) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.latentSkillsFromDataMining[propertyName].next_id === skillGumiId
      );
    }
    let parentGumiId: number = null;
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      parentGumiId = this.latentSkillsFromDataMining[matchingProperties[0]].gumi_id;
    }
    return parentGumiId;
  }
}
