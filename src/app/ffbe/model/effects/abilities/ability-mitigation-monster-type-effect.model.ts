import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';

export class AbilityMitigationMonsterTypeEffect extends SkillEffect {

  private damageDecrease: number;
  private monsterTypeId: number;
  private turns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 9 || parameters[1] !== -1 || parameters[2] !== -1 || parameters[3] !== -1
      || parameters[4] !== -1 || parameters[5] !== -1 || parameters[6] !== 0 || parameters[8] !== 1
      || !Array.isArray(parameters[0]) || parameters[0].length !== 2) {
      this.parameterError = true;
    } else {
      this.monsterTypeId = parameters[0][0];
      this.damageDecrease = parameters[0][1];
      this.turns = parameters[7];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const target = `${this.wordTarget()}`;
    const turnsText = `pour ${this.turns} tour${this.turns > 1 ? 's' : ''}`;
    const damageType = this.effectId === 149 ? 'physique' : 'magique';
    const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === this.monsterTypeId);
    const damageDecreaseText = `+${this.damageDecrease}% de mitigation ${damageType} contre les ${monsterType.pluralName}`;
    return `${damageDecreaseText} ${target} ${turnsText}`;
  }

  protected get effectName(): string {
    return 'AbilityMonsterTypeDamageDecreaseEffect';
  }
}
