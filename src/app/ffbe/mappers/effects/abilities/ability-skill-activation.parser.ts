import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';

export class AbilitySkillActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4) {
      return 'Effet AbilitySkillMultipleActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const content = effect[3];

    const numUses = this.getNumUses(content);
    const numTurns = this.getNumTurns(content);
    const activatedSkillsIds: Array<number> = !Array.isArray(effect[3][1]) ? [effect[3][1]] : effect[3][1];

    const activatedSkills = activatedSkillsIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
    const links = this.getSkillsNamesWithGumiIdentifierLinks(activatedSkills);

    let duration = '';

    if (this.hasUseLimit(content)) {
      if (this.hasTurnLimit(content)) {
        duration = ' pour ' + numUses + ' sur ' + numTurns;
      } else {
        duration = ' pour ' + numUses;
      }
    } else {
      if (this.hasTurnLimit(content)) {
        duration = ' pour ' + numTurns;
      }
    }

    return 'Donne accès à ' + links + duration;
  }

  private hasTurnLimit(content: Array<any>): boolean {
    return content[3] < 990;
  }

  private hasUseLimit(content: Array<any>): boolean {
    return content[2] < 990;
  }

  private getNumTurns(content: Array<any>): string {
    const numTurns = content[3] - 1;
    return +numTurns + ' ' + (numTurns > 1 ? 'tours' : 'tour');
  }

  private getNumUses(content: Array<any>): string {
    const numTimes = content[2];
    return +numTimes + ' ' + (numTimes > 1 ? 'utilisations' : 'utilisation');
  }

}

