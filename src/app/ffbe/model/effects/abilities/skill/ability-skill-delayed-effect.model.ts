import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilitySkillDelayedEffect extends SkillEffect {

  private activatedSkillId: number;
  private activatedSkill: Skill;
  private turnsDelay: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      this.activatedSkillId = parameters[0];
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.activatedSkillId);
      this.turnsDelay = parameters[2];
    }
  }

  protected get effectName(): string {
    return 'AbilitySkillDelayedEffect';
  }

  protected wordEffectImpl(skill: Skill) {
    const activatedSkillLink = EffectParser.getSkillNameWithGumiIdentifierLink(this.activatedSkill);
    const turnsDelayText = `avec délai de ${this.turnsDelay} tour${this.turnsDelay > 1 ? 's' : ''}`;
    const target = this.wordTarget();
    return `Lance ${activatedSkillLink} ${turnsDelayText} ${target}`;
  }
}
