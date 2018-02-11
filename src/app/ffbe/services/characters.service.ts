import {Character} from '../model/character.model';
import {DataMiningClientService} from './data-mining-client.service';
import {HttpClient} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class CharactersService {

  public charactersFromDataMining = null;
  public character: Character = null;

  constructor(private dataMiningClientService: DataMiningClientService) {}

  public loadCharactersFromDataMining() {
    if (this.charactersFromDataMining == null) {
      this.dataMiningClientService.getCharacters$()
        .subscribe(data => this.charactersFromDataMining = data);
    }
  }

  public searchForCharacterByName(name: string) {
    this.character = null;
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const property = propertyNames.find(propertyName => this.charactersFromDataMining[propertyName].name === name);
      if (property) {
        this.character = this.charactersFromDataMining[property];
      }
    }
  }
}
