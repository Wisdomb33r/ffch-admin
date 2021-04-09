import {EffectParser} from '../../../mappers/effects/effect-parser';
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
    const turns = ` pour ${this.numTurns} tour`;
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

export class AbilityElementResistancesParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10) {
      return 'Effet AbilityElementResistancesParser inconnu: Mauvaise liste de paramètres';
    }
    const increases: Array<{ name: string, value: number }> = SkillEffect.getElementNameValueTableFromNumberArray(effect[3]);

    if (increases.every(element => element.value === 0)) {
      return '';
    }

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);
    const target = this.getTarget(effect[0], effect[1]);
    const turns = ` pour ${effect[3][9]} tour`;
    const pluralForm = (effect[3][9] > 1) ? 's' : '';

    return `${statModifier} ${target}${turns}${pluralForm}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    if (accumulatedStats.length === 8) {
      return `${sign}${currentValue}% de rés. aux éléments`;
    }
    return `${sign}${currentValue}% de rés. ${accumulatedStats.join(', ')}`;
  }
}
