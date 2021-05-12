import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveLbPerTurnEffect extends SkillEffect {

  private rate: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.rate = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (this.rate === 100) {
      return '+1 cristal de limite chaque tour';
    }
    return `+${this.rate / 100} cristaux de limite chaque tour`;
  }

  protected get effectName(): string {
    return 'PassiveLbPerTurnEffect';
  }
}

export class PassiveLbPerTurnParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveLbPerTurnParser inconnu: Mauvaise liste de paramètres';
    }

    if (effect[3][0] === 100) {
      return '+1 cristal de limite chaque tour';
    }
    return '+' + (effect[3][0] / 100) + ' cristaux de limite chaque tour';
  }
}
