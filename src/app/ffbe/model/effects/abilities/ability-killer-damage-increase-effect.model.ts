import {Skill} from '../../skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {FfbeUtils} from '../../../utils/ffbe-utils';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityKillerDamageIncreaseEffect extends SkillEffect {

  private numTurns: number;
  private rawKillers: Array<number>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 10
      || !Array.isArray(parameters[0]) || parameters[0].length < 2) {
      this.parameterError = true;
    } else {
      this.numTurns = parameters[8];
      this.rawKillers = parameters.slice(0, 8);
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const increases = [];

    this.rawKillers.forEach(rawKiller => {
      if (Array.isArray(rawKiller) && rawKiller.length >= 2) {
        const monsterTypeGumiId = rawKiller[0];
        const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === monsterTypeGumiId);
        const monsterName = monsterType ? monsterType.pluralName : 'UNKNOWN';
        const increase = rawKiller[1];

        increases.push({name: monsterName, value: increase});
      }
    });

    return this.wordEffectJoiningIdenticalValues(increases, HTML_LINE_RETURN);
  }

  private getDamageType(effectId: number): string {
    let damageType = ' UNKNOWN';

    if (effectId === 92) {
      damageType = 'physiques';
    } else if (effectId === 93) {
      damageType = 'magiques';
    }

    return damageType;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const monsterArray = accumulatedStats.map(monster => 'les ' + monster);
    const monsters = FfbeUtils.replaceLastOccurenceInString(monsterArray.join(', '), ',', ' et');

    const damageType = this.getDamageType(this.effectId);

    const numTurnsText = this.numTurns > 0 ? this.numTurns : 'ce';
    const pluralForm = this.numTurns > 1 ? 's' : '';

    return `+${currentValue}% de dégâts ${damageType} contre ${monsters} ${this.wordTarget()} pour ${numTurnsText} tour${pluralForm}`;
  }

  protected get effectName(): string {
    return 'AbilityKillerDamageIncreaseEffect';
  }
}

