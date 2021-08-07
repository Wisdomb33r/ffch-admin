import {Skill} from '../../../skill.model';
import {AbstractSkillOrMagicMultipleActivationEffect} from '../../abstract-skill-or-magic-multiple-activation-effect.model';

export class PassiveSkillOrMagicMultipleActivationEffectModel extends AbstractSkillOrMagicMultipleActivationEffect {

  protected wordEffectImpl(skill: Skill): string {
    if (this.isWordingAsMultiskillLink(skill)) {
      return this.wordEffectForMultiskillLink();
    } else {
      return this.wordEffectForEffectiveMultiskill();
    }
  }

  protected isWordingAsMultiskillLink(skill: Skill): boolean {
    return skill.effects_raw.length > 1 || skill.isActivatedByPassiveSkill;
  }

  protected get effectName(): string {
    return 'PassiveSkillOrMagicMultipleActivationEffectModel';
  }
}
