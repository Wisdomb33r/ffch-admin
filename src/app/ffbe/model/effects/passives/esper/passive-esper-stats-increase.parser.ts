import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {FFBE_ESPERS} from '../../../../ffbe.constants';
import {SkillEffect} from '../../skill-effect.model';

export class PassiveEsperStatsIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet PassiveEsperStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const esperId = effect[3][6];
    const esper = FFBE_ESPERS.find(e => e.gumiId === esperId);

    const increases = [
      {name: 'PV', value: effect[3][4]},
      {name: 'PM', value: effect[3][5]},
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    return this.wordEffectJoiningIdenticalValues(increases) + ' obtenues par la chimère'
      + (esperId > 0 ? ' ' + SkillEffect.getEsperLink(esper) : '');
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 6) {
      return '+' + currentValue + '% aux caractéristiques';
    }
    return '+' + currentValue + '% ' + accumulatedStats.join('/');
  }
}
