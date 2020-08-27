import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class AbilityMitigationMonsterTypeEffect extends SkillEffect {

  private damageDecreases: Array<{ name: string, value: number }> = [];
  private turns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 9 || parameters[6] !== 0 || parameters[8] !== 1
      || !Array.isArray(parameters[0]) || parameters[0].length !== 2) {
      this.parameterError = true;
    } else {
      for (let i = 0; i < 6; i++) {
        if (parameters[i] !== -1 && Array.isArray(parameters[i]) && parameters[i].length === 2) {
          const monsterName = FFBE_MONSTER_TYPES.find(type => type.gumiId === parameters[i][0]).pluralName;
          this.damageDecreases.push({name: monsterName, value: parameters[i][1]});
        }
      }
      this.turns = parameters[7];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    return this.wordEffectJoiningIdenticalValues(this.damageDecreases, '<br />');
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const target = `${this.wordTarget()}`;
    const turnsText = `pour ${this.turns} tour${this.turns > 1 ? 's' : ''}`;
    const damageTypeText = this.effectId === 153 ? 'physique' : 'magique';
    const monsterTypesText = FfbeUtils.replaceLastOccurenceInString(accumulatedStats.join(', '), ', ', ' et ');
    const damageDecreaseText = `+${currentValue}% de mitigation ${damageTypeText} contre les ${monsterTypesText}`;
    return `${damageDecreaseText} ${target} ${turnsText}`;
  }

  protected get effectName(): string {
    return 'AbilityMitigationMonsterTypeEffect';
  }
}
