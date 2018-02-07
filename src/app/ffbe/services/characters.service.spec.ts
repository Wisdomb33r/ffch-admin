import {TestBed, inject} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CharactersService} from './characters.service';
import {DataMiningClientService} from './data-mining-client.service';

class DataMiningMock {
  public getCharacters$(): Observable<Object> {
    return Observable.of(JSON.parse('{"100000102": {"rarity_min": 2,"rarity_max": 6,"name": "Rain"},"100000115": {"rarity_min": 5,"rarity_max": 6,"name": "Hunter Rain"}}'));
  }
}

describe('CharactersService', () => {
  let dataMiningService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersService,
        {provide: DataMiningClientService, useClass: DataMiningMock}
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
    expect(service.charactersFromDataMining).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    service.loadCharactersFromDataMining();
    // THEN
    expect(service.charactersFromDataMining).toBeTruthy();
    expect(this.dataMiningService.getCharacters$).toHaveBeenCalled();
  }));

  it('should return the correct character when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    const result = service.searchForCharacterByName('Hunter Rain');
    // THEN
    expect(result).toBeTruthy();
    expect(result).toEqual(JSON.parse('{"rarity_min": 5,"rarity_max": 6,"name": "Hunter Rain"}'));
  }));

  it('should return null when searched if character not present', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    const result = service.searchForCharacterByName('Raining');
    // THEN
    expect(result).toBeFalsy();
  }));
});
