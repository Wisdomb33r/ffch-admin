import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Character} from '../model/character.model';
import {SkillsService} from './skills.service';
import {CharacterSkill} from '../model/character-skill.model';
import {CharacterEntry} from '../model/character-entry.model';
import {LimitBurstsService} from './limit-bursts.service';

@Injectable()
export class CharactersService {

  private charactersFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService,
              private lbService: LimitBurstsService) {
    this.loadCharactersFromDataMining();
  }

  public loadCharactersFromDataMining() {
    if (this.charactersFromDataMining == null) {
      this.dataMiningClientService.getCharacters$()
        .subscribe(data => this.charactersFromDataMining = data);
    }
  }

  public searchForCharacterByName(name: string): Character {
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const property = propertyNames.find(propertyName => this.charactersFromDataMining[propertyName].name === name);
      if (property) {
        const character: Character = this.charactersFromDataMining[property];
        character.gumi_id = +property;
        this.loadCharacterSkills(character.skills);
        this.loadLimitBurst(character.entries);
        return character;
      }
    }
    return null;
  }

  private loadCharacterSkills(skills: Array<CharacterSkill>) {
    skills.forEach(characterSkill => characterSkill.skill = this.skillsService.searchForSkillByGumiId(characterSkill.id));
  }

  private loadLimitBurst(entries: any) {
    const entryNames: string[] = Object.getOwnPropertyNames(entries);
    for (const entryName of entryNames) {
      const entry: CharacterEntry = entries[entryName];
      entry.lb = this.lbService.searchForLimitBurstByGumiId(entry.limitburst_id);
    }
  }

  public isLoaded(): boolean {
    return this.charactersFromDataMining != null;
  }
}

