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
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      if (parameters.length < 8 || parameters.length > 8 || parameters.every(parameter => parameter === 0)) {
        this.parameterWarning = true;
      }
      const filler =  parameters.length < 8 ? new Array<number>(8 - parameters.length).fill(0) : [];
      this.increases = new ResistancesElementaires(... parameters, ... filler);
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
      return `+${currentValue}% de rés. aux éléments`;
    }
    return `+${currentValue}% de rés. ${accumulatedStats.join(', ')}`;
  }

  getElementResistances(): ResistancesElementaires {
    return this.increases;
  }
}
