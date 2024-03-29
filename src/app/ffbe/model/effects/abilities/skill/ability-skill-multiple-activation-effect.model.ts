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
  private noDuplicates: number;
  private nbUses: number;

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
        this.noDuplicates = parameters[7] ? parameters[7] : 0;
        this.nbUses = parameters[9] ? parameters[9] : 99999;
      }
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (this.isGlexEffect) {
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

    if (this.isWordingAsMultiskillLink(skill)) {
      if (this.numTurns < 1) {
        return `Effet ${this.effectName} wrong parameter: Nombre de tours incorrect (${this.numTurns})`;
      }
      const nbUsesText = this.numTurns > 1 && this.nbUses > 0 && this.nbUses < 999 ? ` pour ${this.nbUses} utilisation${this.nbUses > 1 ? 's' : ''}` : '';
      const nbTurns: number = skill.isActivatedByPassiveSkill || target.length > 0 ? this.numTurns : this.numTurns - 1;
      const nbTurnsText = nbTurns > 0 && nbTurns < 999 ? ` pour ${nbTurns} tour${nbTurns > 1 ? 's' : ''}` : '';
      const multiskill: Skill = SkillsService.getInstance().searchForSkillByGumiId(this.multiskillId);
      const multiskillText = EffectParser.getSkillNameWithGumiIdentifierLink(multiskill);
      return `Donne accès à ${multiskillText}${target}${nbUsesText}${nbTurnsText}`;
    } else {
      const skills = this.skillIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
      const skillsText = EffectParser.getSkillsNamesWithGumiIdentifierLinks(skills);
      const noDuplicatesText: string = this.noDuplicates === 1 ? `d'aptitudes <strong>distinctes</strong> parmi` : 'de';
      return `Permet l'utilisation ${noDuplicatesText} ${skillsText} ${this.nbTimes}x par tour`;
    }
  }

  private isWordingAsMultiskillLink(skill: Skill): boolean {
    return !this.isSkillFreeToCast(skill.cost) || skill.isActivatedByPassiveSkill || skill.effects_raw.length > 1;
  }

  private get isGlexEffect(): boolean {
    return this.effectId === 1006;
  }

  private isSkillFreeToCast(cost: SkillCost): boolean {
    return !cost || (!cost.MP && !cost.EP && !cost.LB);
  }

  protected get effectName(): string {
    return 'AbilitySkillMultipleActivationEffect';
  }

  public getActivatedSkills(skill: Skill): Array<Skill> {
    if (this.isGlexEffect || this.isWordingAsMultiskillLink(skill)) {
      return [SkillsService.getInstance().searchForSkillByGumiId(this.multiskillId)];
    }
    return [];
  }
}
