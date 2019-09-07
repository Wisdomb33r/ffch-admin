import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FFBE_CATEGORIES_OBJETS} from '../../../ffbe.constants';
import {CategorieObjet} from '../../../model/objet/categorie-objet.model';

export class PassiveEquipmentCategoryUnlockParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet EquipmentCategoryUnlockParser inconnu: Mauvaise liste de paramètres';
    }

    const categorie = FFBE_CATEGORIES_OBJETS.find((categ: CategorieObjet) => categ.gumiId === +effect[3]);

    return 'Permet d\'équiper les ' + (categorie ? categorie.name : 'UNKNOWN');
  }
}
