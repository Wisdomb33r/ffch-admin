import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesHybridEffect extends SkillEffect {

  private asymetricalAtkMagValuesError = false;
  private power: number;
  private accuracy: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 10 || parameters[0] !== 0 || parameters[1] !== 0
      || parameters[2] !== 0 || parameters[3] !== 0 || parameters[4] !== 0 || parameters[5] !== 0 || parameters[6] !== 0) {
      this.parameterError = true;
    } else {
      this.accuracy = parameters[7];
      const atkPower = parameters[8];
      const magPower = parameters[9];
      if (atkPower !== magPower) {
        this.asymetricalAtkMagValuesError = true;
      }
      this.power = Math.round((atkPower + magPower) / 2);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    if (this.asymetricalAtkMagValuesError) {
      return `Effet ${this.effectName}: Dégâts hybrides asymétriques non prévus`;
    }
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForHybridDamages();
    skill.hybride = true;
    const accuracyText = this.accuracy > 0 ? ` (+${this.accuracy}% précision)` : '';
    const target = this.wordTarget();
    return `${attackType} ${elements} de puissance ${this.power}% ${target}${accuracyText}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesHybridEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
