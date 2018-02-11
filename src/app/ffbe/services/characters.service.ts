import {Character} from '../model/character.model';
import {Personnage} from '../model/personnage.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {DataMiningClientService} from './data-mining-client.service';
import {HttpClient} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class CharactersService {

  public charactersFromDataMining = null;
  public personnage: Personnage = null;

  constructor(private dataMiningClientService: DataMiningClientService) {}

  public loadCharactersFromDataMining() {
    if (this.charactersFromDataMining == null) {
      this.dataMiningClientService.getCharacters$()
        .subscribe(data => this.charactersFromDataMining = data);
    }
  }

  public searchForCharacterByName(name: string) {
    this.personnage = null;
    if (this.charactersFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.charactersFromDataMining);
      const property = propertyNames.find(propertyName => this.charactersFromDataMining[propertyName].name === name);
      if (property) {
        this.personnage = CharacterMapper.toPersonnage(this.charactersFromDataMining[property], +property);
      }
    }
  }
}

