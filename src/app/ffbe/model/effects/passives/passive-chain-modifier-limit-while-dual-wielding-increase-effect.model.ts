import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';

export class PassiveChainModifierLimitWhileDualWieldingIncreaseEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    }
  }

  protected wordEffectImpl(skill: Skill) {
    return `+200% au coefficient multiplicateur maximal de la chaîne de combo si l'unité porte deux armes`;
  }

  protected get effectName(): string {
    return 'PassiveChainModifierLimitWhileDualWieldingIncreaseEffect';
  }

}
