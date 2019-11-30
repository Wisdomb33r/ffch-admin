import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilityCopyEffectsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][2] !== 100) {
      return 'Effet AbilityCopyEffectsParser inconnu: Mauvaise liste de paramètres';
    }

    const sourceOfEffect = this.getTarget(effect[0], effect[1], 'TargetWithPreposition.De');
    const targetOfEffect = this.getTargetOfCopiedEffect(effect[3][0]);

    const numTurns = effect[3][1];
    const pluralFormTurns = numTurns > 1 ? 's' : '';

    const copiedEffectsIds = (effect[3][3] + '').split(';').map(effectId => +effectId);
    if (copiedEffectsIds.length === 0) {
      return 'Effet AbilityCopyEffectsParser inconnu: Mauvaise liste de paramètres';
    }

    console.log(copiedEffectsIds);

    let copiedEffects = [];

    const statRange = [1, 2, 3, 4];
    if (this.containsAllElements(statRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus d\'ATT/DÉF/MAGIE/PSY`);
    }


    return `Copie les effets suivants ${sourceOfEffect} ${targetOfEffect} pour ${numTurns} tour${pluralFormTurns}:` +
      `${HTML_LINE_RETURN}${copiedEffects.join(HTML_LINE_RETURN)}`;
  }



  private getTargetOfCopiedEffect(targetId: number): string {
    let target = 'Cible UNKNOWN';

    if (targetId === 0) {
      target = 'au lanceur';
    } else if (targetId === 1) {
      target = 'aux alliés sauf le lanceur';
    } else if (targetId === 2) {
      target = 'aux alliés';
    }

    return target;
  }

  private containsAllElements(expectedElements: Array<number>, underAnalysis: Array<number>): boolean {
    return expectedElements.every(element => underAnalysis.includes(element));
  }


}
