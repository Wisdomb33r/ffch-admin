import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';

export class AbilityElementsAbsorbEffect extends SkillEffect {

  private increases: Array<{ name: string, value: number }>;
  private turns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 10 || parameters[8] !== 1 || parameters[9] !== 1) {
      this.parameterError = true;
    } else {
      this.increases = SkillEffect.getElementNameValueTableFromNumberArray(parameters);
      this.turns = 1; // TODO currently only skill 915227 have this effect, and both 9th and 10th parameter have 1 as value. Cannot determine which one is the nb of turns config.
    }
  }

  public wordEffectImpl(skill: Skill): string {
    const targetText = this.wordTarget(TargetPrepositionEnum.A);
    const elementsText = this.increases.filter(elem => elem.value === 1).map(elem => elem.name).join(' ou ');
    const turnsText = `pour ${this.turns} tour${this.turns > 1 ? 's' : ''}`;
    return `Active l'absorption des dégâts d'élément ${elementsText} ${targetText} ${turnsText}`;
  }

  protected get effectName(): string {
    return 'AbilityElementsAbsorbEffect';
  }
}
