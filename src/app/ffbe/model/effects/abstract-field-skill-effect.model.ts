import {SkillEffect} from './skill-effect.model';
import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {TargetPrepositionEnum} from './target-preposition.enum';

export abstract class AbstractFieldSkillEffect extends SkillEffect {
  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected duration: number) {
    super(targetNumber, targetType, effectId);
  }

  protected wordTarget(preposition: TargetPrepositionEnum = TargetPrepositionEnum.A): string {

    // TODO: Handle other cases!
    if (this.targetNumber === TargetNumberEnum.Self && this.targetType === TargetTypeEnum.Caster) {
      return SkillEffect.getTargetAlliesAndEnemiesText(preposition);
    } else if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Enemy) {
      return SkillEffect.getTargetEnemiesText(preposition);
    }

    return 'UNKNOWN target';
  }

}
