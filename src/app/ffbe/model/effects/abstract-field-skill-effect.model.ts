import {SkillEffect} from './skill-effect.model';
import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {TargetPrepositionEnum} from './target-preposition.enum';
import {Skill} from '../skill.model';

export abstract class AbstractFieldSkillEffect extends SkillEffect {
  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected duration: number) {
    super(targetNumber, targetType, effectId);
  }


  // TODO: Refactor this somewhere else!
  protected abstract wordEffectImpl(skill: Skill): string;

  protected abstract get effectName(): string;

  public wordEffect(skill: Skill): string {
    if (this.parameterError) {
      return this.wordBadParameterText();
    } else {
      return this.wordEffectImpl(skill);
    }
  }

  public wordBadParameterText(): string {
    return `Effet ${this.effectName} inconnu: Mauvaise liste de paramètres`;
  }


  protected wordTarget(preposition: TargetPrepositionEnum = TargetPrepositionEnum.A): string {

    // TODO: Handle other cases!
    if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Enemy) {
      return SkillEffect.getTargetEnemiesText(preposition);
    }

    return 'UNKNOWN target';
  }

}
