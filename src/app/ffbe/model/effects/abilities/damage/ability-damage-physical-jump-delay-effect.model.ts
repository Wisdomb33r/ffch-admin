import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilityDamagePhysicalJumpDelayEffect extends SkillEffect {

  private power: number;
  private turnDelay: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      if (parameters.length !== 5 || targetNumber !== 1 || targetType !== 1
        || parameters[0] !== 0 || parameters[1] !== 0 || parameters[2] !== parameters[3]) {
        this.parameterWarning = true;
      }
      this.power = Math.round(parameters[4]);
      this.turnDelay = parameters[2];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    const activationText = `à activation ${this.effectId === 134 ? 'manuelle' : 'automatique'}`;
    const turnDelayText = `avec délai de ${this.turnDelay} tour${this.turnDelay > 1 ? 's' : ''}`;
    return `${attackType} ${elements} sautés ${activationText} de puissance ${this.power}% ${turnDelayText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalJumpDelayEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
