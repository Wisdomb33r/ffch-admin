import {SkillEffect} from './skill-effect.model';
import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {Skill} from '../skill.model';
import {SkillsService} from '../../services/skills.service';
import {EffectParser} from '../../mappers/effects/effect-parser';
import {FfbeUtils} from '../../utils/ffbe-utils';

export abstract class AbstractSkillOrMagicMultipleActivationEffect extends SkillEffect {

  protected multiActivationTypes: Array<number>;
  protected additionalSkillsIds: Array<number>;
  protected excludedSkillsIds: Array<number>;
  protected nbTimes: number;
  protected multiskillId: number;
  protected noDuplicates: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      this.multiActivationTypes = Array.isArray(parameters[0]) ? parameters[0] : [parameters[0]];
      if (parameters[1] !== 0) {
        this.additionalSkillsIds = Array.isArray(parameters[1]) ? parameters[1] : [parameters[1]];
      }
      if (parameters[2] !== 0) {
        this.excludedSkillsIds = Array.isArray(parameters[2]) ? parameters[2] : [parameters[2]];
      }
      this.nbTimes = parameters[3];
      this.multiskillId = parameters[4];
      this.noDuplicates = parameters[5];
    }
  }

  protected wordEffectForMultiskillLink(): string {
    const doubleSkillAbilityActivated: Skill = SkillsService.getInstance().searchForSkillByGumiId(this.multiskillId);
    return `Donne accès à ${EffectParser.getSkillNameWithGumiIdentifierLink(doubleSkillAbilityActivated)}`;
  }

  protected wordEffectForEffectiveMultiskill(): string {
    let multiActivationTypesText = this.multiActivationTypes.map(type => this.fromTypeToText(type)).join(', ');
    multiActivationTypesText = FfbeUtils.replaceLastOccurenceInString(multiActivationTypesText, ', ', ' et ');
    let additionalSkillsText = '';
    if (this.additionalSkillsIds?.length) {
      const additionalSkills = this.additionalSkillsIds
        .map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
      additionalSkillsText = ` ainsi que ${EffectParser.getSkillsNamesWithGumiIdentifierLinks(additionalSkills)}`;
    }
    let excludedSkillsText = '';
    if (this.excludedSkillsIds?.length) {
      const excludedSkills = this.excludedSkillsIds
        .map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
      excludedSkillsText = ` excepté ${EffectParser.getSkillsNamesWithGumiIdentifierLinks(excludedSkills)}`;
    }
    const noDuplicatesText: string = this.noDuplicates === 1 ? `d'aptitudes <strong>distinctes</strong> parmi les` : 'des';
    return `Permet l'utilisation ${noDuplicatesText} ${multiActivationTypesText} natives${additionalSkillsText}${excludedSkillsText} ${this.nbTimes}x par tour`;
  }

  protected fromTypeToText(type: number) {
    switch (type) {
      case 1:
        return 'magies blanches';
      case 2:
        return 'magies noires';
      case 3:
        return 'magies vertes';
      case 5:
        return 'compétences spéciales';
      default:
        return 'UNKNOWN TYPE';
    }
  }

  protected abstract isWordingAsMultiskillLink(skill: Skill): boolean;

  public getActivatedSkills(skill: Skill): Array<Skill> {
    if (this.isWordingAsMultiskillLink(skill)) {
      return [SkillsService.getInstance().searchForSkillByGumiId(this.multiskillId)];
    }
    return [];
  }
}
