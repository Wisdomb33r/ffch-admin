import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class PassiveEquipmentStatsDoublehandIncreaseEffect extends SkillEffect {

  private readonly caracType: number;
  private readonly doublehandType: number;
  private readonly bonusCarac: number;
  private readonly bonusPrecision: number;


  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);

    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      this.caracType = effectId;
      this.bonusCarac = parameters[0];
      this.bonusPrecision = parameters[1];
      this.doublehandType = parameters[2];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    let stat = 'UNKNOWN';
    if (this.caracType === 13) {
      stat = 'l\'ATT';
    }
    if (this.caracType === 70) {
      stat = 'la MAG';
    }

    let mode = '';
    if (this.doublehandType === 0) {
      mode = 'si l\'unité porte une seule arme à une main (DH)';
    } else if (this.doublehandType === 2) {
      mode = 'si l\'unité porte une seule arme (TDH)';
    } else {
      mode = 'si l\'unité porte UNKNOWN PARAMETER';
    }

    let precision = '';
    if (this.bonusPrecision > 0) {
      precision = `${HTML_LINE_RETURN}+${this.bonusPrecision}% précision ${mode}`;
    }

    return `+${this.bonusCarac}% à ${stat} de l\'équipement ${mode}${precision}`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentStatsDoublehandIncreaseEffect';
  }
}
