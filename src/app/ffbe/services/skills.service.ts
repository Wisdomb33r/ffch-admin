import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Competence} from '../model/competence.model';
import {SkillMapper} from '../mappers/skill-mapper';
import {CharacterSkill} from '../model/character-skill.model';

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
        return SkillMapper.toCompetence(this.skillsFromDataMining[property], +property);
      }
    }
    return null;
  }

  public searchForSkills(skills: Array<CharacterSkill>): Array<Competence> {
    const competences = [];
    if (this.skillsFromDataMining != null) {
      skills.forEach(skill => {
        const competence: Competence = this.searchForSkillByGumiId(skill.id);
        if (competence) {
          competences.push(competence);
        }
      });
    }
    return competences;
  }

  public isLoaded(): boolean {
    return this.skillsFromDataMining != null;
  }
}

