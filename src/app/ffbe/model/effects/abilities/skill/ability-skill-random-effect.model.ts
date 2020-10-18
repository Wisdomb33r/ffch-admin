import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilitySkillRandomEffect extends SkillEffect {

  private randomSKills: Array<{ chance: number, skill: Skill }> = [];

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      console.log('AbilitySkillRandomEffect');
      this.randomSKills = parameters
        .filter(value => Array.isArray(value) && value.length >= 2)
        .map(entry => {
          console.log('random skill id ' + entry[0]);
          console.log(SkillsService.getInstance());
          const skill = SkillsService.getInstance().searchForSkillByGumiId(entry[0]);
          console.log(skill);
          const chance = entry[1];
          return {chance, skill};
        });
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const randomSkillsText = this.randomSKills
      .map(randomSkill => `${randomSkill.chance}%: Lance ${EffectParser.getSkillNameWithGumiIdentifierLink(randomSkill.skill)}`)
      .join(HTML_LINE_RETURN);
    return `Effet aléatoire:${HTML_LINE_RETURN}${randomSkillsText}`;
  }

  protected get effectName(): string {
    return 'AbilitySkillRandomEffect';
  }

  public getActivatedSkills(): Array<Skill> {
    return this.randomSKills?.length ? this.randomSKills.map(entry => entry.skill) : [];
  }
}
