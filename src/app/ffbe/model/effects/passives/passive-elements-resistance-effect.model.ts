import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {ResistancesElementaires} from '../../resistances-elementaires.model';

export class PassiveElementsResistanceEffect extends SkillEffect {

  private increases: ResistancesElementaires;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8) {
      this.parameterError = true;
    } else {
      this.increases = new ResistancesElementaires(parameters[0], parameters[1], parameters[2], parameters[3],
        parameters[4], parameters[5], parameters[6], parameters[7]);
    }
  }

  protected get effectName(): string {
    return 'PassiveElementsResistanceEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    return this.wordEffectJoiningIdenticalValues(this.increases.toNameValuePairArray());
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux éléments';
    }
    return '+' + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }

  getElementResistances(): ResistancesElementaires {
    return this.increases;
  }
}
