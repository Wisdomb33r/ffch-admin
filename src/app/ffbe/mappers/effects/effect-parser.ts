import {Skill} from '../../model/skill.model';
import {FFBE_CATEGORIES_OBJETS, FFBE_ELEMENTS, FFBE_FRENCH_TABLE_INDEX} from '../../ffbe.constants';
import {CategorieObjet} from '../../model/objet/categorie-objet.model';
import {Esper} from '../../model/esper.model';
import {Equipment} from '../../model/equipment/equipment.model';
import {Consumable} from '../../model/consumable.model';
import {Element} from '../../model/element.model';
import {TargetPrepositionEnum} from '../../model/effects/target-preposition.enum';
import {SkillEffect} from '../../model/effects/skill-effect.model';
import {EffectIdenticalValuesWording} from '../../model/effects/effect-identical-values-wording';

export abstract class EffectParser extends EffectIdenticalValuesWording {
  public abstract parse(effect: Array<any>, skill: Skill): string;

  public static getStatNameFromId(stat: number): string {
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
      case 9:
        return 'rés. magique';
      case 12:
        return 'rés. Poison';
      case 13:
        return 'rés. Cécité';
      case 14:
        return 'rés. Sommeil';
      case 15:
        return 'rés. Silence';
      case 16:
        return 'rés. Paralysie';
      case 17:
        return 'rés. Confusion';
      case 18:
        return 'rés. Maladie';
      case 19:
        return 'rés. Pétrification';
      case 20:
        return 'PV chaque tour';
      case 21:
        return 'auréole';
      case 22:
        return 'PM chaque tour';
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
      case 47:
        return 'vitesse de la jauge de limite';
      case 56:
        return 'esquives d\'attaques physiques';
      case 57:
        return 'mitigation physique';
      case 58:
        return 'mitigation magique';
      case 60:
        return 'renvoi des magies';
      case 63:
        return 'dégâts physiques aux bêtes';
      case 64:
        return 'dégâts physiques aux oiseaux';
      case 65:
        return 'dégâts physiques aux aquatiques';
      case 66:
        return 'dégâts physiques aux démons';
      case 67:
        return 'dégâts physiques aux humains';
      case 68:
        return 'dégâts physiques aux machines';
      case 69:
        return 'dégâts physiques aux dragons';
      case 70:
        return 'dégâts physiques aux esprits';
      case 71:
        return 'dégâts physiques aux insectes';
      case 72:
        return 'dégâts physiques aux pierres';
      case 73:
        return 'dégâts physiques aux plantes';
      case 74:
        return 'dégâts physiques aux morts-vivants';
      case 75:
        return 'dégâts magiques aux bêtes';
      case 76:
        return 'dégâts magiques aux oiseaux';
      case 77:
        return 'dégâts magiques aux aquatiques';
      case 78:
        return 'dégâts magiques aux démons';
      case 79:
        return 'dégâts magiques aux humains';
      case 80:
        return 'dégâts magiques aux machines';
      case 81:
        return 'dégâts magiques aux dragons';
      case 82:
        return 'dégâts magiques aux esprits';
      case 83:
        return 'dégâts magiques aux insectes';
      case 84:
        return 'dégâts magiques aux pierres';
      case 85:
        return 'dégâts magiques aux plantes';
      case 86:
        return 'dégâts magiques aux morts-vivants';
      case 87:
        return 'imprégnation Feu';
      case 88:
        return 'imprégnation Glace';
      case 89:
        return 'imprégnation Foudre';
      case 90:
        return 'imprégnation Eau';
      case 91:
        return 'imprégnation Vent';
      case 92:
        return 'imprégnation Terre';
      case 93:
        return 'imprégnation Lumière';
      case 94:
        return 'imprégnation Ténèbres';
      case 95:
        return 'rés. aux baisses d\'ATT';
      case 96:
        return 'rés. aux baisses de DÉF';
      case 97:
        return 'rés. aux baisses de MAGIE';
      case 98:
        return 'rés. aux baisses de PSY';
      case 99:
        return 'rés. à Stop';
      case 100:
        return 'rés. à Charme';
      case 101:
        return 'rés. à Berserk';
      case 204:
        return 'mitigation générale';
      case 221:
        return 'dégâts de la limite';
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
    const element: Element = FFBE_ELEMENTS.find(e => e.id === elementId);
    return element ? element.nom : 'UNKNOWN element';
  }

  protected getElementFromEnglishName(elementEnglishString: string): string {
    const element: Element = FFBE_ELEMENTS.find(e => e.name === elementEnglishString);
    return element ? element.nom : 'UNKNOWN element';
  }

  protected getMagicTypeFromId(id: number): string {
    switch (id) {
      case 0:
        return '';
      case 1:
        return 'noire ';
      case 2:
        return 'blanche ';
      case 3:
        return 'verte ';
      default:
        return 'UNKNOWN magic type ';
    }
  }

  protected getGenreFromId(id: number): string {
    switch (id) {
      case 1:
        return 'masculin';
      case 2:
        return 'féminin';
      default:
        return 'UNKNOWN genre';
    }
  }

  protected getKeyValueTableForAilements(effectParameters): Array<{ name: string, value: number }> {
    return [
      {name: 'Poison', value: effectParameters[0]},
      {name: 'Cécité', value: effectParameters[1]},
      {name: 'Sommeil', value: effectParameters[2]},
      {name: 'Silence', value: effectParameters[3]},
      {name: 'Paralysie', value: effectParameters[4]},
      {name: 'Confusion', value: effectParameters[5]},
      {name: 'Maladie', value: effectParameters[6]},
      {name: 'Pétrification', value: effectParameters[7]},
    ];
  }

