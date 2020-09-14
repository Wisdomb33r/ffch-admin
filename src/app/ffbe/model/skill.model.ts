import {SkillCost} from './skill-cost.model';
import {SkillEffect} from './effects/skill-effect.model';
import {Element} from './element.model';
import {FFBE_ELEMENTS} from '../ffbe.constants';
import {AbilitySkillEffectFactory} from './effects/ability-skill-effect.factory';
import {Caracteristiques} from './caracteristiques.model';
import {PassiveSkillEffectFactory} from './effects/passive-skill-effect.factory';

export class Skill {
  public gumi_id: number;
  public name: string;
  public type: string;
  public rarity: number;
  public active: boolean;
  public magic_type: string;
  public cost: SkillCost;
  public attack_count: Array<number>;
  public attack_damage: Array<Array<number>>;
  public attack_frames: Array<Array<number>>;
  public attack_type: string;
  public element_inflict: Array<string>;
  public effects: Array<string>;
  public effects_raw: Array<any>;
  public icon: string;
  public names: Array<string>;
  public descriptions: Array<string>;
  public requirements: Array<Array<string>>;

  // transcient fields
  public gumiIdActivatedSkill;
  public isActivatedByPassiveSkill = false;
  public physique = false;
  public magique = false;
  public hybride = false;
  public fixe = false;
  public esper = false;
  public effets: Array<SkillEffect> = [];

  public static produce(s: Skill): Skill {
    const skill: Skill = new Skill();
    skill.gumi_id = s.gumi_id;
    skill.name = s.name;
    skill.type = s.type;
    skill.rarity = s.rarity;
    skill.active = s.active;
    skill.magic_type = s.magic_type;
    skill.cost = s.cost;
    skill.attack_count = s.attack_count;
    skill.attack_damage = s.attack_damage;
    skill.attack_frames = s.attack_frames;
    skill.attack_type = s.attack_type;
    skill.element_inflict = s.element_inflict;
    skill.effects = s.effects;
    skill.effects_raw = s.effects_raw;
    skill.icon = s.icon;
    skill.names = s.names;
    skill.descriptions = s.descriptions;
    skill.requirements = s.requirements;
    skill.effets = s.effects_raw?.map(raw => s.active ? AbilitySkillEffectFactory.getSkillEffect(raw) : PassiveSkillEffectFactory.getSkillEffect(raw)).filter(effect => !!effect);
    return skill;
  }

  public calculateSkillPower(): number {
    const calculatedSkillPower = this.effets?.map(effet => effet.getDamagesPower()).reduce((val1: number, val2: number) => val1 + val2, 0);
    return calculatedSkillPower > 0 ? calculatedSkillPower : null;
  }

  public calculateTotalModIncrease(modIncrease: number): number {
    if (this.effects && this.effects.length) {
      return this.effects_raw
        .filter(effect => this.isEffectWithDamage(effect))
        .map(effect => modIncrease * this.calculateModIncreaseForEffect(effect))
        .reduce((val1: number, val2: number) => val1 + val2, 0);
    }
    return 0;
  }

  public calculateHealingTotalModIncrease(modIncrease: number): number {
    if (this.effects && this.effects.length) {
      return this.effects_raw
        .filter(effect => this.isEffectWithHealing(effect))
        .map(effect => modIncrease * this.calculateHealingModIncreaseForEffect(effect))
        .reduce((val1: number, val2: number) => val1 + val2, 0);
    }
    return 0;
  }

  public calculateBaseIncreasesPercent(): Caracteristiques {
    return Caracteristiques.computeSum(this.effets.map(effet => effet.getBaseIncreasesPercent()));
  }

  public calculateDualwieldIncreasesPercent(): Caracteristiques {
    return Caracteristiques.computeSum(this.effets.map(effet => effet.getDualwieldIncreasesPercent()));
  }

  public wordElementInflict(): string {
    if (this.element_inflict && this.element_inflict.length) {
      const elements = this.element_inflict.map((elementEnglishString: string) => {
        const element: Element = FFBE_ELEMENTS.find(e => e.name === elementEnglishString);
        return element ? element.nom : 'UNKNOWN element';
      }).join(', ');
      if (elements.startsWith('Eau')) {
        return `d'${elements}`;
      } else {
        return `de ${elements}`;
      }
    }
    return 'neutres';
  }

  public wordAttackAndDamageForPhysicalDamages(): string {
    if (this.attack_type !== 'Physical') {
      switch (this.attack_type) {
        case 'Magic':
          return 'Attaque magique à dégâts physiques';
        case 'Hybrid':
          return 'Attaque hybride à dégâts physiques';
        case 'None':
          return 'Attaque fixe à dégâts physiques';
        default:
          return 'Attaque UNKNOWN à dégâts physiques';
      }
    }
    return 'Dégâts physiques';
  }

