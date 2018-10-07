import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {CharactersService} from './characters.service';
import {DataMiningClientService} from './data-mining-client.service';
import {CHARACTER_TEST_DATA} from '../model/character.model.spec';
import {SkillsService} from './skills.service';
import {Character} from '../model/character.model';
import {LimitBurstsService} from './limit-bursts.service';

class DataMiningMock {
  public getCharacters$(): Observable<Object> {
    return of(JSON.parse(CHARACTER_TEST_DATA));
  }
}

class SkillsServiceMock {
  public searchForSkillByGumiId(id) {
    return [];
  }
}

class LimitBurstServiceMock {
  public searchForLimitBurstByGumiId(id) {
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
        {provide: LimitBurstsService, useClass: LimitBurstServiceMock},
      ]
    });
  });

  beforeEach(inject([DataMiningClientService], (service: DataMiningClientService) => {
    dataMiningService = service;
    spyOn(dataMiningService, 'getCharacters$').and.callThrough();
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
    expect(dataMiningService.getCharacters$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct character when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    const character: Character = service.searchForCharacterByName('Hunter Rain');
    // THEN
    expect(character).toBeTruthy();
    expect(character.gumi_id).toEqual(100000115);
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
