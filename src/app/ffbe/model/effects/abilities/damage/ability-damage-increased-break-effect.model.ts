import {SkillEffect} from '../../skill-effect.model';
import {Skill} from '../../../skill.model';

export class AbilityDamageIncreasedBreakEffect extends SkillEffect {
  protected get effectName(): string {
    return '';
  }

  protected wordEffectImpl(skill: Skill): string {
    return 'AbilityDamageIncreasedBreakEffect';
  }

}
