import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CharactersService} from './characters.service';
import {DataMiningClientService} from './data-mining-client.service';
import {Personnage} from '../model/personnage.model';
import {CHARACTER_TEST_DATA} from '../model/character.model.spec';
import {SkillsService} from './skills.service';

class DataMiningMock {
  public getCharacters$(): Observable<Object> {
    return Observable.of(JSON.parse(CHARACTER_TEST_DATA));
  }
}

class SkillsServiceMock {
  public searchForSkills(skills) {
    return [];
  }
}

describe('CharactersService', () => {
  let dataMiningService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersService,
        {provide: DataMiningClientService, useClass: DataMiningMock},
        {provide: SkillsService, useClass: SkillsServiceMock},
      ]
    });
  });

  beforeEach(inject([DataMiningClientService], (service: DataMiningClientService) => {
    this.dataMiningService = service;
    spyOn(this.dataMiningService, 'getCharacters$').and.callThrough();
  }));

  it('should be created', inject([CharactersService], (service: CharactersService) => {
    expect(service).toBeTruthy();
  }));

  it('should load characters from data mining', inject([CharactersService], (service: CharactersService) => {
    // WHEN
    service.loadCharactersFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    service.loadCharactersFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(this.dataMiningService.getCharacters$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct character when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    const personnage: Personnage = service.searchForCharacterByName('Hunter Rain');
    // THEN
    expect(personnage).toBeTruthy();
    expect(personnage.gumi_id).toEqual(100000115);
    expect(personnage.min_rank).toEqual(5);
    expect(personnage.max_rank).toEqual(6);
  }));

  it('should find null when searched if character not present', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    const personnage = service.searchForCharacterByName('Raining');
    // THEN
    expect(personnage).toBeFalsy();
  }));
});
