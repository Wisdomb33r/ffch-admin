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
  public effects: Array<string>;
  public effects_raw: Array<any>;
  public icon: string;
  public names: Array<string>;
  public descriptions: Array<string>;

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

  private isEffectWithDamage(effect: Array<any>) {
    const effectId = effect[2];
    return effect.length >= 4 && (
      effectId === 1 || effectId === 10 || effectId === 13 || effectId === 15 || effectId === 21 || effectId === 25 || effectId === 42
      || effectId === 52 || effectId === 72 || effectId === 81
    );
  }

  private calculateModIncreaseForEffect(effect): number {
    const effectId = effect[2];
    switch (effectId) {
      case 21:
        // ignore stat
        return 100 / (100 - effect[3][3]);
      case 42:
        // physical combos with multiple consecutive attacks
        return (effect[3][2] + effect[3][3]) / 2.0;
      default:
        return 1;
    }
  }
}
