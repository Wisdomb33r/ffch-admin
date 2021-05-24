import {SkillEffect} from '../skill-effect.model';
import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillsService} from '../../../services/skills.service';
import {EffectParser} from '../../../mappers/effects/effect-parser';

export class PassiveSkillReplacingNormalAttackEffect extends SkillEffect {

  private activatedSkillId: number;
  private activatedSkill: Skill;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      if (parameters[1] !== 1 || parameters[2] !== 1 || parameters[3] !== 0) {
        this.parameterWarning = true;
      }
      this.activatedSkillId = parameters[0];
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.activatedSkillId);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    return `Remplace les attaques normales par ${EffectParser.getSkillNameWithGumiIdentifierLink(this.activatedSkill)}`;
  }

  protected get effectName(): string {
    return 'PassiveSkillReplacingNormalAttackEffect';
  }

  public getActivatedSkills(): Array<Skill> {
    return this.activatedSkill ? [this.activatedSkill] : [];
  }
}
