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
        return 'rés. Feu';
      case 24:
        return 'rés. Glace';
      case 25:
        return 'rés. Foudre';
      case 26:
        return 'rés. Eau';
      case 27:
        return 'rés. Vent';
      case 28:
        return 'rés. Terre';
      case 29:
        return 'rés. Lumière';
      case 30:
        return 'rés. Ténèbres';
      case 56:
        return 'esquives d\'attaques physiques';
      case 58:
        return 'mitigation magique';
      default:
        return 'UNKNOWN STAT';
    }
  }

  protected getAilmentFromId(ailementId: number): string {
    switch (ailementId) {
      case 1:
        return 'Poison';
      case 2:
        return 'Cécité';
      case 3:
        return 'Sommeil';
      case 4:
        return 'Silence';
      case 5:
        return 'Paralysie';
      case 6:
        return 'Confusion';
      case 7:
        return 'Maladie';
      case 8:
        return 'Pétrification';
      default:
        return 'UNKNOWN ailment';
    }
  }

  protected getElementFromId(elementId: number): string {
    switch (elementId) {
      case 1:
        return 'Feu';
      case 2:
        return 'Glace';
      case 3:
        return 'Foudre';
      case 4:
        return 'Eau';
      case 5:
        return 'Vent';
      case 6:
        return 'Terre';
      case 7:
        return 'Lumière';
      case 8:
        return 'Ténèbres';
      default:
        return 'UNKNOWN element';
    }
  }

  protected getElementFromEnglishName(element: string): string {
    switch (element) {
      case 'Fire':
        return 'Feu';
      case 'Ice':
        return 'Glace';
      case 'Lightning':
        return 'Foudre';
      case 'Water':
        return 'Eau';
      case 'Wind':
        return 'Vent';
      case 'Earth':
        return 'Terre';
      case 'Light':
        return 'Lumière';
      case 'Dark':
        return 'Ténèbres';
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

  protected getMagicTypeFromId(id: number): string {
    switch (id) {
      case 0:
        return '';
      case 1:
        return 'noire';
      case 2:
        return 'blanche';
      case 3:
        return 'verte';
      default:
        return 'UNKNOWN magic type';
    }
  }

  protected getTarget(effectId1: number, effectId2: number): string {
    if (effectId1 === 1 && effectId2 === 1) {
      return 'à un adversaire';
    }
    if (effectId1 === 3 && effectId2 === 1) {
      return 'à un adversaire au hasard';
    }
    if (effectId1 === 2 && effectId2 === 1) {
      return 'aux adversaires';
    }
    if (effectId1 === 1 && effectId2 === 2) {
      return 'à un allié';
    }
    if (effectId1 === 1 && effectId2 === 5) {
      return 'à un allié sauf le lanceur';
    }
    if (effectId1 === 3 && effectId2 === 2) {
      return 'à un allié au hasard';
    }
    if (effectId1 === 1 && effectId2 === 6) {
      return 'à une cible';
    }
    if (effectId1 === 2 && effectId2 === 6) {
      return 'au groupe d\'une cible';
    }
    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3) {
      return 'au lanceur';
    }
    if (effectId1 === 2 && effectId2 === 2) {
      return 'aux alliés';
    }
    if (effectId1 === 2 && effectId2 === 5) {
      return 'aux alliés sauf le lanceur';
    }

    return 'UNKNOWN target';
  }

  protected getHealingText(mod: number): string {
    return mod > 0 ? '+ ' + mod / 200 + 'x la PSY + ' + (mod / 1000) + 'x la MAG du lanceur ' : '';
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

  protected getAttackAndDamageWordingForFixedDamages(attack_type: string): string {
    let attackTypeText = 'Dégâts fixes ';
    if (attack_type !== 'None') {
      switch (attack_type) {
        case 'Physical':
          attackTypeText = 'Attaque physique à dégâts fixes ';
          break;
        case 'Hybrid':
          attackTypeText = 'Attaque hybride à dégâts fixes ';
          break;
        case 'Magic':
          attackTypeText = 'Attaque magique à dégâts fixes ';
          break;
        default:
          attackTypeText = 'Attaque UNKNOWN à dégâts fixes ';
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

  protected fillSkillWithTransitiveActivatedSkillInformation(skill: Skill, activatedSKill: Skill) {
    skill.gumiIdActivatedSkill = activatedSKill.gumi_id;
    skill.attack_count = activatedSKill.attack_count;
    skill.attack_frames = activatedSKill.attack_frames;
    skill.attack_damage = activatedSKill.attack_damage;
    skill.attack_type = activatedSKill.attack_type;
    skill.physique = activatedSKill.physique;
    skill.magique = activatedSKill.magique;
    skill.hybride = activatedSKill.hybride;
    skill.fixe = activatedSKill.fixe;
    skill.esper = activatedSKill.esper;
    skill.type = activatedSKill.type;
    skill.rarity = activatedSKill.rarity;
    skill.active = activatedSKill.active;
    skill.magic_type = activatedSKill.magic_type;
    skill.cost = activatedSKill.cost;
    skill.element_inflict = activatedSKill.element_inflict;
    skill.effects_raw = activatedSKill.effects_raw;
  }
}
