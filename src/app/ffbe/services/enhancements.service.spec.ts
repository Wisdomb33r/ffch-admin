import {Observable, of} from 'rxjs';
import {ENHANCEMENTS_TEST_DATA} from '../model/enhancement.model.testdata.spec';
import {inject, TestBed} from '@angular/core/testing';
import {DataMiningClientService} from './data-mining-client.service';
import {EnhancementsService} from './enhancements.service';
import {Enhancement} from '../model/enhancement.model';

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

  it('should find the correct enhancements by English name when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancements: Array<Enhancement> = service.searchForEnhancementsByNames('Kingdom\'s Hero', null);
    // THEN
    expect(enhancements).toBeTruthy();
    expect(enhancements.length).toEqual(2);
    expect(enhancements[0].gumi_id).toEqual(228085001);
    expect(enhancements[0].skill_id_old).toEqual(228085);
    expect(enhancements[0].skill_id_new).toEqual(707785);
    expect(enhancements[0].skill_id_base).toEqual(228085);
    expect(enhancements[1].gumi_id).toEqual(228085002);
    expect(enhancements[1].skill_id_old).toEqual(707785);
    expect(enhancements[1].skill_id_new).toEqual(707786);
    expect(enhancements[1].skill_id_base).toEqual(228085);
  }));

  it('should find the correct enhancements by French name when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancements: Array<Enhancement> = service.searchForEnhancementsByNames( null, 'YoRHa N° 2 Type B');
    // THEN
    expect(enhancements).toBeTruthy();
    expect(enhancements.length).toEqual(2);
    expect(enhancements[0].gumi_id).toEqual(230020001);
    expect(enhancements[0].skill_id_old).toEqual(230020);
    expect(enhancements[0].skill_id_new).toEqual(914071);
    expect(enhancements[0].skill_id_base).toEqual(230020);
    expect(enhancements[1].gumi_id).toEqual(230020002);
    expect(enhancements[1].skill_id_old).toEqual(914071);
    expect(enhancements[1].skill_id_new).toEqual(914072);
    expect(enhancements[1].skill_id_base).toEqual(230020);
  }));

  it('should find the correct enhancements by GumiID of base skill when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancements: Array<Enhancement> = service.searchForEnhancementsBySkillGumiId(228085);
    // THEN
    expect(enhancements).toBeTruthy();
    expect(enhancements.length).toEqual(2);
    expect(enhancements[0].gumi_id).toEqual(228085001);
    expect(enhancements[0].skill_id_old).toEqual(228085);
    expect(enhancements[0].skill_id_new).toEqual(707785);
    expect(enhancements[0].skill_id_base).toEqual(228085);
    expect(enhancements[1].gumi_id).toEqual(228085002);
    expect(enhancements[1].skill_id_old).toEqual(707785);
    expect(enhancements[1].skill_id_new).toEqual(707786);
    expect(enhancements[1].skill_id_base).toEqual(228085);
  }));

  it('should find the correct enhancements by Character GumiID when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancements: Array<Enhancement> = service.searchForEnhancementsByCharacterGumiId( 310000105);
    // THEN
    expect(enhancements).toBeTruthy();
    expect(enhancements.length).toEqual(2);
    expect(enhancements[0].gumi_id).toEqual(230020001);
    expect(enhancements[0].skill_id_old).toEqual(230020);
    expect(enhancements[0].skill_id_new).toEqual(914071);
    expect(enhancements[0].skill_id_base).toEqual(230020);
    expect(enhancements[1].gumi_id).toEqual(230020002);
    expect(enhancements[1].skill_id_old).toEqual(914071);
    expect(enhancements[1].skill_id_new).toEqual(914072);
    expect(enhancements[1].skill_id_base).toEqual(230020);
  }));

});
