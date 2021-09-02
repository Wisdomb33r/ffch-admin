import {SkillEffect} from './skill-effect.model';
import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {TargetPrepositionEnum} from './target-preposition.enum';

export abstract class AbstractFieldSkillEffect extends SkillEffect {

  protected convertedTarget: [TargetNumberEnum, TargetTypeEnum];

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected duration: number) {
    super(targetNumber, targetType, effectId);
    this.convertedTarget = this.convertTarget();
  }

  protected wordTarget(preposition: TargetPrepositionEnum = TargetPrepositionEnum.A) {
    return this.wordSpecificTarget(preposition, this.convertedTarget[0], this.convertedTarget[1]);
  }

  protected convertTarget(): [TargetNumberEnum, TargetTypeEnum] {
    // TODO: Handle other cases!
    if (this.targetNumber === TargetNumberEnum.Self && this.targetType === TargetTypeEnum.Caster) {
      return [TargetNumberEnum.Multiple, TargetTypeEnum.AllyAndEnemy];
    } else if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Enemy) {
      return [TargetNumberEnum.Multiple, TargetTypeEnum.Enemy];
    }

    return [0, 0];
  }

}
