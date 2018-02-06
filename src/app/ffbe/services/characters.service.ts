import {Character} from '../model/character.model';
import {DataMiningClientService} from './data-mining-client.service';
import {HttpClient} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class CharactersService {

  charactersFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {}

  loadCharactersFromDataMining() {
    if (this.charactersFromDataMining == null) {
      this.dataMiningClientService.getCharacters$()
        .subscribe(data => this.charactersFromDataMining = data);
    }
  }

  searchForCharacterByName(name: string): Character {
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const filteredProperties = propertyNames.filter(propertyName => this.charactersFromDataMining[propertyName].name === name);
      if (filteredProperties.length === 1) {
        return this.charactersFromDataMining[filteredProperties[0]];
      }
    }
    return null;
  }
}
