import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesEvokerEffect extends SkillEffect {

  private power: number;
  private repartition;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 10 || parameters[0] !== 0 || parameters[1] !== 0
      || parameters[2] !== 0 || (parameters[3] !== 0 && parameters[3] !== 1) || parameters[4] !== 0
      || parameters[5] !== 0 || parameters[6] !== 0) {
      this.parameterError = true;
    } else {
      const magPower = parameters[7];
      const sprPower = parameters[8];
      this.repartition = parameters[9];
      this.power = Math.round(magPower * this.repartition[0] / 100 + sprPower * this.repartition[1] / 100);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForEvokerDamages();
    skill.esper = true;
    const target = this.wordTarget();
    const repartitionText = `(${this.repartition[0]}% MAG, ${this.repartition[1]}% PSY)`;
    return `${attackType} ${elements} de puissance ${this.power}% ${repartitionText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesEvokerEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
