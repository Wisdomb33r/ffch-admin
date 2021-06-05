import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveTargetChanceChangesEffect extends SkillEffect {

  private procChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.procChance = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const sign = (this.effectId === 24 ? '+' : '-');

    return `${sign}${this.procChance}% de chance d'être ciblé`;
  }

  protected get effectName(): string {
    return 'PassiveTargetChanceChangesEffect';
  }
}

export class PassiveTargetChanceChangesParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveTargetChanceChangesParser inconnu: Mauvaise liste de paramètres';
    }

    const sign = (effect[2] === 24 ? '+' : '-');

    return `${sign}${effect[3][0]}% de chance d'être ciblé`;
  }
}
