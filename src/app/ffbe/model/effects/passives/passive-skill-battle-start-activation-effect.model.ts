import {Skill} from '../../skill.model';
import {SkillMapper} from '../../../mappers/skill-mapper';
import {SkillsService} from '../../../services/skills.service';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveSkillBattleStartActivationEffect extends SkillEffect {

  private activatedSkill: Skill;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(parameters[0]);
    }
  }

  protected get effectName(): string {
    return 'PassiveSkillBattleStartActivationEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    const baseText = 'Effet activé en début de combat ou après résurrection: ';
    if (!this.activatedSkill) {
      return `${baseText}UNKNOWN skill`;
    }
    this.activatedSkill.isActivatedByPassiveSkill = true;
    return SkillMapper.toCompetence(this.activatedSkill).effet_fr
      .split(HTML_LINE_RETURN)
      .map(effet => baseText + effet)
      .join(HTML_LINE_RETURN);
  }

  public getActivatedSkills(): Array<Skill> {
    return this.activatedSkill ? this.activatedSkill.activatedSkills : [];
  }
}
