import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';

export class AbilityDamageMagicMpIncreasedEffect extends SkillEffect {

  private basePower: number;
  private mpPowerIncrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      if (parameters[0] !== 4 || parameters[2] !== 2) {
        this.parameterWarning = true;
      }
      this.mpPowerIncrease = parameters[1];
      this.basePower = parameters[3];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForMagicalDamages();
    skill.magique = true;
    const target = this.wordTarget();
    return `${attackType} ${elements} de puissance ${this.basePower}% (+${this.mpPowerIncrease}% par PM consommé) ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamageMagicMpIncreasedEffect';
  }

  public getDamagesPower(): number {
    return this.basePower;
  }
}
