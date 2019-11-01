import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesOrDeathParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || skill.attack_type !== 'Physical') {
      return 'Effet AbilityDamagesOrDeathParser inconnu: Mauvaise liste de paramètres';
    }

    const mod = effect[3][0];
    const deathChance = effect[3][1];
    const dmgChance = effect[3][2];
    const ignoreDef = Math.abs(effect[3][3] ? effect[3][3] : 0);
    const target = this.getTarget(effect[0], effect[1]);
    const elements = this.getElementsFromElementInflict(skill);
    skill.physique = true;

    let dmgChanceText = '';
    if (dmgChance < 100) {
      dmgChanceText = `${dmgChance}% de chance d'infliger `;
    }

    let powerText = `de puissance ${mod}%`;
    if (ignoreDef > 0) {
      const totalMod = mod * 100 / (100 - ignoreDef);
      powerText += ` (ignore ${ignoreDef}% DÉF, ${totalMod}% total)`;
    }

    return `Inflige Mort (${deathChance}%) ou ${dmgChanceText}des dégâts physiques ${elements} ${powerText} ${target}`;
  }
}
