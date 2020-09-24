import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {NameValuePairArray} from '../../name-value-pair-array.model';

export class PassiveElementsResistanceEffect extends SkillEffect {

  private increases: NameValuePairArray;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8) {
      this.parameterError = true;
    } else {
      this.increases = SkillEffect.getElementNameValueTableFromNumberArray(parameters);
    }
  }

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet PassiveElementsResistanceEffect inconnu: Mauvaise liste de paramètres';
    }
    this.increases = SkillEffect.getElementNameValueTableFromNumberArray(effect[3]);
  }

  protected get effectName(): string {
    return 'PassiveElementsResistanceEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    return this.wordEffectJoiningIdenticalValues(this.increases);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux éléments';
    }
    return '+' + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }
}
