import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveElementsAbsorbParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet PassiveElementsAbsorbParser inconnu: Mauvaise liste de paramètres';
    }
    const increases: Array<{ name: string, value: number }> = this.getKeyValueTableForElements(effect[3]);
    return 'Absorbe les dégâts d\'élément ' + increases.filter(elem => elem.value === 1).map(elem => elem.name).join(' ou ');
  }
}
