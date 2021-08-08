import {Skill} from '../../../skill.model';
import {SkillMapper} from '../../../../mappers/skill-mapper';
import {SkillsService} from '../../../../services/skills.service';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveSkillBattleStartActivationEffect extends SkillEffect {

  private activatedSkill: Skill;
  private activatedByRaising = false;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(parameters[0]);
      this.activatedSkill.isActivatedByPassiveSkill = true;
      if (this.effectId !== 103) {
        this.activatedByRaising = true;
      }
    }
  }

  protected get effectName(): string {
    return 'PassiveSkillBattleStartActivationEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    const raisingText = this.activatedByRaising ? ' ou après résurrection' : '';
    const baseText = `Effet activé en début de combat${raisingText}: `;
    if (!this.activatedSkill) {
      return `${baseText}UNKNOWN skill`;
    }
    return SkillMapper.toCompetence(this.activatedSkill).effet_fr
      .split(HTML_LINE_RETURN)
      .map(effet => effet.length > 0 ? baseText + effet : effet)
      .join(HTML_LINE_RETURN);
  }

  public getActivatedSkills(): Array<Skill> {
    return this.activatedSkill ? this.activatedSkill.activatedSkills : [];
  }
}
