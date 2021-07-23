import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {SkillsService} from '../../../../services/skills.service';
import {EffectParser} from '../../../../mappers/effects/effect-parser';

export class PassiveSkillMoraleJaugeActivationEffect extends SkillEffect {

  private activatedSkillId: number;
  private activatedSkill: Skill;
  private threshold: number;
  private isLowerThreshold: boolean;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      if ((parameters.length > 3 && parameters[3] !== 1) || targetNumber !== 0 || targetType !== 3) {
        this.parameterWarning = true;
      }
      this.activatedSkillId = parameters[0];
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.activatedSkillId);
      this.threshold = parameters[1];
      this.isLowerThreshold = parameters[2] === 1 ? true : false;
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const activatedSkillLink = EffectParser.getSkillNameWithGumiIdentifierLink(this.activatedSkill);
    const comparatorText = this.isLowerThreshold ? 'supérieur' : 'inférieur';
    return `Donne accès à ${activatedSkillLink} ${this.wordTarget()} quand le moral est ${comparatorText} à ${this.threshold}%`;
  }

  public getActivatedSkills(): Array<Skill> {
    return this.activatedSkill ? [this.activatedSkill] : [] ;
  }

  protected get effectName(): string {
    return 'PassiveSkillMoraleJaugeActivationEffect';
  }
}
