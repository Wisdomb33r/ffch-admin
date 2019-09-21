import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveCounterAttackParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet PassiveCounterAttackParser inconnu: Mauvaise liste de paramètres';
    }

    const counterChance = effect[3][0];
    const power = effect[3][1];
    const maxActivationNumber = effect[3][2];
    const damageTypeText = effect[2] === 12 ? 'physiques' : 'magiques';

    return counterChance + '% de chance de contrer les dégâts ' + damageTypeText
      + ' par une attaque normale de puissance ' + power + '% (max ' + maxActivationNumber + ' fois par tour)';
  }
}
