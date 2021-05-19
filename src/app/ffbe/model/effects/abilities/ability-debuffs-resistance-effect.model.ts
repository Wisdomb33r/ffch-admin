import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';

export class AbilityDebuffsResistanceEffect extends SkillEffect {

  private statsResists: Array<{ name: string, value: number }>;
  private stopResist: number;
  private charmResist: number;
  private turns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8 ||
      (parameters[7] !== 0 && parameters[7] !== 1 && parameters[7] !== 3)) {
      this.parameterError = true;
    } else {
      this.turns = parameters[6];
      this.statsResists = [
        {name: 'ATT', value: parameters[0]},
        {name: 'DÉF', value: parameters[1]},
        {name: 'MAG', value: parameters[2]},
        {name: 'PSY', value: parameters[3]},
      ];
      this.stopResist = parameters[4];
      this.charmResist = parameters[5];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    let text = this.wordEffectJoiningIdenticalValues(this.statsResists);
    if (this.stopResist > 0) {
      text += `${text && text.length ? HTML_LINE_RETURN : ''}+${this.stopResist}% de rés. à Stop`;
      if (this.charmResist > 0 && this.stopResist === this.charmResist) {
        text += ' et Charme';
      }
      text += this.wordTargetAndTurnsText();
    }
    if (this.charmResist > 0 && this.stopResist !== this.charmResist) {
      text += `${text && text.length ? HTML_LINE_RETURN : ''}+${this.charmResist}% de rés. à Charme`;
      text += this.wordTargetAndTurnsText();
    }
    return text;
  }

  protected wordTargetAndTurnsText(): string {
    const turnsText = `pour ${this.turns > 0 && this.turns < 9999 ? this.turns : 9999} tours`;
    return ` ${this.wordTarget()} ${turnsText}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue}% de rés. aux baisses de ${accumulatedStats.join('/')}${this.wordTargetAndTurnsText()}`;
  }

  protected get effectName(): string {
    return 'AbilityDebuffsResistanceEffect';
  }
}
