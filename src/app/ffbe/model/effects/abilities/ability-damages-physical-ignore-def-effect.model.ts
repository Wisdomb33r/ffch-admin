import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesPhysicalIgnoreDefEffect extends SkillEffect {

  private basePower: number;
  private power: number;
  private ignoreDef: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[0] !== 0 || parameters[1] !== 0) {
      this.parameterError = true;
    } else {
      this.basePower = parameters[2];
      this.ignoreDef = Math.abs(parameters[3]);
      this.power = Math.round(this.basePower * 100 / (100 - this.ignoreDef));
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    skill.physique = true;
    const target = this.wordTarget();
    return `${attackType} ${elements} de puissance ${this.basePower}% (ignore ${this.ignoreDef}% DÉF, ${this.power}% total) ${target} (ignore les couvertures)`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesPhysicalIgnoreDefEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
