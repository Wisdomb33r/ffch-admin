import {Personnage} from '../model/personnage.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Character} from '../model/character.model';
import {SkillsService} from './skills.service';
import {Competence} from '../model/competence.model';

@Injectable()
export class CharactersService {

  private charactersFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService) {
    this.loadCharactersFromDataMining();
  }

  public loadCharactersFromDataMining() {
    if (this.charactersFromDataMining == null) {
      this.dataMiningClientService.getCharacters$()
        .subscribe(data => this.charactersFromDataMining = data);
    }
  }

  public searchForCharacterByName(name: string): Personnage {
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const property = propertyNames.find(propertyName => this.charactersFromDataMining[propertyName].name === name);
      if (property) {
        const character: Character = this.charactersFromDataMining[property];
        const competences: Array<Competence> = this.skillsService.searchForSkills(character.skills);
        return CharacterMapper.toPersonnage(character, competences, +property);
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.charactersFromDataMining != null;
  }
}

