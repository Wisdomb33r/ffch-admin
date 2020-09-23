import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilitySkillActivationEffect extends SkillEffect {
  private activatedSkillsIds: Array<number>;
  private numberUses: number;
  private numberTurns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      this.activatedSkillsIds = !Array.isArray(parameters[1]) ? [parameters[1]] : parameters[1];
      this.numberUses = parameters[2];
      this.numberTurns = parameters[3];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const target = this.wordTarget();
    const activatedSkills = this.activatedSkillsIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
    const linksText = EffectParser.getSkillsNamesWithGumiIdentifierLinks(activatedSkills);
    const durationText = this.wordDuration(skill.isActivatedByPassiveSkill);
    return `Donne accès à ${linksText} ${target}${durationText}`;
  }

  protected get effectName(): string {
    return 'AbilitySkillActivationEffect';
  }

  private wordDuration(isActivatedByPassiveSkill): string {
    const numTurns = this.targetType === TargetTypeEnum.Caster && !isActivatedByPassiveSkill ? this.numberTurns - 1 : this.numberTurns;
    const numTurnsText = `${numTurns} tour${numTurns > 1 ? 's' : ''}`;
    const numUsesText = `${this.numberUses} utilisation${this.numberUses > 1 ? 's' : ''}`;
    let duration = '';

    if (this.hasUseLimit()) {
      if (this.hasTurnLimit()) {
        duration = ` pour ${numUsesText} sur ${numTurnsText}`;
      } else {
        duration = ` pour ${numUsesText}`;
      }
    } else {
      if (this.hasTurnLimit()) {
        duration = ` pour ${numTurnsText}`;
      }
    }

    return duration;
  }

  private hasTurnLimit(): boolean {
    return this.numberTurns > 0 && this.numberTurns < 990;
  }

  private hasUseLimit(): boolean {
    return this.numberUses > 0 && this.numberUses < 990;
  }

}

