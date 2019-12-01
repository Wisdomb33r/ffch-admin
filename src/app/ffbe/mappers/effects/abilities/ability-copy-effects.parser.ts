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
    const otherCaracsRange = [39, 40, 41, 42];
    if (this.containsAllElements(caracsRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus d\'ATT/DÉF/MAGIE/PSY`);
      this.removeElements(caracsRange, copiedEffectsIds);
      this.removeElements(otherCaracsRange, copiedEffectsIds);
    }

    const MagicResRange = [9];
    if (this.containsAllElements(MagicResRange, copiedEffectsIds)) {
      copiedEffects.push(`Rés. aux dégâts magiques`);
      this.removeElements(MagicResRange, copiedEffectsIds);
    }

    const ailmentsResistancesRange = [12, 13, 14, 15, 16, 17, 18, 19];
    if (this.containsAllElements(ailmentsResistancesRange, copiedEffectsIds)) {
      copiedEffects.push(`Rés. aux altérations`);
      this.removeElements(ailmentsResistancesRange, copiedEffectsIds);
    }

    const HPRegenRange = [20];
    if (this.containsAllElements(HPRegenRange, copiedEffectsIds)) {
      copiedEffects.push(`Régénération de PV par tour`);
      this.removeElements(HPRegenRange, copiedEffectsIds);
    }

    const AutoReviveRange = [21];
    if (this.containsAllElements(AutoReviveRange, copiedEffectsIds)) {
      copiedEffects.push(`Auréole`);
      this.removeElements(AutoReviveRange, copiedEffectsIds);
    }

    const MPRegenRange = [22];
    if (this.containsAllElements(MPRegenRange, copiedEffectsIds)) {
      copiedEffects.push(`Régénération de PM par tour`);
      this.removeElements(MPRegenRange, copiedEffectsIds);
    }

    const elementalResistancesRange = [23, 24, 25, 26, 27, 28, 29, 30];
    if (this.containsAllElements(elementalResistancesRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus aux rés. élémentaires`);
      this.removeElements(elementalResistancesRange, copiedEffectsIds);
    }

    const LBFillRateRange = [47];
    if (this.containsAllElements(LBFillRateRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus à la vitesse de la jauge de limite`);
      this.removeElements(LBFillRateRange, copiedEffectsIds);
    }

    const physicalDodgeRange = [56];
    if (this.containsAllElements(physicalDodgeRange, copiedEffectsIds)) {
      copiedEffects.push(`Esquive d\'attaques physiques`);
      this.removeElements(physicalDodgeRange, copiedEffectsIds);
    }

    const physicalMitigationRange = [57];
    if (this.containsAllElements(physicalMitigationRange, copiedEffectsIds)) {
      copiedEffects.push(`Mitigation physique`);
      this.removeElements(physicalMitigationRange, copiedEffectsIds);
    }

    const magicalMitigationRange = [58];
    if (this.containsAllElements(magicalMitigationRange, copiedEffectsIds)) {
      copiedEffects.push(`Mitigation magique`);
      this.removeElements(magicalMitigationRange, copiedEffectsIds);
    }

    const magicReflectsRange = [60];
    if (this.containsAllElements(magicReflectsRange, copiedEffectsIds)) {
      copiedEffects.push(`Réflexion des magies`);
      this.removeElements(magicReflectsRange, copiedEffectsIds);
    }

    const damageBoostRange = [62];
    if (this.containsAllElements(damageBoostRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus aux dégâts`);
      this.removeElements(damageBoostRange, copiedEffectsIds);
    }

    const PhysicalKillersRange = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74];
    if (this.containsAllElements(PhysicalKillersRange, copiedEffectsIds)) {
      copiedEffects.push(`Tueurs physiques`);
      this.removeElements(PhysicalKillersRange, copiedEffectsIds);
    }

    const MagicalKillersRange = [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86];
    if (this.containsAllElements(MagicalKillersRange, copiedEffectsIds)) {
      copiedEffects.push(`Tueurs magiques`);
      this.removeElements(MagicalKillersRange, copiedEffectsIds);
    }

    const imbuesRange = [87, 88, 89, 90, 91, 92, 93, 94];
    if (this.containsAllElements(imbuesRange, copiedEffectsIds)) {
      copiedEffects.push(`Éléments ajoutés aux attaques physiques et hybrides`);
      this.removeElements(imbuesRange, copiedEffectsIds);
    }

    const statsBreaksResistancesRange = [95, 96, 97, 98, 99, 100];
    if (this.containsAllElements(statsBreaksResistancesRange, copiedEffectsIds)) {
      copiedEffects.push(`Rés. aux baisses de caractéristiques, à Stop et à Charme`);
      this.removeElements(statsBreaksResistancesRange, copiedEffectsIds);
    }

    const berserkResRange = [101];
    if (this.containsAllElements(berserkResRange, copiedEffectsIds)) {
      copiedEffects.push(`Rés. à Berserk`);
      this.removeElements(berserkResRange, copiedEffectsIds);
    }

    const LBDamagesRange = [221];
    if (this.containsAllElements(LBDamagesRange, copiedEffectsIds)) {
      copiedEffects.push(`Bonus aux dégâts de la limite`);
      this.removeElements(LBDamagesRange, copiedEffectsIds);
    }

    if (copiedEffectsIds.length > 0) {
      return `Effet AbilityCopyEffectsParser inconnu: Eléments inconnus: ${copiedEffectsIds.join(', ')}`;
    }

    return `Copie les effets suivants ${sourceOfEffect} ${targetOfEffect} pour ${numTurns} tour${pluralFormTurns}:` +
      `${HTML_LINE_RETURN} • ${copiedEffects.join(HTML_LINE_RETURN + ' • ')}`;
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

  private removeElements(elementsToBeRemoved: Array<number>, underAnalysis: Array<number>) {
    elementsToBeRemoved.forEach(
      elementToBeRemoved => underAnalysis.splice(underAnalysis.indexOf(elementToBeRemoved), 1)
    );
  }


}
