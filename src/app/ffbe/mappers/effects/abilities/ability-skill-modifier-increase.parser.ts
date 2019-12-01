import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
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
    const pluralForm = effect[3][4] >= 1 ? 's' : '';
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

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const isHeal: boolean = this.modifiedSkillsIncreases.find(increase => increase.name === accumulatedStats[0]).isHeal;
    let valueText: string;
    let percentText = '';
    if (isHeal) {
      valueText = `${currentValue / 200}x la PSY + ${currentValue / 1000}x la MAG`;
    } else {
      valueText = `${Math.round(currentValue)}`;
      percentText = '%';
    }
    const displayedValue = (currentValue > 0 ? valueText : 'UNKNOWN');
    const skillsText = accumulatedStats.join(', ');
    return `+${displayedValue}${percentText} de puissance à ${skillsText} ${this.target} ${this.duration} (ID #${this.stackId})`;
  }

}
