import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveMpAbsorbEffect extends SkillEffect {

  private absorb: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.absorb = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `Absorbe ${this.absorb}% des PM utilisés par l'adversaire lors de dégâts magiques encaissés`;
  }

  protected get effectName(): string {
    return 'PassiveMpAbsorbEffect';
  }
}
