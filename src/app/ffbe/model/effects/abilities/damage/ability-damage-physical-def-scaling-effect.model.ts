import {Skill} from '../../../skill.model';
import {AbilityDamageStatScalingEffect} from './ability-damage-stat-scaling-effect.model';

export class AbilityDamagePhysicalDefScalingEffect extends AbilityDamageStatScalingEffect {

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    return `${attackType} ${elements} calculés sur la DÉF de puissance ${this.power}% ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalDefScalingEffect';
  }
}
