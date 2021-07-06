import {SkillEffect} from '../skill-effect.model';
import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';

export class AbilityMoraleJaugeEffect extends SkillEffect {

  private moraleIncrease: number;
  private moraleIncreasePerAlly: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      if (parameters.length !== 7 || parameters[2] !== 0 || parameters[3] !== 0 || parameters[4] !== 0 ||
        (parameters[5] !== 0 && parameters[5] !== 1 && parameters[5] !== 2) || parameters[6] !== 0 ||
        targetNumber !== 0 || targetType !== 3) {
        this.parameterWarning = true;
      }
      this.moraleIncrease = parameters[0] / 100;
      if (parameters.length > 1) {
        this.moraleIncreasePerAlly = parameters[1] ? parameters[1] / 100 : 0;
      }
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const moraleSign = this.moraleIncrease >= 0 ? '+' : '';
    const moraleText = `${moraleSign}${this.moraleIncrease}% au moral des alliés`;
    const moralePerAllySign = this.moraleIncreasePerAlly >= 0 ? '+' : '';
    const moralePerAllyText = `${moralePerAllySign}${this.moraleIncreasePerAlly}% de moral par allié actif`;
    if (this.moraleIncrease !== 0 && this.moraleIncreasePerAlly !== 0) {
      return `${moraleText}${HTML_LINE_RETURN}${moralePerAllyText}`;
    } else if (this.moraleIncreasePerAlly !== 0) {
      return `${moralePerAllyText}`;
    } else {
      return `${moraleText}`;
    }
  }

  protected get effectName(): string {
    return 'AbilityMoraleJaugeEffect';
  }
}
