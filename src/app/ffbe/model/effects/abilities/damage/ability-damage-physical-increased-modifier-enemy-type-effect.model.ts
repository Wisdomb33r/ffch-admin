import {SkillEffect} from '../../skill-effect.model';
import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {FFBE_MONSTER_TYPES} from '../../../../ffbe.constants';

export class AbilityDamagePhysicalIncreasedModifierEnemyTypeEffect extends SkillEffect {

  protected monsterTypeGumiId: number;
  protected power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[1] !== 0 || parameters[2] !== 0) {
      this.parameterError = true;
    } else {
      this.monsterTypeGumiId = parameters[0];
      this.power = parameters[3];
    }
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalIncreasedModifierEnemyTypeEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    skill.physique = true;
    const target = this.wordTarget();

    const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === this.monsterTypeGumiId);
    const monsterName = monsterType ? monsterType.pluralName : 'UNKNOWN';

    return `${attackType} ${elements} de puissance 100% (${this.power}% sur les ${monsterName}) ${target}`;
  }

  public getDamagesPower(): number {
    return this.power;
  }

}
