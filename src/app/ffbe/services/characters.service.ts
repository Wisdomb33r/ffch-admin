import {Personnage} from '../model/personnage.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';

@Injectable()
export class CharactersService {

  private charactersFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
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
        return CharacterMapper.toPersonnage(this.charactersFromDataMining[property], +property);
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.charactersFromDataMining != null;
  }
}

