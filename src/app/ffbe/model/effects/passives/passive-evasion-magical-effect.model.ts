import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveEvasionMagicalEffect extends SkillEffect {

  private extraParameter: number;
  private evadeChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      if (this.parameters[0] !== -1) {
        this.parameterWarning = true;
      }
      this.extraParameter = parameters[0];
      this.evadeChance = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const noCumulativeText: string = this.extraParameter === -1 ? ' (effet passif non cumulable)' : ' (UNKNOWN parameter)';

    return `+${this.evadeChance}% d'esquive magique${noCumulativeText}`;
  }

  protected get effectName(): string {
    return 'PassiveEvasionMagicalEffect';
  }
}

export class PassiveEvasionMagicalParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveEvasionMagicalParser inconnu: Mauvaise liste de paramètres';
    }

    const noCumulativeText: string = effect[3][0] === -1 ? ' (effet passif non cumulable)' : ' (UNKNOWN parameter)';

    return '+' + effect[3][1] + '% d\'esquive magique' + noCumulativeText;
  }
}
