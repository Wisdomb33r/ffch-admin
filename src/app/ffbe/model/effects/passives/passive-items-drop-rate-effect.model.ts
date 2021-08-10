import {Skill} from '../../skill.model';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveItemsDropRateEffect extends SkillEffect {

  private normalItemsRate: number;
  private rareItemsRate: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      this.normalItemsRate = parameters[0];
      this.rareItemsRate = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const normalItemsText = this.normalItemsRate > 0 ? `+${this.normalItemsRate}% de chance d'obtenir un butin normal` : '';
    const glueText = this.normalItemsRate > 0 && this.rareItemsRate > 0 ? HTML_LINE_RETURN : '';
    const rareItemsText = this.rareItemsRate > 0 ? `+${this.rareItemsRate}% de chance de recevoir un butin rare` : '';
    const text = `${normalItemsText}${glueText}${rareItemsText}`;

    return text.length > 1 ? text : 'UNKNOWN drop rate for items';
  }

  protected get effectName(): string {
    return 'PassiveItemsDropRateEffect';
  }
}
