import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataMiningClientService} from './data-mining-client.service';
import {SKILL_TEST_DATA} from '../model/skill.model.spec';
import {SkillsService} from './skills.service';
import {Competence} from '../model/competence.model';

class DataMiningMock {
  public getSkills$(): Observable<Object> {
    return Observable.of(JSON.parse(SKILL_TEST_DATA));
  }
}

describe('SkillsService', () => {
  let dataMiningService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkillsService,
        {provide: DataMiningClientService, useClass: DataMiningMock}
      ]
    });
  });

  beforeEach(inject([DataMiningClientService], (service: DataMiningClientService) => {
    this.dataMiningService = service;
    spyOn(this.dataMiningService, 'getSkills$').and.callThrough();
  }));

  it('should be created', inject([SkillsService], (service: SkillsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load skills from data mining', inject([SkillsService], (service: SkillsService) => {
    // WHEN
    service.loadSkillsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([SkillsService], (service: SkillsService) => {
    // GIVEN
    service.loadSkillsFromDataMining();
    // WHEN
    service.loadSkillsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(this.dataMiningService.getSkills$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct skill when searched if present in data mining', inject([SkillsService], (service: SkillsService) => {
    // GIVEN
    service.loadSkillsFromDataMining();
    // WHEN
    const competence: Competence = service.searchForSkillByGumiId(10020);
    // THEN
    expect(competence).toBeTruthy();
    expect(competence.nom).toEqual('Soin');
    expect(competence.description).toEqual('Soigne un allié.');
    expect(competence.frames).toEqual('90');
  }));

  it('should find null when searched if skill not present', inject([SkillsService], (service: SkillsService) => {
    // GIVEN
    service.loadSkillsFromDataMining();
    // WHEN
    const competence: Competence = service.searchForSkillByGumiId(90020);
    // THEN
    expect(competence).toBeFalsy();
  }));
});
