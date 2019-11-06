import {Skill} from '../../model/skill.model';
import {PassiveEffectParserFactory} from './passive-effect-parser.factory';
import {AbilityEffectParserFactory} from './abilities/ability-effect-parser.factory';

export const HTML_LINE_RETURN = '<br />';

export class SkillEffectsMapper {
  public static mapSkillEffects(skill: Skill): string {
    if (skill.active) {
      return SkillEffectsMapper.mapAbilitySkillEffects(skill);
    } else {
      return SkillEffectsMapper.mapPassiveSkillEffects(skill);
    }
  }

  public static mapAbilitySkillEffects(skill: Skill): string {
    const effects = [];
    skill.effects_raw.forEach((effect: Array<any>) => {
      effects.push(AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill));
    });
    return effects.filter(effect => effect && effect.length > 0).join(HTML_LINE_RETURN);
  }

  public static mapPassiveSkillEffects(skill: Skill): string {
    const effects = [];
    skill.effects_raw.forEach((effect: Array<any>) => {
      effects.push(PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill));
    });
    return effects.filter(effect => effect && effect.length > 0).join(HTML_LINE_RETURN);
  }
}
