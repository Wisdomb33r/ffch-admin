import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillMapper} from '../../../../mappers/skill-mapper';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {FfbeUtils} from '../../../../utils/ffbe-utils';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Competence} from '../../../competence.model';

export class PassiveSkillCounterAttackActivationEffect extends SkillEffect {

  private counterChance: number;
  private activatedSkill: Skill;
  private maxActivationNumber: number;
  private counterWithSkill: boolean;

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
      this.counterWithSkill = parameters[2] > 0;
      if (this.counterWithSkill) {
        this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(parameters[2]);
        if (this.activatedSkill) {
          this.activatedSkill.isActivatedByPassiveSkill = true;
        }
      }
      this.maxActivationNumber = parameters[3];
    }
  }

  protected get effectName(): string {
    return 'PassiveCounterAttackWithSkillEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    const damageTypeText = this.effectId === 49 ? 'physiques' : 'magiques';
    const prefixText = `${this.counterChance}% de chance de contrer les dégâts ${damageTypeText} par`;
    const separatorText = ': ';
    const suffixText = this.maxActivationNumber ? ` (max ${this.maxActivationNumber} par tour)` : '';

    if (!this.counterWithSkill) {
      return `${prefixText} une attaque normale de puissance 100%${suffixText}`;
    } else if (!this.activatedSkill) {
      return `${prefixText}${separatorText} UNKNOWN skill ${suffixText}`;
    }

    const activatedCompetence: Competence = SkillMapper.toCompetence(this.activatedSkill);
    if (this.shouldActivatedSkillBeDisplayedAsLink(activatedCompetence)) {
      return `${prefixText}${separatorText}${EffectParser.getSkillNameWithGumiIdentifierLink(this.activatedSkill)}${suffixText}`;
    } else {
      return activatedCompetence.effet_fr
        .split(HTML_LINE_RETURN)
        .map(effet => `${prefixText}${separatorText}${effet}${suffixText}`)
        .join(HTML_LINE_RETURN);
    }
  }

  private shouldActivatedSkillBeDisplayedAsLink(activatedCompetence: Competence): boolean {
    return !FfbeUtils.isNullOrUndefined(activatedCompetence.hits) && activatedCompetence.hits >= 5;
  }

  public getActivatedSkills(): Array<Skill> {
    const activatedSkills: Array<Skill> = [];
    if (this.activatedSkill) {
      const activatedCompetence: Competence = SkillMapper.toCompetence(this.activatedSkill);
      if (this.shouldActivatedSkillBeDisplayedAsLink(activatedCompetence)) {
        activatedSkills.push(this.activatedSkill);
      }
      return activatedSkills.concat(this.activatedSkill.activatedSkills);
    }
    return activatedSkills;
  }
}
