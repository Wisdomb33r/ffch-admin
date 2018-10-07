import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {DataMiningClientService} from './data-mining-client.service';
import {HttpClient} from '@angular/common/http';

class HttpClientMock {
  public get(url: string): Observable<Object> {
    return of(null);
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

  it('should delegate to HttpClient for accessing characters', inject([DataMiningClientService], (service: DataMiningClientService) => {
    // WHEN
    service.getCharacters$();
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
  }));

  it('should delegate to HttpClient for accessing limit bursts', inject([DataMiningClientService], (service: DataMiningClientService) => {
    // WHEN
    service.getLimitBursts$();
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
  }));

  it('should delegate to HttpClient for accessing skills', inject([DataMiningClientService], (service: DataMiningClientService) => {
    // WHEN
    service.getSkills$();
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
  }));

  it('should delegate to HttpClient for accessing enhancements', inject([DataMiningClientService], (service: DataMiningClientService) => {
    // WHEN
    service.getEnhancements$();
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
  }));
});
