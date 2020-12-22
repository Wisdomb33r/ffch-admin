import {Skill} from '../../skill.model';
import {FFBE_ESPERS} from '../../../ffbe.constants';
import {FfbeUtils} from '../../../utils/ffbe-utils';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';

export class PassiveEsperSummonDamageIncreaseEffect extends SkillEffect {

  private increase: number;
  private esperIds: number | Array<number>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      this.increase = parameters[0];
      this.esperIds = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    let esperText: string;
    if (Array.isArray(this.esperIds)) {
      if (this.esperIds.length === 19) {
        esperText = `d'une chimère`;
      } else {
        const espers = this.esperIds.map(esperId => FFBE_ESPERS.find(e => e.gumiId === esperId))
          .filter(esper => !FfbeUtils.isNullOrUndefined(esper));
        esperText = espers.map(esper => SkillEffect.getEsperLink(esper)).join(', ');
        esperText = `de ${FfbeUtils.replaceLastOccurenceInString(esperText, ', ', ' et ')}`;
      }
    } else {
      const esperId = this.esperIds;
      const esper = FFBE_ESPERS.find(e => e.gumiId === esperId);
      const esperLink = esper ? SkillEffect.getEsperLink(esper) : 'UNKNOWN esper';
      esperText = esperId === 0 ? `d'une chimère${HTML_LINE_RETURN}+${this.increase}% aux dégâts des invocateurs` : `de ${esperLink}`;
    }
    return `+${this.increase}% de dégâts lors de l\'invocation ${esperText}`;
  }

  protected get effectName(): string {
    return 'PassiveEsperSummonDamageIncreaseParser';
  }
}
