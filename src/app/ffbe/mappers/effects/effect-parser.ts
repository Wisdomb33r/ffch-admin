import {Skill} from '../../model/skill.model';
import {FFBE_CATEGORIES_OBJETS, FFBE_FRENCH_TABLE_INDEX} from '../../ffbe.constants';
import {CategorieObjet} from '../../model/objet/categorie-objet.model';
import {Esper} from '../../model/esper.model';

export abstract class EffectParser {
  public abstract parse(effect: Array<any>, skill: Skill): string;

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '';
  }

  protected wordEffectJoiningIdenticalValues(values: Array<{ name: string, value: number }>, groupSeparator: string = ', '): string {
    const decreasingSort = values.some(element => {
      return element.value > 0;
    });
    values.sort((a, b) => {
      return a.value === b.value ? 0 : (decreasingSort ? (a.value > b.value ? -1 : 1) : (a.value > b.value ? 1 : -1));
    });
    let text = '';
    let currentValue: number;
    let accumulatedStats = [];
    values.forEach(stat => {
      if (currentValue === stat.value) {
        accumulatedStats.push(stat.name);
      } else {
        if (currentValue && accumulatedStats) {
          text += (text.length ? groupSeparator : '') + this.wordEffectForIdenticalValues(currentValue, accumulatedStats);
          currentValue = undefined;
          accumulatedStats = [];
        }
        if (stat.value !== undefined && stat.value !== 0) {
          currentValue = stat.value;
          accumulatedStats = [stat.name];
        }
      }
    });
    if (currentValue !== undefined && currentValue !== 0) {
      text += (text.length ? groupSeparator : '') + this.wordEffectForIdenticalValues(currentValue, accumulatedStats);
    }
    return text;
  }

  protected getStatNameFromId(stat: number): string {
    switch (stat) {
      case 1:
        return 'ATT';
      case 2:
        return 'DÉF';
      case 3:
        return 'MAG';
      case 4:
        return 'PSY';
      case 5:
        return 'PV';
      case 6:
        return 'PM';
      case 20:
        return 'PV par tour';
      case 22:
        return 'PM par tour';
      case 23:
        return 'rés. au feu';
      case 24:
        return 'rés. à la glace';
      case 25:
        return 'rés. à la foudre';
      case 26:
        return 'rés. à l\'eau';
      case 27:
        return 'rés. au vent';
      case 28:
        return 'rés. à la terre';
      case 29:
        return 'rés. à la lumière';
      case 30:
        return 'rés. aux ténèbres';
      case 56:
        return 'esquives d\'attaques physiques';
      case 58:
        return 'mitigation magique';
      default:
        return 'UNKNOWN STAT';
    }
  }

  protected getEquipmentCategoryNameWithLink(equipmentId: number): string {
    const categorie = FFBE_CATEGORIES_OBJETS.find((categ: CategorieObjet) => categ.gumiId === +equipmentId);
    return categorie ? '<a href="ffexvius_objects.php?categid=' + categorie.ffchId + '">' + categorie.name + '</a>' : 'UNKNOWN';
  }

  protected getEquipmentCategoryTypeWithLink(equipmentId: number): string {
    const categorie = FFBE_CATEGORIES_OBJETS.find((categ: CategorieObjet) => categ.gumiId === +equipmentId);
    return categorie ? '<a href="ffexvius_objects.php?categid=' + categorie.ffchId + '">' + categorie.type + '</a>' : 'UNKNOWN';
  }

  protected isEquipmentCategoryFeminine(equipmentId: number): boolean {
    return equipmentId === 1 || equipmentId === 2 || equipmentId === 3 || equipmentId === 8 || equipmentId === 10
      || equipmentId === 11 || equipmentId === 13 || equipmentId === 15 || equipmentId === 16 || equipmentId === 51
      || equipmentId === 52 || equipmentId === 53;
  }

  protected getSkillNameWithGumiIdentifierLink(skill: Skill): string {
    if (!skill || !skill.names || !skill.names[FFBE_FRENCH_TABLE_INDEX]) {
      return 'UNKNOWN skill';
    }
    return '<a href="ffexvius_skills.php?gumiid=' + skill.gumi_id + '">' + skill.names[FFBE_FRENCH_TABLE_INDEX] + '</a>';
  }

  protected getEsperLink(esper: Esper): string {
    if (!esper) {
      return 'UNKNOWN esper';
    }
    return '<a href="ffexvius_espers.php?esperid=' + esper.ffchId + '">' + esper.name + '</a>';
  }
}
