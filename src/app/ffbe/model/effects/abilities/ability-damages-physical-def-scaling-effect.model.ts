import {Skill} from '../../skill.model';
import {AbilityDamagesStatScalingEffect} from './ability-damages-stat-scaling-effect.model';

export class AbilityDamagesPhysicalDefScalingEffect extends AbilityDamagesStatScalingEffect {

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    return `${attackType} ${elements} calculés sur la DÉF de puissance ${this.power}% ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesPhysicalDefScalingEffect';
  }
}
