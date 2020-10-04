import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillsService} from '../../../services/skills.service';
import {SkillMapper} from '../../../mappers/skill-mapper';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {FfbeUtils} from '../../../utils/ffbe-utils';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveCounterAttackWithSkillEffect extends SkillEffect {

  private counterChance: number;
  private activatedSkill: Skill;
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
      // TODO how to integrate parameters[1], which represents the target, into the description of the activated skill ? -_-
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(parameters[2]);
      this.activatedSkill.isActivatedByPassiveSkill = true;
      this.maxActivationNumber = parameters[3];
    }
  }

  protected get effectName(): string {
    return 'PassiveCounterAttackWithSkillEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    const damageTypeText = this.effectId === 49 ? 'physiques' : 'magiques';
    const prefixText = `${this.counterChance}% de chance de contrer les dégâts ${damageTypeText} par: `;
    const suffixText = this.maxActivationNumber ? ` (max ${this.maxActivationNumber} par tour)` : '';

    if (!this.activatedSkill) {
      return `${prefixText} UNKNOWN skill ${suffixText}`;
    }

    const activatedCompetence = SkillMapper.toCompetence(this.activatedSkill);
    if (!FfbeUtils.isNullOrUndefined(activatedCompetence.hits) && activatedCompetence.hits >= 5) {
      return `${prefixText}${EffectParser.getSkillNameWithGumiIdentifierLink(this.activatedSkill)}${suffixText}`;
    } else {
      return activatedCompetence.effet_fr
        .split(HTML_LINE_RETURN)
        .map(effet => `${prefixText}${effet}${suffixText}`)
        .join(HTML_LINE_RETURN);
    }
  }
}
