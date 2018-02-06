import {TestBed, inject} from '@angular/core/testing';

import {DataMiningClientService} from './data-mining-client.service';

xdescribe('DataMiningClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataMiningClientService]
    });
  });

  it('should be created', inject([DataMiningClientService], (service: DataMiningClientService) => {
    expect(service).toBeTruthy();
  }));
});
