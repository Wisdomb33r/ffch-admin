import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataMiningClientService} from './data-mining-client.service';
import {HttpClient} from '@angular/common/http';

class HttpClientMock {
  public get(url: string): Observable<Object> {
    return Observable.of(null);
  }
}

describe('DataMiningClientService', () => {
  let httpClient: HttpClient = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataMiningClientService,
        {provide: HttpClient, useClass: HttpClientMock}]
    });
  });

  beforeEach(inject([HttpClient], (client: HttpClient) => {
    httpClient = client;
    spyOn(httpClient, 'get').and.callThrough();
  }));

  it('should be created', inject([DataMiningClientService], (service: DataMiningClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should delegate to HttpClient', inject([DataMiningClientService], (service: DataMiningClientService) => {
    // WHEN
    service.getCharacters$();
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
  }));
});
