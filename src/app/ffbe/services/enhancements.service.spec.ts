import {Observable, of} from 'rxjs';
import {ENHANCEMENTS_TEST_DATA} from '../model/enhancement.model.testdata.spec';
import {inject, TestBed} from '@angular/core/testing';
import {DataMiningClientService} from './data-mining-client.service';
import {EnhancementsService} from './enhancements.service';

class DataMiningMock {
  public getEnhancements$(): Observable<Object> {
    return of(JSON.parse(ENHANCEMENTS_TEST_DATA));
  }
}

describe('EnhancementsService', () => {
  let dataMiningService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EnhancementsService,
        {provide: DataMiningClientService, useClass: DataMiningMock}
      ]
    });
  });

  beforeEach(inject([DataMiningClientService],
    (dmService: DataMiningClientService) => {
      dataMiningService = dmService;

      spyOn(dataMiningService, 'getEnhancements$').and.callThrough();
    }));

  it('should be created', inject([EnhancementsService], (service: EnhancementsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load enhancements from data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // WHEN
    service.loadEnhancementsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();
    // WHEN
    service.loadEnhancementsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(dataMiningService.getEnhancements$).toHaveBeenCalledTimes(1);
  }));

});
