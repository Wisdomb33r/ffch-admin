import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveExplorationStepRegenEffect extends SkillEffect {

  private hpRegen: number;
  private mpRegen: number;
  private steps: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      this.hpRegen = parameters[1];
      this.mpRegen = parameters[3];
      this.steps = parameters[4];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const hpText = this.hpRegen > 0 ?  `+${this.hpRegen} PV` : '';
    const linkText = this.hpRegen > 0 && this.mpRegen > 0 ? ' et ' : '';
    const mpText = this.mpRegen > 0 ? `+${this.mpRegen} PM` : '';
    const stepsText = `${this.steps === 1 ? ` chaque` : ` tous les ${this.steps}`} pas en exploration`;

    return `${hpText}${linkText}${mpText}${stepsText}`;
  }

  protected get effectName(): string {
    return 'PassiveExplorationStepRegenEffect';
  }
}