  public wordAttackAndDamageForMagicalDamages(): string {
    if (this.attack_type !== 'Magic') {
      switch (this.attack_type) {
        case 'Physical':
          return 'Attaque physique à dégâts magiques';
        case 'Hybrid':
          return 'Attaque hybride à dégâts magiques';
        case 'None':
          return 'Attaque fixe à dégâts magiques';
        default:
          return 'Attaque UNKNOWN à dégâts magiques';
      }
    }
    return 'Dégâts magiques';
  }

  public wordAttackAndDamageForHybridDamages(): string {
    if (this.attack_type !== 'Hybrid') {
      switch (this.attack_type) {
        case 'Physical':
          return 'Attaque physique à dégâts hybrides';
        case 'Magic':
          return 'Attaque magique à dégâts hybrides';
        case 'None':
          return 'Attaque fixe à dégâts hybrides';
        default:
          return 'Attaque UNKNOWN à dégâts hybrides';
      }
    }
    return 'Dégâts hybrides';
  }

  public wordAttackAndDamageForFixedDamages(): string {
    if (this.attack_type !== 'None') {
      switch (this.attack_type) {
        case 'Physical':
          return 'Attaque physique à dégâts fixes';
        case 'Hybrid':
          return 'Attaque hybride à dégâts fixes';
        case 'Magic':
          return 'Attaque magique à dégâts fixes';
        default:
          return 'Attaque UNKNOWN à dégâts fixes';
      }
    }
    return 'Dégâts fixes';
  }

  public wordAttackAndDamageForEvokerDamages(): string {
    if (this.attack_type !== 'None') {
      return `Attaque UNKNOWN à dégâts d'invocateur`;
    }
    return `Attaque fixe à dégâts d'invocateur`;
  }

  public containsEffectWithDamages(): boolean {
    if (this.effects_raw && this.effects_raw.length) {
      return this.effects_raw.filter(effect => this.isEffectWithDamage(effect)).length > 0;
    }
    return false;
  }

  public isEffectWithDamage(effect: Array<any>): boolean {
    if (!this.active) {
      return false;
    }
    const effectId = effect[2];
    return effect.length >= 4 && (
      effectId === 1 // physical damages
      || (effectId === 9 && effect[1] !== 3) // HP % damages, excepting to caster
      || effectId === 10 // physical / magic damages with MP drain
      || effectId === 13 // physical damages with 1 turn delay
      || effectId === 15 // magic damages
      || effectId === 21 // physical damages with ignore DEF
      || effectId === 25 // physical / magic damages with HP drain
      || effectId === 40 // hybrid damages
      || (effectId === 41 && effect[1] !== 3) // fixed damages, excepting to caster
      || effectId === 42 // physical combos with multiple consecutive attacks
      || effectId === 43 // physical damages with critical strike and chance to miss
      || effectId === 52 // physical damages with 1 turn jump delay
      || effectId === 70 // magic damages with ignore SPR
      || effectId === 72 // magic damages with consecutive damage increase
      || effectId === 81 // physical damages with HP sacrifice
      || effectId === 102 // physical damages scaling on DEF
      || effectId === 112 // death physical damages
      || effectId === 103 // magic damages scaling on SPR
      || effectId === 124 // evoker damages
      || effectId === 126 // physical damages with consecutive damage increase
      || effectId === 134 // physical damages with 1 turn timed jump delay
      || effectId === 139 // physical / magic DOT's
    );
  }

  public isEffectWithHealing(effect: Array<any>): boolean {
    const effectId = effect[2];
    return effect.length >= 4 && (
      effectId === 2 // HP healing
      || effectId === 8 // HP healing split over turns
      || effectId === 16 // fixed HP healing
      || effectId === 17 // fixed MP healing
      || effectId === 26 // HP% healing
      || effectId === 30 // MP healing split over turns
      || effectId === 56 // HP healing split over turns while singing
      || effectId === 57 // MP healing split over turns while singing
      || effectId === 64 // HP% and MP% healing
      || effectId === 65 // fixed HP and MP healing
    );
  }

  private calculateModIncreaseForEffect(effect): number {
    const effectId = effect[2];
    switch (effectId) {
      case 21:
        // physical damages with ignore DEF
        return 100 / (100 + effect[3][3]);
      case 70:
        // magical damages with ignore SPR
        return 100 / (100 - effect[3][3]);
      case 42:
        // physical combos with multiple consecutive attacks
        return (effect[3][2] + effect[3][3]) / 2.0;
      case 9:
        // HP % damages
        return 0.0;
      default:
        return 1.0;
    }
  }

  private calculateHealingModIncreaseForEffect(effect): number {
    const effectId = effect[2];
    if (effectId === 2 // HP healing
      || effectId === 8 // HP healing split over turns
      || effectId === 30 // MP healing split over turns
      || effectId === 56 // HP healing split over turns while singing
      || effectId === 57 // MP healing split over turns while singing
    ) {
      return 1.0;
    } else {
      return 0.0;
    }
  }

  public hasEquipmentRequirements(): boolean {
    return Array.isArray(this.requirements) && this.requirements.length > 0 &&
      this.requirements.some(requirement => Array.isArray(requirement) && requirement.length > 0 && requirement[0] === 'EQUIP');
  }
}
