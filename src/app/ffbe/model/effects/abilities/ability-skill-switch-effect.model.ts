import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillsService} from '../../../services/skills.service';
import {SkillMapper} from '../../../mappers/skill-mapper';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';

export class AbilitySkillSwitchEffect extends SkillEffect {

  private normalSkillId: number;
  private normalSkill: Skill;
  private enhancedSkillId: number;
  private enhancedSkill: Skill;
  private activatorsIds: Array<number>;
  private activators: Array<Skill>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6) {
      this.parameterError = true;
    } else {
      this.normalSkillId = parameters[5];
      this.normalSkill = SkillsService.getInstance().searchForSkillByGumiId(this.normalSkillId);
      this.enhancedSkillId = parameters[3];
      this.enhancedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.enhancedSkillId);
      this.activatorsIds = !Array.isArray(parameters[1]) ? [parameters[1]] : parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    // Do NOT move the next line into constructor. There are skills having themselves as activator, consequently triggering an infinite loop
    this.activators = this.activatorsIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
    const normalSkillText = SkillMapper.toCompetence(this.normalSkill).effet_fr;
    const enhancedSkillText = SkillMapper.toCompetence(this.enhancedSkill).effet_fr;
    const activatorSkillsLinks = EffectParser.getSkillsNamesWithGumiIdentifierLinks(this.activators);
    EffectParser.fillSkillWithTransitiveActivatedSkillInformation(skill, this.normalSkill);
    const transformationText = `Si utilisé après ${activatorSkillsLinks}:${HTML_LINE_RETURN}${enhancedSkillText}`;
    return `${normalSkillText}${HTML_LINE_RETURN}${HTML_LINE_RETURN}${transformationText}`;
  }

  protected get effectName(): string {
    return 'AbilitySkillSwitchEffect';
  }

  public getDamagesPower(): number {
    return this.normalSkill.calculateSkillPower();
  }
}
