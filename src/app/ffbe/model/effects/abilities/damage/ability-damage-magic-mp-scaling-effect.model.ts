import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';

export class AbilityDamageMagicMpScalingEffect extends SkillEffect {

  private mpMultiplicator: number;
  private maxMp: number;
  private basePower: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      this.mpMultiplicator = parameters[0];
      this.maxMp = parameters[1];
      this.basePower = parameters[2];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForMagicalDamages();
    const multiplicator = this.mpMultiplicator / 100;
    const scalingLimit = this.maxMp / multiplicator;
    skill.magique = true;
    const target = this.wordTarget();
    return `${attackType} ${elements} calculés sur les PM (multipliés par ${multiplicator}x, max ${scalingLimit}) de puissance ${this.basePower}% ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamageMagicMpScalingEffect';
  }

  public getDamagesPower(): number {
    return this.basePower;
  }
}
