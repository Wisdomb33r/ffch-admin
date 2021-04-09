import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {NameValuePair} from '../../name-value-pair-array.model';

export class AbilityElementResistancesEffect extends SkillEffect {

  private increases: Array<NameValuePair>;
  private numTurns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 10) {
      this.parameterError = true;
    } else {
      this.increases = SkillEffect.getElementNameValueTableFromNumberArray(parameters);
      this.numTurns = parameters[9];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (this.increases.every(element => element.value === 0)) {
      return '';
    }

    const statModifier = this.wordEffectJoiningIdenticalValues(this.increases);
    const target = this.wordTarget();
    const numTurnsText = this.numTurns > 0 ? this.numTurns : 'ce';
    const turns = ` pour ${numTurnsText} tour`;
    const pluralForm = (this.numTurns > 1) ? 's' : '';

    return `${statModifier} ${target}${turns}${pluralForm}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    if (accumulatedStats.length === 8) {
      return `${sign}${currentValue}% de rés. aux éléments`;
    }
    return `${sign}${currentValue}% de rés. ${accumulatedStats.join(', ')}`;
  }

  protected get effectName(): string {
    return 'AbilityElementResistancesEffect';
  }
}
