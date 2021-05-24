import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveDebuffsResistanceEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {

    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return '';
  }

  protected get effectName(): string {
    return 'PassiveDebuffsResistanceEffect';
  }
}

export class PassiveDebuffsResistanceParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet PassiveDebuffsResistanceParser inconnu: Mauvaise liste de paramètres';
    }
    const statsResists = [
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    let text = this.wordEffectJoiningIdenticalValues(statsResists);
    if (effect[3][4] > 0) {
      text += (text && text.length ? HTML_LINE_RETURN : '') + '+' + effect[3][4] + '% de rés. à Stop';
      if (effect[3][5] > 0 && effect[3][4] === effect[3][5]) {
        text += ' et Charme';
      }
    }
    if (effect[3][5] > 0 && effect[3][4] !== effect[3][5]) {
      text += (text && text.length ? HTML_LINE_RETURN : '') + '+' + effect[3][5] + '% de rés. à Charme';
    }
    return text;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% de rés. aux baisses de ' + accumulatedStats.join('/');
  }
}
