import {inject, TestBed} from '@angular/core/testing';
import {EnhancementsService} from './enhancements.service';
import {DataMiningClientService} from './data-mining-client.service';
import {Observable, of} from 'rxjs/index';

class DataMiningMock {
  public getEnhancements$(): Observable<Object> {
    return of(undefined);
  }
}

describe('EnhancementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EnhancementsService,
        {provide: DataMiningClientService, useClass: DataMiningMock},
      ]
    });
  });

  it('should be created', inject([EnhancementsService], (service: EnhancementsService) => {
    expect(service).toBeTruthy();
  }));
});
