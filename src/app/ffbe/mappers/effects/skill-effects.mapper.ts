import {Skill} from '../../model/skill.model';
import {PassiveEffectParserFactory} from './passive-effect-parser.factory';

export const HTML_LINE_RETURN = '<br />';

export class SkillEffectsMapper {
  public static mapSkillEffects(skill: Skill): string {
    if (skill.active) {
      if (skill.type === 'MAGIC') {
        return SkillEffectsMapper.mapMagicSkillEffects(skill);
      } else {
        return SkillEffectsMapper.mapAbilitySkillEffects(skill);
      }
    } else {
      return SkillEffectsMapper.mapPassiveSkillEffects(skill);
    }
  }

  public static mapMagicSkillEffects(skill: Skill): string {
    return 'MAGIC NOT IMPLEMENTED YET';
  }

  public static mapAbilitySkillEffects(skill: Skill): string {
    return 'ABILITY NOT IMPLEMENTED YET';
  }

  public static mapPassiveSkillEffects(skill: Skill): string {
    const effects = [];
    skill.effects_raw.forEach((effect: Array<any>) => {
      if (effect.length !== 4) {
        effects.push('Effet inconnu : mauvaise structure');
      }
      effects.push(PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill));
    });
    return effects.join(HTML_LINE_RETURN);
  }
}
