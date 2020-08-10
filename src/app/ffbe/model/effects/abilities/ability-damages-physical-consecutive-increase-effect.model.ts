import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';

export class AbilityDamagesPhysicalConsecutiveIncreaseEffect extends SkillEffect {

  private basePower: number;
  private increment: number;
  private nbIncrements: number;
  private power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 7 || parameters[0] !== 1 || parameters[1] !== 0 || parameters[2] !== 0) {
      this.parameterError = true;
    } else {
      this.basePower = Math.round(parameters[3] + parameters[4]);
      this.increment = parameters[5];
      this.nbIncrements = parameters[6] - 1;
      this.power = Math.round(this.basePower + this.increment * this.nbIncrements);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    skill.physique = true;
    const target = this.wordTarget();
    const incrementsText = `(+${this.increment}% par utilisation successive, ${this.nbIncrements}x, max ${this.power}%)`;
    return `${attackType} ${elements} de puissance ${this.basePower}% ${incrementsText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesPhysicalConsecutiveIncreaseEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
