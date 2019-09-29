import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveEquipmentStatsDualwieldIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveEquipmentStatsDualwieldIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const stat = this.getStatNameFromId(effect[3][0]);
    return '+' + effect[3][1] + '% à ' + (effect[3][0] === 1 ? 'l\'' : 'la ') + stat
      + ' de l\'équipement si l\'unité porte deux armes (TDW)';
  }
}
