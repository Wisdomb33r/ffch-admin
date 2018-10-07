import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {LimitBurstsService} from './limit-bursts.service';
import {DataMiningClientService} from './data-mining-client.service';
import {LIMIT_BURST_TEST_DATA} from '../model/limit-burst.model.spec';
import {LimitBurst} from '../model/limit-burst.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

class DataMiningMock {
  public getLimitBursts$(): Observable<Object> {
    return of(JSON.parse(LIMIT_BURST_TEST_DATA));
  }
}

describe('LimitBurstsService', () => {
  let dataMiningService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LimitBurstsService,
        {provide: DataMiningClientService, useClass: DataMiningMock}
      ]
    });
  });

  beforeEach(inject([DataMiningClientService], (service: DataMiningClientService) => {
    dataMiningService = service;
    spyOn(dataMiningService, 'getLimitBursts$').and.callThrough();
  }));

  it('should be created', inject([LimitBurstsService], (service: LimitBurstsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load limit bursts from data mining', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // WHEN
    service.loadLimitBurstsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // GIVEN
    service.loadLimitBurstsFromDataMining();
    // WHEN
    service.loadLimitBurstsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(dataMiningService.getLimitBursts$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct limit burst when searched if present in data mining', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // GIVEN
    service.loadLimitBurstsFromDataMining();
    // WHEN
    const limite: LimitBurst = service.searchForLimitBurstByGumiId(100000103);
    // THEN
    expect(limite).toBeTruthy();
    expect(limite.strings.name[FFBE_FRENCH_TABLE_INDEX]).toEqual('Entaille pourpre');
    expect(limite.strings.desc[FFBE_FRENCH_TABLE_INDEX]).toEqual('Dégâts de feu sur un ennemi');
    expect(limite.attack_frames[0]).toEqual([3, 59]);
  }));

  it('should find null when searched if limit burst not present', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // GIVEN
    service.loadLimitBurstsFromDataMining();
    // WHEN
    const limite: LimitBurst = service.searchForLimitBurstByGumiId(900000103);
    // THEN
    expect(limite).toBeFalsy();
  }));
});
