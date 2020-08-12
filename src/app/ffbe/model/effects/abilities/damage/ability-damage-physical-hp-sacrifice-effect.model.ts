import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class AbilityDamagePhysicalHpSacrificeEffect extends SkillEffect {

  private power: number;
  private hpSacrifice: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8 || parameters[0] !== 0 || parameters[1] !== 0
      || parameters[2] !== 0 || parameters[3] !== 0 || parameters[4] !== 0 || parameters[5] !== 0) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[6]);
      this.hpSacrifice = parameters[7];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    return `${attackType} ${elements} de puissance ${this.power}% avec sacrifice de ${this.hpSacrifice}% des PV du lanceur ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalHpSacrificeEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
