import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityElementResistancesEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 10) {
      this.parameterError = true;
    } else {

    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return '';
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
