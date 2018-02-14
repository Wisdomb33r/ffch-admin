import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {LimitBurstsService} from './limit-bursts.service';
import {DataMiningClientService} from './data-mining-client.service';
import {Limite} from '../model/limite.model';
import {LIMIT_BURST_TEST_DATA} from '../model/limit-burst.model.spec';

class DataMiningMock {
  public getLimitBursts$(): Observable<Object> {
    return Observable.of(JSON.parse(LIMIT_BURST_TEST_DATA));
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
    this.dataMiningService = service;
    spyOn(this.dataMiningService, 'getLimitBursts$').and.callThrough();
  }));

  it('should be created', inject([LimitBurstsService], (service: LimitBurstsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load limit bursts from data mining', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // WHEN
    service.loadLimitBurstsFromDataMining();
    // THEN
    expect(service.limitBurstsFromDataMining).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // GIVEN
    service.loadLimitBurstsFromDataMining();
    // WHEN
    service.loadLimitBurstsFromDataMining();
    // THEN
    expect(service.limitBurstsFromDataMining).toBeTruthy();
    expect(this.dataMiningService.getLimitBursts$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct limit burst when searched if present in data mining', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // GIVEN
    service.loadLimitBurstsFromDataMining();
    // WHEN
    const limite: Limite = service.searchForLimitBurstByGumiId(100000103);
    // THEN
    expect(limite).toBeTruthy();
    expect(limite.nom).toEqual('Entaille pourpre');
    expect(limite.description).toEqual('Dégâts de feu sur un ennemi');
    expect(limite.frames).toEqual('3 59');
  }));

  it('should find null when searched if limit burst not present', inject([LimitBurstsService], (service: LimitBurstsService) => {
    // GIVEN
    service.loadLimitBurstsFromDataMining();
    // WHEN
    const limite: Limite = service.searchForLimitBurstByGumiId(900000103);
    // THEN
    expect(limite).toBeFalsy();
  }));
});
