import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveCounterAttackEffect extends SkillEffect {

  private counterChance: number;
  private power: number;
  private maxActivationNumber: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      this.counterChance = parameters[0];
      this.power = parameters[1];
      this.maxActivationNumber = parameters[2];

    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const damageTypeText = this.effectId === 12 ? 'physiques' : 'magiques';
    const maxActivationNumberText = this.maxActivationNumber > 0 ? ` (max ${this.maxActivationNumber} fois par tour)` : '';
    const powerText = this.power > 0 ? ` de puissance ${this.power}%` : '';

    return `${this.counterChance}% de chance de contrer les dégâts ${damageTypeText} par une attaque normale${powerText}${maxActivationNumberText}`;
  }

  protected get effectName(): string {
    return 'PassiveCounterAttackEffect';
  }
}
