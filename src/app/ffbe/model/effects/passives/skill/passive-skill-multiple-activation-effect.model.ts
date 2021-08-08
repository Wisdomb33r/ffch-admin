import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveSkillMultipleActivationEffect extends SkillEffect {

  private nbTimes: number;
  private skillIds: Array<number>;
  private multiskillId: number;
  private noDuplicates: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      if (parameters[2] !== -1 || parameters[4] !== 1) {
        this.parameterWarning = true;
      }
      this.nbTimes = parameters[0];
      this.multiskillId = parameters[1];
      this.skillIds = Array.isArray(parameters[3]) ? parameters[3] : [parameters[3]];
      this.noDuplicates = parameters[5];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (this.isWordingAsMultiskillLink(skill)) {
      const doubleSkillAbilityActivated: Skill = SkillsService.getInstance().searchForSkillByGumiId(this.multiskillId);
      return `Donne accès à ${EffectParser.getSkillNameWithGumiIdentifierLink(doubleSkillAbilityActivated)}`;
    } else {
      const noDuplicatesText: string = this.noDuplicates === 1 ? `d'aptitudes <strong>distinctes</strong> parmi` : 'de';
      const modifiedSkills = this.skillIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
      return `Permet l'utilisation ${noDuplicatesText} ${EffectParser.getSkillsNamesWithGumiIdentifierLinks(modifiedSkills)} ${this.nbTimes}x par tour`;
    }
  }

  public getActivatedSkills(skill: Skill): Array<Skill> {
    if (this.isWordingAsMultiskillLink(skill)) {
      return [SkillsService.getInstance().searchForSkillByGumiId(this.multiskillId)];
    }
    return [];
  }

  protected isWordingAsMultiskillLink(skill: Skill): boolean {
    return skill.effects_raw.length !== 1 || skill.isActivatedByPassiveSkill;
  }

  protected get effectName(): string {
    return 'PassiveSkillMultipleActivationEffect';
  }
}
