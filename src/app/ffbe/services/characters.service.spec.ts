import {TestBed, inject} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {CharactersService} from './characters.service';
import {DataMiningClientService} from './data-mining-client.service';

class DataMiningMock {

}

describe('CharactersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersService,
        {provide: DataMiningClientService, useClass: DataMiningMock}
      ]
    });
  });

  it('should be created', inject([CharactersService], (service: CharactersService) => {
    expect(service).toBeTruthy();
  }));

  it('should load characters from data mining', inject([CharactersService], (service: CharactersService) => {
    // WHEN
    service.loadCharactersFromDataMining();
    // THEN
    expect(service.charactersFromDataMining).toBeTruthy();
  }));
});
