import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveEvasionPhysicalEffect extends SkillEffect {

  private evadeChance: number;
  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.evadeChance = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `+${this.evadeChance}% d'esquive physique`;
  }

  protected get effectName(): string {
    return 'PassiveEvasionPhysicalEffect';
  }
}

export class PassiveEvasionPhysicalParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveEvasionPhysicalParser inconnu: Mauvaise liste de paramètres';
    }

    return '+' + effect[3][0] + '% d\'esquive physique';
  }
}
