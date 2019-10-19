import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {FfbeUtils} from '../../../utils/ffbe-utils';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilityKillerDamageIncreaseParser extends EffectParser {
  private target: string;
  private damageType: string;

  private numTurns: number;
  private pluralForm: string;

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10 ||
      !Array.isArray(effect[3][0]) || effect[3][0].length < 2) {
      return 'Effet AbilityKillerDamageIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    this.target = this.getTarget(effect[0], effect[1]);
    this.damageType = this.getDamageType(effect[2]);

    this.numTurns = effect[3][8];
    this.pluralForm = effect[3][8] > 1 ? 's' : '';

    const rawKillers = effect[3].slice(0, 8);

    const increases = [];

    rawKillers.forEach(rawKiller => {
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

    return `+${currentValue}% de dégâts ${this.damageType} contre ${monsters} ${this.target} pour ${this.numTurns} tour${this.pluralForm}`;
  }
}
