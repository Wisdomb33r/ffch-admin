import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';

export class AbilityKillerDamageIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10 ||
      !Array.isArray(effect[3][0]) || effect[3][0].length < 2) {
      return 'Effet AbilityKillerDamageIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);
    const damageType = this.getDamageType(effect[2]);

    const monsterTypeGumiId = effect[3][0][0];
    const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === monsterTypeGumiId);
    const monsterName = monsterType ? monsterType.pluralName : ' UNKNOWN';
    const increase = effect[3][0][1];

    const numTurns = effect[3][8];
    const pluralForm = effect[3][8] > 1 ? 's' : '';

    return '+' + increase + '% de dégâts ' + damageType + ' contre les ' + monsterName + target + ' pour ' + numTurns + ' tour' + pluralForm;
  }

  private getTarget(effectId1: number, effectId2: number) {
    let target = ' à UNKNOWN';

    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3) {
      target = ' au lanceur';
    } else if (effectId1 === 1 && effectId2 === 2) {
      target = ' à un allié';
    } else if (effectId1 === 2 && effectId2 === 2) {
      target = ' aux alliés';
    }

    return target;
  }

  private getDamageType(effectId: number): string {
    let damageType = ' UNKNOWN';

    if (effectId === 92) {
      damageType = 'physiques';
    } else if (effectId === 93) {
      damageType = 'magiques';
    }

    return damageType;
  }
}
