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

    let copiedEffects = [];

    const caracsRange = [1, 2, 3, 4];
    if (this.containsAllElements(caracsRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus d\'ATT/DÉF/MAGIE/PSY`);
    }

    const elementalResistancesRange = [23, 24, 25, 26, 27, 28, 29, 30];
    if (this.containsAllElements(elementalResistancesRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus aux rés. élémentaires`);
    }

    const imbuesRange = [87, 88, 89, 90, 91, 92, 93, 94];
    if (this.containsAllElements(imbuesRange, copiedEffectsIds)) {
      copiedEffects.push(`Éléments ajoutés aux attaques physiques et hybrides`);
    }

    const LBDamagesRange = [221];
    if (this.containsAllElements(LBDamagesRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus aux dégâts de la limite`);
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
