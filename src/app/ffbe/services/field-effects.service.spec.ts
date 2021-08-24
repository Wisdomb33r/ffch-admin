import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {DataMiningClientService} from './data-mining-client.service';
import {FieldEffectsService} from './field-effects.service';
import {Skill} from '../model/skill.model';
import {
  FIELD_EFFECTS_TEST_DATA
} from '../model/effects/field-effect.model.spec';
import {FieldEffect} from '../model/effects/field-effect.model';

export class FieldEffectsServiceMock {
  private static INSTANCE: FieldEffectsServiceMock = new FieldEffectsServiceMock();

  public static getInstance() {
    return FieldEffectsServiceMock.INSTANCE;
  }

  public searchForFieldEffectByGumiId(gumiId: number): Skill {
    return null;
  }
}

class DataMiningMock {
  public getFieldEffects$(): Observable<Object> {
    return of(JSON.parse(FIELD_EFFECTS_TEST_DATA));
  }
}

describe('FieldEffectsService', () => {
  let dataMiningService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FieldEffectsService,
        {provide: DataMiningClientService, useClass: DataMiningMock}
      ]
    });
  });

  beforeEach(inject([DataMiningClientService], (service: DataMiningClientService) => {
    dataMiningService = service;
    spyOn(dataMiningService, 'getFieldEffects$').and.callThrough();
  }));

  it('should be created', inject([FieldEffectsService], (service: FieldEffectsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load field effects from data mining', inject([FieldEffectsService], (service: FieldEffectsService) => {
    // WHEN
    service.loadFieldEffectsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([FieldEffectsService], (service: FieldEffectsService) => {
    // GIVEN
    service.loadFieldEffectsFromDataMining();
    // WHEN
    service.loadFieldEffectsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(dataMiningService.getFieldEffects$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct field effect when searched if present in data mining', inject([FieldEffectsService], (service: FieldEffectsService) => {
    // GIVEN
    service.loadFieldEffectsFromDataMining();
    // WHEN
    const fieldEffect: FieldEffect = service.searchForFieldEffectByGumiId(200000027);

    // THEN
    expect(fieldEffect).toBeTruthy();
    expect(fieldEffect.duration).toEqual(4);
    expect(fieldEffect.gumi_id).toBe(200000027);
  }));

  it('should find null when searched if field effect not present', inject([FieldEffectsService], (service: FieldEffectsService) => {
    // GIVEN
    service.loadFieldEffectsFromDataMining();
    // WHEN
    const fieldEffect: FieldEffect = service.searchForFieldEffectByGumiId(125);
    // THEN
    expect(fieldEffect).toBeFalsy();
  }));
});
