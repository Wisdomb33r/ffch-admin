import {SkillEffect} from '../../skill-effect.model';
import {Skill} from '../../../skill.model';

export class AbilityDamagePhysicalIncreasedBreakEffect extends SkillEffect {
  protected get effectName(): string {
    return '';
  }

  protected wordEffectImpl(skill: Skill): string {
    return 'AbilityDamagePhysicalIncreasedBreakEffect';
  }

}
