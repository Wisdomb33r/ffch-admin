import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Character} from '../model/character/character.model';
import {SkillsService} from './skills.service';
import {CharacterSkill} from '../model/character/character-skill.model';
import {CharacterEntry} from '../model/character/character-entry.model';
import {LimitBurstsService} from './limit-bursts.service';
import {FFBE_CHARACTER_GUMI_ID_LENGTH} from '../ffbe.constants';
import {ItemCategory, ItemCategoryFactory} from '../model/items/item-category.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {EnhancementsService} from './enhancements.service';
import {LatentSkillsService} from './latent-skills.service';
import {CharacterEntryMapper} from '../mappers/character-entry-mapper';

@Injectable()
export class CharactersService {
  private static INSTANCE: CharactersService;

  private charactersFromDataMining = null;

  public static getInstance(): CharactersService {
    return CharactersService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService,
              private lbService: LimitBurstsService,
              private enhancementsService: EnhancementsService,
              private latentSkillsService: LatentSkillsService) {
    this.loadCharactersFromDataMining();
    CharactersService.INSTANCE = this;
  }

  public loadCharactersFromDataMining() {
    if (this.charactersFromDataMining == null) {
      this.dataMiningClientService.getCharacters$()
        .subscribe(data => this.charactersFromDataMining = data);
    }
  }

  public searchForCharactersByName(name: string): Array<Character> {
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const properties = propertyNames.filter(propertyName => this.charactersFromDataMining[propertyName].name === name);
      if (properties && properties.length > 0) {
        const characters: Array<Character> = [];
        properties.forEach(property => {
          const character: Character = this.charactersFromDataMining[property];
          character.gumi_id = +property;
          this.loadCharacterSkills(character.skills);
          this.loadLimitBurst(character.entries);
          this.loadEnhancedLimitBurst(character);
          characters.push(character);
        });
        return characters;
      }
    }
    return null;
  }

  public searchForShallowCharacterByGumiId(id: number): Character {
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const character: Character = this.charactersFromDataMining[property];
        character.gumi_id = +property;
        return character;
      }
    }
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

  public searchForCharactersByNameOrGumiId(name: string): Array<Character> {
    if (this.charactersFromDataMining != null) {
      const tentativeGumiId = Number(name);
      if (name.length == FFBE_CHARACTER_GUMI_ID_LENGTH && !isNaN(tentativeGumiId)) {
        return [this.searchForCharacterByGumiId(tentativeGumiId)];
      } else {
        return this.searchForCharactersByName(name);
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

    const latentSkillGumiIds = this.latentSkillsService.searchForLatentSkillsByCharacterGumiId(character.gumi_id)
      .map(latent => latent.skill_id);
    const latentSkills = [];
    latentSkillGumiIds.forEach(latentSkillGumiId => latentSkills.push(this.skillsService.searchForSkillByGumiId(latentSkillGumiId)));

    for (const entryName of entryNames) {
      const entry: CharacterEntry = character.entries[entryName];
      const innateSkills = character.skills.filter(skill =>
        (CharacterEntryMapper.computeCharacterSkillRarity(skill) <= CharacterEntryMapper.computeCharacterEntryRarity(entry)));
      entry.characterEntrySkills = innateSkills;
      const enhancedSkills = [];
      innateSkills.forEach(innateSkill =>
        this.enhancementsService.searchForEnhancementsBySkillGumiId(innateSkill.id)
          .map(enhancement => enhancement.units.includes(character.gumi_id) ?
            enhancedSkills.push(this.skillsService.searchForSkillByGumiId(enhancement.skill_id_new)) : null)
      );

      const availableSkills = innateSkills.map(innateSkill => innateSkill.skill).concat(enhancedSkills).concat(latentSkills);
      const lbEnhancingEffects = availableSkills.map(skill =>
        FfbeUtils.isNullOrUndefined(skill) || skill.active === true ? null : skill.effects_raw
          .find(effect => effect[2] === 72 || effect[2] === 80))
        .filter(effect => !FfbeUtils.isNullOrUndefined(effect));
      entry.upgraded_limitburst_id = lbEnhancingEffects && lbEnhancingEffects.length > 0
      && lbEnhancingEffects[lbEnhancingEffects.length - 1] && lbEnhancingEffects[lbEnhancingEffects.length - 1].length > 3
      && lbEnhancingEffects[lbEnhancingEffects.length - 1][3].length > 0
        ? lbEnhancingEffects[lbEnhancingEffects.length - 1][3][0] : null;
      entry.upgraded_lb = this.lbService.searchForLimitBurstByGumiId(entry.upgraded_limitburst_id);
    }
  }

  public isLoaded(): boolean {
    return this.charactersFromDataMining != null;
  }
}

