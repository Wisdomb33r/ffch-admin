import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Caracteristiques} from '../../../caracteristiques.model';

export class PassiveEquipmentStatsDoublehandGlexIncreaseEffect extends SkillEffect {

  private readonly isTrueDoublehand: boolean;
  private readonly increasesCarac: Caracteristiques;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6) {
      this.parameterError = true;
    } else {
      this.increasesCarac = new Caracteristiques(
        parameters[0],
        parameters[1],
        parameters[2],
        parameters[4],
        parameters[3],
        parameters[5]
      )
      this.isTrueDoublehand = (parameters[6] && parameters[6] === 1);
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return this.wordEffectJoiningIdenticalValues(this.increasesCarac.toNameValuePairArray(), HTML_LINE_RETURN);
  }

  protected get effectName(): string {
    return 'PassiveEquipmentStatsDoublehandGlexIncreaseEffect';
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    let mode = '';
    if (this.isTrueDoublehand) {
      mode = 'si l\'unité porte une seule arme (TDH)';
    } else {
      mode = 'si l\'unité porte une seule arme à une main (DH)';
    }
    return `+${currentValue}% ${accumulatedStats.join('/')} de l\'équipement ${mode}`;
  }
}
