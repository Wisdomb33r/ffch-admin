import {Skill} from '../../../skill.model';
import {AbilityDamageStatScalingEffect} from './ability-damage-stat-scaling-effect.model';

export class AbilityDamageMagicSprScalingEffect extends AbilityDamageStatScalingEffect {

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForMagicalDamages();
    skill.magique = true;
    const target = this.wordTarget();
    return `${attackType} ${elements} calculés sur la PSY de puissance ${this.power}% ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamageMagicSprScalingEffect';
  }
}
