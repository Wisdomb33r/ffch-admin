import {Skill} from '../../skill.model';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {TargetPrepositionEnum} from '../target-preposition.enum';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityCopyEffectsEffect extends SkillEffect {

  private numTurns: number;
  private copiedEffectsIds: Array<number>;
  private copiedEffects: Array<string>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      if (parameters[2] !== 100) {
        this.parameterWarning = true;
      }
    }
    this.numTurns = parameters[1];

    this.copiedEffectsIds = (`${parameters[3]}`).split(';').map(copiedEffectId => +copiedEffectId);
    if (this.copiedEffectsIds.length === 0) {
      this.parameterError = true;
    }

    this.copiedEffects = [];
    this.classifyEffects();
  }

  protected wordEffectImpl(skill: Skill): string {
    const sourceOfEffect = this.wordTarget(TargetPrepositionEnum.De);
    const targetOfEffect = this.getTargetOfCopiedEffect(this.parameters[0]);
    const numTurnsText = this.wordForTurns(this.numTurns);

    const stringJoinSeparator = `${HTML_LINE_RETURN} • `;
    const copiedEffectsText = this.copiedEffects.length > 0 ?
      (`Copie les effets suivants ${sourceOfEffect} ${targetOfEffect} ${numTurnsText}:` +
        `${stringJoinSeparator}${this.copiedEffects.join(stringJoinSeparator)}`) : '';

    const separatorText = this.copiedEffects.length > 0 && this.copiedEffectsIds.length > 0 ? `${HTML_LINE_RETURN}` : '';
    const leftoverText = this.copiedEffectsIds.length > 0 ?
      `Effet AbilityCopyEffectsParser inconnu: Eléments inconnus: ${this.copiedEffectsIds.join(', ')}` : '';

    return `${copiedEffectsText}${separatorText}${leftoverText}`;
  }

  private classifyEffects() {
    const wasRangeFound = this.wordCopiedEffectsRange([1, 2, 3, 4], `Bonus d'ATT/DÉF/MAGIE/PSY`);
    // Up to now, this extra range was only found in combination with the previous one, with no visible effect
    const extraRange = [39, 40, 41, 42];
    if (wasRangeFound && this.containsAllElements(extraRange, this.copiedEffectsIds)) {
      this.removeElements(extraRange, this.copiedEffectsIds);
    }
    this.wordCopiedEffectsRange([9], `Rés. aux dégâts magiques`);
    this.wordCopiedEffectsRange([12, 13, 14, 15, 16, 17, 18, 19], `Rés. aux altérations`);
    this.wordCopiedEffectsRange([20], `Régénération de PV par tour`);
    this.wordCopiedEffectsRange([21], `Auréole`);
    this.wordCopiedEffectsRange([22], `Régénération de PM par tour`);
    this.wordCopiedEffectsRange([23, 24, 25, 26, 27, 28, 29, 30], `Bonus aux rés. élémentaires`);
    this.wordCopiedEffectsRange([47], `Bonus à la vitesse de la jauge de limite`);
    this.wordCopiedEffectsRange([56], `Esquive d\'attaques physiques`);
    this.wordCopiedEffectsRange([57], `Mitigation physique`);
    this.wordCopiedEffectsRange([58], `Mitigation magique`);
    this.wordCopiedEffectsRange([60], `Renvoi des magies`);
    this.wordCopiedEffectsRange([62], `Bonus aux dégâts`);
    this.wordCopiedEffectsRange([63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], `Tueurs physiques`);
    this.wordCopiedEffectsRange([75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86], `Tueurs magiques`);
    this.wordCopiedEffectsRange([87, 88, 89, 90, 91, 92, 93, 94], `Éléments ajoutés aux attaques physiques et hybrides`);
    this.wordCopiedEffectsRange([95, 96, 97, 98, 99, 100], `Rés. aux baisses de caractéristiques, à Stop et à Charme`);
    this.wordCopiedEffectsRange([101], `Rés. à Berserk`);
    this.wordCopiedEffectsRange([221], `Bonus aux dégâts de la limite`);
  }

  private wordCopiedEffectsRange(range: Array<number>, wording: string): boolean {
    const wasRangeFound = this.containsAllElements(range, this.copiedEffectsIds);
    if (wasRangeFound) {
      this.copiedEffects.push(wording);
      this.removeElements(range, this.copiedEffectsIds);
    }
    return wasRangeFound;
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

  protected get effectName(): string {
    return 'AbilityCopyEffectsEffect';
  }
}
