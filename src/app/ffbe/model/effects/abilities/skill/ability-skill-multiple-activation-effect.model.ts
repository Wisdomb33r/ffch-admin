import {SkillEffect} from '../../skill-effect.model';
import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillsService} from '../../../../services/skills.service';
import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {SkillCost} from '../../../skill-cost.model';

export class AbilitySkillMultipleActivationEffect extends SkillEffect {

  private nbTimes: number;
  private numTurns: number;
  private skillIds: Array<number>;
  private multiskillId: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || (effectId === 1006 && parameters.length < 2) || (effectId !== 1006 && parameters.length < 5)) {
      this.parameterError = true;
    } else {
      if (parameters[2] !== -1 && parameters[2] !== 1) {
        this.parameterWarning = true;
      }

      this.nbTimes = parameters[0];
      if (effectId === 1006) {
        this.skillIds = !Array.isArray(parameters[1]) ? [parameters[1]] : parameters[1];
      } else {
        this.multiskillId = parameters[1];
        this.skillIds = !Array.isArray(parameters[3]) ? [parameters[3]] : parameters[3];
        this.numTurns = parameters[4];
      }
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (this.effectId === 1006) {
      return this.wordGlexEffect();
    } else {
      return this.wordGeneralEffect(skill);
    }
  }

  private wordGlexEffect(): string {
    const skills = this.skillIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
    const skillsText = EffectParser.getSkillsNamesWithGumiIdentifierLinks(skills);
    return `Permet l'utilisation de ${skillsText} ${this.nbTimes}x par tour`;
  }

  private wordGeneralEffect(skill: Skill): string {
    let target = '';
    if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Ally) {
      target = ' à un allié';
    }

    if (!this.isSkillFreeToCast(skill.cost) || skill.isActivatedByPassiveSkill || skill.effects_raw.length > 1) {
      if (this.numTurns < 1) {
        return `Effet ${this.effectName} wrong parameter: Nombre de tours incorrect (${this.numTurns})`;
      }
      const numTurnsCalculated: number = skill.isActivatedByPassiveSkill || target.length > 0 ? this.numTurns : this.numTurns - 1;
      const pluralForm = numTurnsCalculated > 1 ? 's' : '';
      const doubleSkillAbilityActivated: Skill = SkillsService.getInstance().searchForSkillByGumiId(this.multiskillId);
      const skillLink = EffectParser.getSkillNameWithGumiIdentifierLink(doubleSkillAbilityActivated);
      return `Donne accès à ${skillLink}${target} pour ${numTurnsCalculated} tour${pluralForm}`;
    } else {
      const skills = this.skillIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
      const skillsText = EffectParser.getSkillsNamesWithGumiIdentifierLinks(skills);
      return `Permet l'utilisation de ${skillsText} ${this.nbTimes}x par tour`;
    }
  }

  private isSkillFreeToCast(cost: SkillCost): boolean {
    return !cost || (!cost.MP && !cost.EP && !cost.LB);
  }

  protected get effectName(): string {
    return 'AbilitySkillMultipleActivationEffect';
  }
}
