import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillMapper} from '../../../../mappers/skill-mapper';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class AbilitySkillMagnusEffect extends SkillEffect {

  private activatedSkillId: number;
  private activatedSkill: Skill;
  private activationLimit: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 9) {
      this.parameterError = true;
    } else {
      this.activatedSkillId = parameters[0];
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.activatedSkillId);
      this.activationLimit = parameters[2];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const activatedSkillText = SkillMapper.toCompetence(this.activatedSkill).effet_fr;
    EffectParser.fillSkillWithTransitiveActivatedSkillInformation(skill, this.activatedSkill);
    const pluralSuffix = this.activationLimit > 1 ? 's' : '';
    const activationLimitText = `<strong>Seulement ${this.activationLimit} utilisation${pluralSuffix} par combat:</strong>`;
    return `${activationLimitText}${HTML_LINE_RETURN}${activatedSkillText}`;
  }

  protected get effectName(): string {
    return 'AbilitySkillMagnusEffect';
  }

  public getDamagesPower(): number {
    return this.activatedSkill.calculateSkillPower();
  }
}
