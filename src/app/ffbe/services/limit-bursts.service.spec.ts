import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {LimitBurstsService} from './limit-bursts.service';
import {DataMiningClientService} from './data-mining-client.service';
import {Limite} from '../model/limite.model';

class DataMiningMock {
  public getLimitBursts$(): Observable<Object> {
    return Observable.of(JSON.parse(`
    {
      "100000102": {"name": "Flame Sword","cost": 0,"attack_count": [2],"attack_damage": [[20,80]],"attack_frames": [[3,59]],"effect_frames": [[0]],"move_type": 1,"damage_type": "Physical","element_inflict": ["Fire"],"levels": 5,"min_level": {"cost": 8,"effects": ["Physical fire damage (1.8x, ATK) to one enemy"]},"max_level": {"cost": 8,"effects": ["Physical fire damage (2x, ATK) to one enemy"]},"strings": {"name": ["Flame Sword","火焰劍","불꽃검","Pyrolame","Flammenschwert","Espada ígnea"],"desc": ["Fire damage to one enemy","對1名敵人發動火屬性攻擊","적 1명에게 불속성 피해","Dégâts de feu sur un ennemi","Feuerschaden, ein Ziel","Daño de fuego a un enemigo"]}},
      "100000103": {"name": "Crimson Slash","cost": 0,"attack_count": [2],"attack_damage": [[20,80]],"attack_frames": [[3,59]],"effect_frames": [[0]],"move_type": 1,"damage_type": "Physical","element_inflict": ["Fire"],"levels": 10,"min_level": {"cost": 10,"effects": ["Physical fire damage (2x, ATK) to one enemy"]},"max_level": {"cost": 10,"effects": ["Physical fire damage (2.45x, ATK) to one enemy"]},"strings": {"name": ["Crimson Slash","深紅斬擊","진홍빛 참격","Entaille pourpre","Blutsense","Corte carmesí"],"desc": ["Fire damage to one enemy","對1名敵人發動火屬性攻擊","적 1명에게 불속성 피해","Dégâts de feu sur un ennemi","Feuerschaden, ein Ziel","Daño de fuego a un enemigo"]}}
      }`));
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
