import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Character} from '../model/character.model';
import {SkillsService} from './skills.service';
import {CharacterSkill} from '../model/character-skill.model';
import {CharacterEntry} from '../model/character-entry.model';
import {LimitBurstsService} from './limit-bursts.service';
import {FFBE_CHARACTER_GUMI_ID_LENGTH} from '../ffbe.constants';
import {ItemCategory, ItemCategoryFactory} from '../model/item-category.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Injectable()
export class CharactersService {
  private static INSTANCE: CharactersService;

  private charactersFromDataMining = null;

  public static getInstance(): CharactersService {
    return CharactersService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService,
              private lbService: LimitBurstsService) {
    this.loadCharactersFromDataMining();
    CharactersService.INSTANCE = this;
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
        this.loadEnhancedLimitBurst(character);
        return character;
      }
    }
    return null;
  }

  public searchForCharacterByGumiId(id: number): Character {
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const character: Character = this.charactersFromDataMining[property];
        character.gumi_id = +property;
        this.loadCharacterSkills(character.skills);
        this.loadLimitBurst(character.entries);
        this.loadEnhancedLimitBurst(character);
        return character;
      }
    }
    return null;
  }

  public searchForCharacterByNameOrGumiId(name: string): Character {
    if (this.charactersFromDataMining != null) {
      const tentativeGumiId = Number(name);
      if (name.length == FFBE_CHARACTER_GUMI_ID_LENGTH && !isNaN(tentativeGumiId)) {
        return this.searchForCharacterByGumiId(tentativeGumiId);
      } else {
        return this.searchForCharacterByName(name);
      }
    }
    return null;
  }

  public searchForCharacterByTrustMasterReward(rewardType: ItemCategory, rewardGumiId: number): Character {
    if (this.charactersFromDataMining != null) {
      const categoryName = ItemCategoryFactory.getName(rewardType);
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const property = propertyNames.find(propertyName => (
        (Array.isArray(this.charactersFromDataMining[propertyName].TMR) &&
          this.charactersFromDataMining[propertyName].TMR.length === 2 &&
          this.charactersFromDataMining[propertyName].TMR[0] === categoryName &&
          this.charactersFromDataMining[propertyName].TMR[1] === rewardGumiId) ||
        (Array.isArray(this.charactersFromDataMining[propertyName].sTMR) &&
          this.charactersFromDataMining[propertyName].sTMR.length === 2 &&
          this.charactersFromDataMining[propertyName].sTMR[0] === categoryName &&
          this.charactersFromDataMining[propertyName].sTMR[1] === rewardGumiId)
      ));
      if (property) {
        const character: Character = this.charactersFromDataMining[property];
        character.gumi_id = +property;
        this.loadCharacterSkills(character.skills);
        this.loadLimitBurst(character.entries);
        this.loadEnhancedLimitBurst(character);
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

  private loadEnhancedLimitBurst(character: Character) {
    const entryNames: string[] = Object.getOwnPropertyNames(character.entries);
    for (const entryName of entryNames) {
      const entry: CharacterEntry = character.entries[entryName];
      const availableSkills = character.skills.filter(skill => skill.rarity <= entry.rarity);
      const effect = availableSkills.map(skill =>
        FfbeUtils.isNullOrUndefined(skill.skill) ? null : skill.skill.effects_raw.find(effect => effect[2] === 72))
        .filter(effect => !FfbeUtils.isNullOrUndefined(effect));
      entry.upgraded_limitburst_id = effect && effect.length > 0 && effect[0] && effect[0].length > 3 && effect[0][3].length > 0 ? effect[0][3][0] : null;
      entry.upgraded_lb = this.lbService.searchForLimitBurstByGumiId(entry.upgraded_limitburst_id);
    }
  }

  public isLoaded(): boolean {
    return this.charactersFromDataMining != null;
  }
}

