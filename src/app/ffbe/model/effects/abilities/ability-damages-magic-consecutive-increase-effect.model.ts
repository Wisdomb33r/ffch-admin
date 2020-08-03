import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesMagicConsecutiveIncreaseEffect extends SkillEffect {

  private basePower: number;
  private increment: number;
  private nbIncrements: number;
  private power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6 || parameters[0] !== 0 || parameters[1] !== 0) {
      this.parameterError = true;
    } else {
      this.basePower = Math.round(parameters[2] + parameters[3]);
      this.increment = parameters[4];
      this.nbIncrements = parameters[5] - 1;
      this.power = Math.round(this.basePower + this.increment * this.nbIncrements);
    }
  }


  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForMagicalDamages();
    skill.magique = true;
    const target = this.wordTarget();
    const incrementsText = `(+${this.increment}% par utilisation successive, ${this.nbIncrements}x, max ${this.power}%)`;
    return `${attackType} ${elements} de puissance ${this.basePower}% ${incrementsText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesMagicConsecutiveIncreaseEffect';
  }
}
