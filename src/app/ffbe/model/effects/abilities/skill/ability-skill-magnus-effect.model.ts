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
  private multipleUsagePerTurn: boolean;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 9 || parameters[1] !== 1 || parameters[4] !== 1 || parameters[5] !== 1
      || parameters[6] !== 1 || (parameters[7] !== 0 && parameters[7] !== 1) || (parameters[2] !== parameters[3])) {
      this.parameterError = true;
    } else {
      this.activatedSkillId = parameters[0];
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.activatedSkillId);
      this.activationLimit = parameters[2];
      this.multipleUsagePerTurn = parameters[7] !== 0;
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const activatedSkillText = SkillMapper.toCompetence(this.activatedSkill).effet_fr;
    EffectParser.fillSkillWithTransitiveActivatedSkillInformation(skill, this.activatedSkill);
    const pluralSuffix = this.activationLimit > 1 ? 's' : '';
    const multipleUsageText = this.multipleUsagePerTurn || this.activationLimit < 2 ? '' : ' (une seule utilisation par multi-cast)';
    const activationLimitText = `<strong>${this.activationLimit} utilisation${pluralSuffix} par combat</strong>${multipleUsageText}:`;
    return `${activationLimitText}${HTML_LINE_RETURN}${activatedSkillText}`;
  }

  protected get effectName(): string {
    return 'AbilitySkillMagnusEffect';
  }

  public getDamagesPower(): number {
    return this.activatedSkill.calculateSkillPower();
  }
}
