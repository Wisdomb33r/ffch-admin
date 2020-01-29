import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';
import {SkillModifierIncreaseParser} from '../skill-modifier-increase.parser';

export class AbilitySkillModifierIncreaseParser extends SkillModifierIncreaseParser {

  private duration: string;
  private target: string;
  private stackId: number;

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5 || effect[3][1] !== 0 || effect[3][2] !== 0) {
      return 'Effet AbilitySkillModifierIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    this.stackId = effect[3].length >= 7 ? effect[3][6] : 0;
    const pluralForm = effect[3][4] > 1 ? 's' : '';
    const turns = effect[3][4] >= 0 ? effect[3][4] : 9999;
    this.duration = `pour ${turns} tour${pluralForm}`;
    this.target = this.getTarget(effect[0], effect[1]);

    this.initializeSkillIncreasesValues(effect);

    const modIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => !increase.isHeal), HTML_LINE_RETURN, true);
    const healingModIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => increase.isHeal), HTML_LINE_RETURN, true);
    const modIncreasesJoiningText = modIncreaseText.length && healingModIncreaseText.length ? HTML_LINE_RETURN : '';
    return `${modIncreaseText}${modIncreasesJoiningText}${healingModIncreaseText}`;
  }

  protected wordEffectForSkillModIncrase(displayedValue: string, percentText: string, skillsText: string) {
    return `+${displayedValue}${percentText} de puissance à ${skillsText} ${this.target} ${this.duration} (ID #${this.stackId})`;
  }
}
