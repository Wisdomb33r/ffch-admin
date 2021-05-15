import {Skill} from '../../../skill.model';
import {FFBE_ESPERS} from '../../../../ffbe.constants';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {NameValuePairArray} from '../../../name-value-pair-array.model';

export class PassiveEsperStatsIncreaseEffect extends SkillEffect {

  private esperId: number;
  private increases: NameValuePairArray;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6) {
      this.parameterError = true;
    } else {
      this.esperId = parameters[6];

      this.increases = [
        {name: 'PV', value: parameters[4]},
        {name: 'PM', value: parameters[5]},
        {name: 'ATT', value: parameters[0]},
        {name: 'DÉF', value: parameters[1]},
        {name: 'MAG', value: parameters[2]},
        {name: 'PSY', value: parameters[3]},
      ];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const esper = FFBE_ESPERS.find(e => e.gumiId === this.esperId);
    const increaseText = this.wordEffectJoiningIdenticalValues(this.increases);
    const esperText = this.esperId > 0 ? ` ${SkillEffect.getEsperLink(esper)}` : '';
    return `${increaseText} obtenues par la chimère${esperText}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 6) {
      return `+${currentValue}% aux caractéristiques`;
    }
    return `+${currentValue}% ${accumulatedStats.join('/')}`;
  }

  protected get effectName(): string {
    return 'PassiveEsperStatsIncreaseEffect';
  }
}
