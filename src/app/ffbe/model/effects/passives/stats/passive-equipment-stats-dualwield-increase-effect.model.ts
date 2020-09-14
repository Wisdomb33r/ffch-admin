import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {EffectParser} from '../../../../mappers/effects/effect-parser';

export class PassiveEquipmentStatsDualwieldIncreaseEffect extends SkillEffect {

  private readonly statNumber: number;
  private readonly increase: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      this.statNumber = parameters[0];
      this.increase = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const statName = EffectParser.getStatNameFromId(this.statNumber);
    return `+${this.increase}% à ${(this.statNumber === 1 ? 'l\'' : 'la ')}${statName} de l\'équipement si l\'unité porte deux armes (TDW)`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentStatsDualwieldIncreaseEffect';
  }
}
