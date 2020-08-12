import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilityDamagePhysicalTurnDelayEffect extends SkillEffect {

  private power: number;
  private turnDelay: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[5]);
      this.turnDelay = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    const turnDelayText = `avec délai de ${this.turnDelay} tour${this.turnDelay > 1 ? 's' : ''}`;
    return `${attackType} ${elements} de puissance ${this.power}% ${turnDelayText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalTurnDelayEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
