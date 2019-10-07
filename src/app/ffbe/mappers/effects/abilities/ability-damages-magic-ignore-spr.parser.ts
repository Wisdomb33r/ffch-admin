import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesMagicIgnoreSprParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][0] !== 0 || effect[3][1] !== 0) {
      return 'Effet AbilityDamagesMagicIgnoreSprParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForMagicalDamages(skill.attack_type);
    skill.magique = true;
    const puissance = effect[3][2];
    const ignoreSpr = effect[3][3];
    const total = puissance * 100 / (100 - ignoreSpr);
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ')
      + 'de puissance ' + Math.round(puissance) + '% (ignore ' + Math.abs(ignoreSpr) + '% PSY, ' + Math.round(total) + '% total) ' + target
      + ' (ignore les reflets)';
  }
}
