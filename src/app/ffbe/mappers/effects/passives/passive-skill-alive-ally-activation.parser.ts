import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillMapper} from '../../skill-mapper';
import {SkillsService} from '../../../services/skills.service';
import {Character} from '../../../model/character.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../../../ffbe.constants';
import {CharactersService} from '../../../services/characters.service';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class PassiveSkillAliveAllyActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][1] !== 3) {
      return 'Effet PassiveSkillAliveAllyActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const activationCharacterId = effect[3][0];
    const activatedSkillId = effect[3][2];

    const activationCharacter: Character = CharactersService.getInstance().searchForCharacterByGumiId(activationCharacterId);
    const activationCharacterText = activationCharacter ? activationCharacter.names[FFBE_FRENCH_TABLE_INDEX] : 'UNKNOWN unit';

    const baseText = 'Effet activé en début de tour si ' + activationCharacterText + ' est en vie: ';
    const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(activatedSkillId);
    if (!activatedSkill) {
      return baseText + 'UNKNOWN skill';
    }

    activatedSkill.isActivatedByPassiveSkill = true;
    return SkillMapper.toCompetence(activatedSkill).effet_fr
      .split(HTML_LINE_RETURN)
      .map(effet => baseText + effet)
      .join(HTML_LINE_RETURN);
  }
}
