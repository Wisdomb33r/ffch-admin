import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilitySkillModifierIncreaseParser extends EffectParser {

  private duration: String;
  private target: String;

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5 || effect[3][1] !== 0 || effect[3][2] !== 0) {
      return 'Effet AbilitySkillModifierIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    // TODO unknown parameters

    const modifiedSkills = !Array.isArray(effect[3][0]) ? [effect[3][0]] : effect[3][0];
    const skillModifierIncrease = effect[3][3];

    const modifiedSkillsIncreases: Array<{ name: string, value: number }> = [];
    modifiedSkills.forEach(skillId => {
      const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(skillId);
      modifiedSkillsIncreases.push({
        name: this.getSkillNameWithGumiIdentifierLink(activatedSkill),
        value: activatedSkill.calculateTotalModIncrease(skillModifierIncrease),
      });
    });

    this.duration = (effect[3][4] >= 0) ? ' pour ' + effect[3][4] + ' tours' : ' pour ce combat';
    this.target = this.getTarget(effect[0], effect[1], effect[2]);

    return this.wordEffectJoiningIdenticalValues(modifiedSkillsIncreases, HTML_LINE_RETURN);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% de puissance à ' + accumulatedStats.join(', ')
      + this.target + this.duration;
  }

  protected getTarget(effectId1: number, effectId2: number, effectId3: number): String {
    let target = ' pour UNKNOWN';

    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3 && effectId3 === 136) {
      target = '';
    } else if (effectId1 === 1 && effectId2 === 2 && effectId3 === 136) {
      target = ' pour un allié';
    }

    return target;
  }
}
