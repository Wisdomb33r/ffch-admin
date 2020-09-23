import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';

export class PassiveElementsResistanceEffect extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet PassiveElementsResistanceEffect inconnu: Mauvaise liste de paramètres';
    }
    const increases: Array<{ name: string, value: number }> = SkillEffect.getElementNameValueTableFromNumberArray(effect[3]);
    return this.wordEffectJoiningIdenticalValues(increases);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux éléments';
    }
    return '+' + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }
}
