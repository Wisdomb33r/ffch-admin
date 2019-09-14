import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FFBE_ESPERS} from '../../../ffbe.constants';

export class PassiveEsperSummonDamageIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveEsperSummonDamageIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const esperId = effect[3][1];
    const esper = FFBE_ESPERS.find(e => e.gumiId === esperId);

    return '+' + effect[3][0] + '% de dégâts lors de l\'invocation de ' +
      (esper ? this.getEsperLink(esper) : 'UNKNOWN esper');
  }
}
