import {AbstractSkillOrMagicMultipleActivationEffect} from '../../abstract-skill-or-magic-multiple-activation-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';
import {TargetPrepositionEnum} from '../../target-preposition.enum';

export class AbilitySkillOrMagicMultipleActivationEffect extends AbstractSkillOrMagicMultipleActivationEffect {

  protected nbTurns: number;
  protected nbUses: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId, parameters);
    if (parameters.length < 9) {
      this.parameterError = true;
    } else {
      this.nbTurns = parameters[6];
      this.nbUses = parameters[8];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (this.isWordingAsMultiskillLink(skill)) {
      const targetText = this.wordTarget(TargetPrepositionEnum.A);
      const nbUsesText = this.nbTurns > 1 && this.nbUses > 0 && this.nbUses < 999 ? ` pour ${this.nbUses} utilisation${this.nbUses > 1 ? 's' : ''}` : '';
      const nbTurns = skill.isActivatedByPassiveSkill || this.targetType !== TargetTypeEnum.Caster ? this.nbTurns : this.nbTurns - 1;
      return `${this.wordEffectForMultiskillLink()} ${targetText}${nbUsesText} ${this.wordForTurns(nbTurns)}`;
    } else {
      return this.wordEffectForEffectiveMultiskill();
    }
  }

  protected isWordingAsMultiskillLink(skill: Skill): boolean {
    return skill.gumi_id !== this.multiskillId;
  }

  protected get effectName(): string {
    return 'AbilitySkillOrMagicMultipleActivationEffect';
  }
}
