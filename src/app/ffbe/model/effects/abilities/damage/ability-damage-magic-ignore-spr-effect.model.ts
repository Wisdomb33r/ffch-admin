import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilityDamageMagicIgnoreSprEffect extends SkillEffect {

  private basePower: number;
  private power: number;
  private ignoreSpr: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[0] !== 0 || parameters[1] !== 0) {
      this.parameterError = true;
    } else {
      this.basePower = parameters[2];
      this.ignoreSpr = Math.abs(parameters[3]);
      this.power = Math.round(this.basePower * 100 / (100 - this.ignoreSpr));
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForMagicalDamages();
    skill.magique = true;
    const target = this.wordTarget();
    return `${attackType} ${elements} de puissance ${this.basePower}% (ignore ${this.ignoreSpr}% PSY, ${this.power}% total) ${target} (ignore les reflets)`;
  }

  protected get effectName(): string {
    return 'AbilityDamageMagicIgnoreSprEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
