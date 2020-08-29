import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';
import {Caracteristiques} from '../../../caracteristiques.model';
import {FfbeUtils} from '../../../../utils/ffbe-utils';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';

export class PassiveStatsIncreaseEffect extends SkillEffect {

  protected increasesCarac: Caracteristiques;
  protected critChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {

      this.increasesCarac = new Caracteristiques(
        (parameters[4] ? parameters[4] : 0),
        (parameters[5] ? parameters[5] : 0),
        parameters[0],
        parameters[1],
        parameters[2],
        parameters[3]
      );

      this.critChance = (parameters[6] ? parameters[6] : 0);
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const increasesText = FfbeUtils.replaceLastOccurenceInString(this.wordEffectJoiningIdenticalValues(this.increasesCarac.toNameValuePairArray()), ', ', ' et ');
    let critChanceText = '';
    if (this.critChance > 0) {
      critChanceText = `+${this.critChance}% de coups critiques des attaques normales`;
    }
    if (increasesText && increasesText.length && critChanceText && critChanceText.length) {
      critChanceText = HTML_LINE_RETURN + critChanceText;
    }
    return increasesText + critChanceText;
  }

  protected get effectName(): string {
    return 'PassiveStatsIncreaseEffect';
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue}% ${accumulatedStats.join('/')}`;
  }

  public getBaseIncreasesPercent(): Caracteristiques {
    return this.increasesCarac;
  }
}
