import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveDeceivesDeathParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4) {
      return 'Effet PassiveDeceivesDeathParser inconnu: Mauvaise liste de paramètres';
    }

    const hpThreshold = effect[3][0];
    const procChance = effect[3][1];
    const hpLock = effect[3][2];
    const maxProc = effect[3][3];
    return procChance + '% de chance d\'éviter la mort avec ' + (hpLock > 0 ? hpLock + '% PV' : '1 PV') + ' lors d\'une attaque fatale si les PV étaient supérieurs à ' + hpThreshold + '% (max ' + maxProc + ' fois)';
  }
}
