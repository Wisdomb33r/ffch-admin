import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {isNullOrUndefined} from 'util';
import {SkillCost} from '../../../model/skill-cost.model';

export class AbilitySkillMultipleActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilitySkillMultipleActivationParser inconnu: Mauvaise liste de paramètres';
    }

    if (effect[2] === 53 && effect[3].length === 2) {
      return this.parseTemporaryRemovalFromFight(effect[3]);
    }

    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5
      || (effect[3][2] !== -1 && effect[3][2] !== 1)) {
      return 'Effet AbilitySkillMultipleActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const nbTimes: number = effect[3][0];
    const multiSkillAbilityActivatedId: number = effect[3][1];
    const modifiedSkillsIds: Array<number> = !Array.isArray(effect[3][3]) ? [effect[3][3]] : effect[3][3];

    let target = '';
    if (effect[0] === 1 && effect[1] === 2) {
      target = ' à un allié';
    }

    if (!this.isSkillFreeToCast(skill.cost) || skill.isActivatedByPassiveSkill) {
      const rawNumTurns: number = effect[3][4];
      if (rawNumTurns < 1) {
        return 'Effet AbilitySkillMultipleActivationParser inconnu: Nombre de tours incorrect (' + effect[3][4] + ')';
      }
      const numTurns: number = skill.isActivatedByPassiveSkill || target.length > 0 ? rawNumTurns : rawNumTurns - 1;
      const pluralForm = numTurns > 1 ? 's' : '';
      const doubleSkillAbilityActivated: Skill = SkillsService.getInstance().searchForSkillByGumiId(multiSkillAbilityActivatedId);
      return 'Donne accès à ' + this.getSkillNameWithGumiIdentifierLink(doubleSkillAbilityActivated)
        + ' pour ' + numTurns + ' tour' + pluralForm + target;
    } else {
      const modifiedSkills = modifiedSkillsIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
      return 'Permet l\'utilisation de ' + this.getSkillsNamesWithGumiIdentifierLinks(modifiedSkills) + ' ' + nbTimes + 'x par tour';
    }
  }

  private parseTemporaryRemovalFromFight(turnsArray: Array<number>): string {
    const minTurns = turnsArray[0].toString();
    const maxTurns = turnsArray[0] === turnsArray[1] ? '' : ' à ' + turnsArray[1].toString();
    const pluralMarker = turnsArray[0] > 1 ? ' tours' : ' tour';
    return 'Retire le lanceur du combat pour ' + minTurns + maxTurns + pluralMarker;
  }

  private isSkillFreeToCast(cost: SkillCost): boolean {
    return (
      isNullOrUndefined(cost) ||
      ((isNullOrUndefined(cost.MP) || cost.MP === 0) &&
        (isNullOrUndefined(cost.EP) || cost.EP === 0) &&
        (isNullOrUndefined(cost.LB) || cost.LB === 0))
    );
  }
}
