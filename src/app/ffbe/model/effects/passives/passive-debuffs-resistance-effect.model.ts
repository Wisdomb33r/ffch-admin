import {Skill} from '../../skill.model';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {NameValuePairArray} from '../../name-value-pair-array.model';

export class PassiveDebuffsResistanceEffect extends SkillEffect {

  private statsResists: NameValuePairArray;
  private stopResist: number;
  private charmResist: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.statsResists = [
        {name: 'ATT', value: parameters[0]},
        {name: 'DÉF', value: parameters[1]},
        {name: 'MAG', value: parameters[2]},
        {name: 'PSY', value: parameters[3]},
      ];

      this.stopResist = parameters[4] > 0 ? parameters[4] : 0;
      this.charmResist = parameters[5] > 0 ? parameters[5] : 0;
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    let text = this.wordEffectJoiningIdenticalValues(this.statsResists);
    if (this.stopResist > 0) {
      text += (text && text.length ? HTML_LINE_RETURN : '') + `+${this.stopResist}% de rés. à Stop`;
      if (this.charmResist > 0 && this.stopResist === this.charmResist) {
        text += ' et Charme';
      }
    }
    if (this.charmResist > 0 && this.stopResist !== this.charmResist) {
      text += (text && text.length ? HTML_LINE_RETURN : '') + `+${this.charmResist}% de rés. à Charme`;
    }
    return text;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue}% de rés. aux baisses de ${accumulatedStats.join('/')}`;
  }

  protected get effectName(): string {
    return 'PassiveDebuffsResistanceEffect';
  }
}
