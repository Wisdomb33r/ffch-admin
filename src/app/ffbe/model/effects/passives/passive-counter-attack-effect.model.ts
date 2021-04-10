import {EffectParser} from '../../../mappers/effects/effect-parser';
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

export class PassiveCounterAttackParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet PassiveCounterAttackParser inconnu: Mauvaise liste de paramètres';
    }

    const counterChance = effect[3][0];
    const power = effect[3][1];
    const maxActivationNumber = effect[3][2];
    const damageTypeText = effect[2] === 12 ? 'physiques' : 'magiques';
    const maxActivationNumberText = maxActivationNumber > 0 ? ` (max ${maxActivationNumber} fois par tour)` : '';
    const powerText = power > 0 ? ` de puissance ${power}%` : '';

    return `${counterChance}% de chance de contrer les dégâts ${damageTypeText} par une attaque normale${powerText}${maxActivationNumberText}`;
  }
}
