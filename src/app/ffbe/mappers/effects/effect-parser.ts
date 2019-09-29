import {Skill} from '../../model/skill.model';
import {FFBE_CATEGORIES_OBJETS, FFBE_FRENCH_TABLE_INDEX} from '../../ffbe.constants';
import {CategorieObjet} from '../../model/objet/categorie-objet.model';
import {Esper} from '../../model/esper.model';
import {Equipment} from '../../model/equipment/equipment.model';

export abstract class EffectParser {
  public abstract parse(effect: Array<any>, skill: Skill): string;

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '';
  }

  protected wordEffectJoiningIdenticalValues(values: Array<{ name: string, value: number }>,
                                             groupSeparator: string = ', ', keepZeros: boolean = false): string {
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
        if (stat.value !== undefined && (stat.value !== 0 || keepZeros)) {
          currentValue = stat.value;
          accumulatedStats = [stat.name];
        }
      }
    });
    if (currentValue !== undefined && (currentValue !== 0 || keepZeros)) {
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

  protected getElementFromId(elementId: number): string {
    switch (elementId) {
      case 1:
        return 'feu';
      case 2:
        return 'glace';
      case 3:
        return 'foudre';
      case 4:
        return 'eau';
      case 5:
        return 'vent';
      case 6:
        return 'terre';
      case 7:
        return 'lumière';
      case 8:
        return 'ténèbres';
      default:
        return 'UNKNOWN element';
    }
  }

  protected getElementFromEnglishName(element: string): string {
    switch (element) {
      case 'Fire':
        return 'feu';
      case 'Ice':
        return 'glace';
      case 'Lightning':
        return 'foudre';
      case 'Water':
        return 'eau';
      case 'Wind':
        return 'vent';
      case 'Earth':
        return 'terre';
      case 'Light':
        return 'lumière';
      case 'Dark':
        return 'ténèbres';
      default:
        return 'UNKNOWN element';
    }
  }

  protected getElementsFromElementInflict(skill: Skill): string {
    if (skill.element_inflict && skill.element_inflict.length) {
      return skill.element_inflict.map((element: string) => this.getElementFromEnglishName(element)).join(', ');
    }
    return undefined;
  }

  protected getTargetForDamagingSkill(effectId1: number, effectId2: number) {
    if (effectId1 === 1 && effectId2 === 1) {
      return 'à un adversaire';
    }
    if (effectId1 === 2 && effectId2 === 1) {
      return 'aux adversaires';
    }

    return 'UNKNOWN target';
  }

  protected getAttackAndDamageWordingForPhysicalDamages(attack_type: string): string {
    let attackTypeText = 'Dégâts physiques ';
    if (attack_type !== 'Physical') {
      switch (attack_type) {
        case 'Magic':
          attackTypeText = 'Attaque magique à dégâts physiques ';
          break;
        case 'Hybrid':
          attackTypeText = 'Attaque hybride à dégâts physiques ';
          break;
        case 'None':
          attackTypeText = 'Attaque fixe à dégâts physiques ';
          break;
        default:
          attackTypeText = 'Attaque UNKNOWN à dégâts physiques ';
          break;
      }
    }
    return attackTypeText;
  }

  protected getAttackAndDamageWordingForMagicalDamages(attack_type: string): string {
    let attackTypeText = 'Dégâts magiques ';
    if (attack_type !== 'Magic') {
      switch (attack_type) {
        case 'Physical':
          attackTypeText = 'Attaque physique à dégâts magiques ';
          break;
        case 'Hybrid':
          attackTypeText = 'Attaque hybride à dégâts magiques ';
          break;
        case 'None':
          attackTypeText = 'Attaque fixe à dégâts magiques ';
          break;
        default:
          attackTypeText = 'Attaque UNKNOWN à dégâts magiques ';
          break;
      }
    }
    return attackTypeText;
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

  protected getSkillsNamesWithGumiIdentifierLinks(skills: Array<Skill>, separator: string = ', '): string {
    if (!skills || skills.length === 0) {
      return 'UNKNOWN skill list';
    }
    return skills.map((skill: Skill) => this.getSkillNameWithGumiIdentifierLink(skill)).join(separator);
  }

  protected getEquipmentNameWithGumiIdentifierLink(equipment: Equipment): string {
    if (!equipment || !equipment.strings || !equipment.strings.name || !equipment.strings.name[FFBE_FRENCH_TABLE_INDEX]) {
      return 'UNKNOWN equipment';
    }
    return '<a href="ffexvius_objects.php?gumiid=' + equipment.gumi_id + '">' + equipment.strings.name[FFBE_FRENCH_TABLE_INDEX] + '</a>';
  }

  protected getEsperLink(esper: Esper): string {
    if (!esper) {
      return 'UNKNOWN esper';
    }
    return '<a href="ffexvius_espers.php?esperid=' + esper.ffchId + '">' + esper.name + '</a>';
  }
}
