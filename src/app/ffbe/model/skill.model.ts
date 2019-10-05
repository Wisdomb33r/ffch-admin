import {SkillCost} from './skill-cost.model';

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

  // transcient fields
  public isActivatedByPassiveSkill = false;
  public physique = false;
  public magique = false;
  public hybride = false;
  public fixe = false;
  public esper = false;

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
    return skill;
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

  public containsEffectWithDamages(): boolean {
    if (this.effects_raw && this.effects_raw.length) {
      return this.effects_raw.filter(effect => this.isEffectWithDamage(effect)).length > 0;
    }
    return false;
  }

  public isEffectWithDamage(effect: Array<any>): boolean {
    const effectId = effect[2];
    return effect.length >= 4 && (
      effectId === 1 // physical damages
      || effectId === 10 // physical / magic damages with MP drain
      || effectId === 13 // physical damages with 1 turn delay
      || effectId === 15 // magic damages
      || effectId === 21 // physical damages with ignore DEF
      || effectId === 25 // physical / magic damages with HP drain
      || effectId === 40 // hybrid damages
      || effectId === 41 // fixed damages
      || effectId === 42 // physical combos with multiple consecutive attacks
      || effectId === 43 // physical damages with critical strike and chance to miss
      || effectId === 52 // physical damages with 1 turn jump delay
      || effectId === 70 // magic damages with ignore SPR
      || effectId === 72 // magic damages with consecutive damage increase
      || effectId === 81 // physical damages with HP sacrifice
      || effectId === 102 // physical damages scaling on DEF
      || effectId === 103 // magic damages scaling on SPR
      || effectId === 124 // evoker damages
      || effectId === 126 // physical damages with consecutive damage increase
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
      default:
        return 1.0;
    }
  }
}
