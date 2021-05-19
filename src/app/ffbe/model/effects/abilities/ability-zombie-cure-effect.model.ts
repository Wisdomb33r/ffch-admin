import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';

export class AbilityZombieCureEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters)) {
      this.parameterError = true;
    }
  }

  protected wordEffectImpl(skill: Skill) {
    return `Soigne Zombie ${this.wordTarget(TargetPrepositionEnum.A)}`;
  }

  protected get effectName(): string {
    return 'AbilityZombieCureEffect';
  }
}