  protected getTarget(effectId1: number, effectId2: number, preposition: TargetPrepositionEnum = TargetPrepositionEnum.A): string {

    if (effectId1 === 1 && effectId2 === 1) {
      return SkillEffect.getTargetEnemyText(preposition);
    }
    if (effectId1 === 3 && effectId2 === 1) {
      return SkillEffect.getTargetRandomEnemyText(preposition);
    }
    if (effectId1 === 2 && effectId2 === 1) {
      return SkillEffect.getTargetEnemiesText(preposition);
    }
    if (effectId1 === 1 && effectId2 === 2) {
      return SkillEffect.getTargetAllyText(preposition);
    }
    if (effectId1 === 1 && effectId2 === 5) {
      return SkillEffect.getTargetAllyButCasterText(preposition);
    }
    if (effectId1 === 3 && effectId2 === 2) {
      return SkillEffect.getTargetRandomAllyText(preposition);
    }
    if (effectId1 === 1 && effectId2 === 6) {
      return SkillEffect.getTargetAnyTargetText(preposition);
    }
    if (effectId1 === 2 && effectId2 === 6) {
      return SkillEffect.getTargetAnyGroupText(preposition);
    }
    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3) {
      return SkillEffect.getTargetCasterText(preposition);
    }
    if (effectId1 === 2 && effectId2 === 2) {
      return SkillEffect.getTargetAlliesText(preposition);
    }
    if (effectId1 === 2 && effectId2 === 5) {
      return SkillEffect.getTargetAlliesButCasterText(preposition);
    }
    if (effectId1 === 2 && effectId2 === 4) {
      return SkillEffect.getTargetAlliesAndEnemiesText(preposition);
    }

    return 'UNKNOWN target';
  }

  protected getHealingText(mod: number): string {
    return mod > 0 ? `+ ${mod / 200}x la PSY + ${(mod / 1000)}x la MAG du lanceur ` : '';
  }

  protected getEquipmentCategoryNameWithLink(equipmentId: number): string {
    const categorie = FFBE_CATEGORIES_OBJETS.find((categ: CategorieObjet) => categ.gumiId === +equipmentId);
    return categorie ? `<a href="ffexvius_objects.php?categid=${categorie.ffchId}">${categorie.name}</a>` : 'UNKNOWN';
  }

  protected getEquipmentCategoryTypeWithLink(equipmentId: number): string {
    const categorie = FFBE_CATEGORIES_OBJETS.find((categ: CategorieObjet) => categ.gumiId === +equipmentId);
    return categorie ? `<a href="ffexvius_objects.php?categid=${categorie.ffchId}">${categorie.type}</a>` : 'UNKNOWN';
  }

  protected isEquipmentCategoryFeminine(equipmentId: number): boolean {
    return equipmentId === 1 || equipmentId === 2 || equipmentId === 3 || equipmentId === 8 || equipmentId === 10
      || equipmentId === 11 || equipmentId === 13 || equipmentId === 15 || equipmentId === 16 || equipmentId === 51
      || equipmentId === 52 || equipmentId === 53;
  }

  public static getSkillNameWithGumiIdentifierLink(skill: Skill): string {
    if (!skill || !skill.names || !skill.names[FFBE_FRENCH_TABLE_INDEX]) {
      return 'UNKNOWN skill';
    }
    return `<a href="ffexvius_skills.php?gumiid=${skill.gumi_id}">${skill.names[FFBE_FRENCH_TABLE_INDEX]}</a>`;
  }

  public static getSkillsNamesWithGumiIdentifierLinks(skills: Array<Skill>, separator = ', '): string {
    if (!skills || skills.length === 0) {
      return 'UNKNOWN skill list';
    }
    return skills.map((skill: Skill) => EffectParser.getSkillNameWithGumiIdentifierLink(skill)).join(separator);
  }

  protected getConsumableNameWithGumiIdentifierLink(consumable: Consumable): string {
    if (!consumable || !consumable.strings || !consumable.strings.names || !consumable.strings.names[FFBE_FRENCH_TABLE_INDEX]) {
      return 'UNKNOWN consumable';
    }
    return `<a href="ffexvius_objects.php?gumiid=${consumable.gumi_id}">${consumable.strings.names[FFBE_FRENCH_TABLE_INDEX]}</a>`;
  }

  protected getConsumablesNamesWithGumiIdentifierLink(consumables: Array<Consumable>, separator = ', '): string {
    if (!consumables || consumables.length === 0) {
      return 'UNKNOWN consumables list';
    }
    return consumables.map((consumable: Consumable) => this.getConsumableNameWithGumiIdentifierLink(consumable)).join(separator);
  }

  protected getEquipmentNameWithGumiIdentifierLink(equipment: Equipment): string {
    if (!equipment || !equipment.strings || !equipment.strings.name || !equipment.strings.name[FFBE_FRENCH_TABLE_INDEX]) {
      return 'UNKNOWN equipment';
    }
    return `<a href="ffexvius_objects.php?gumiid=${equipment.gumi_id}">${equipment.strings.name[FFBE_FRENCH_TABLE_INDEX]}</a>`;
  }

  protected getEsperLink(esper: Esper): string {
    if (!esper) {
      return 'UNKNOWN esper';
    }
    return `<a href="ffexvius_espers.php?esperid=${esper.ffchId}">${esper.name}</a>`;
  }

  public static fillSkillWithTransitiveActivatedSkillInformation(skill: Skill, activatedSKill: Skill) {
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
