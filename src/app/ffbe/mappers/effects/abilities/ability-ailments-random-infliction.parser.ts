import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityAilmentsRandomInflictionParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10) {
      return 'Effet AbilityAilmentsRandomInflictionParser inconnu: Mauvaise liste de paramètres';
    }
    const ailmentsNumber = effect[3][9];
    const ailmentsText = this.wordEffectJoiningIdenticalValues(this.getKeyValueTableForAilements(effect[3]));

    const target = this.getTarget(effect[0], effect[1]);
    const pluralForm = ailmentsNumber > 1 ? 's' : '';

    return `Inflige ${ailmentsNumber} altération${pluralForm} aléatoire${pluralForm} (${ailmentsText}) ${target}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    let alterations = `${currentValue}% ${accumulatedStats.join(', ')}`;
    if (accumulatedStats.length === 8) {
      alterations = `${currentValue}% chacune`;
    }
    return alterations;
  }
}
