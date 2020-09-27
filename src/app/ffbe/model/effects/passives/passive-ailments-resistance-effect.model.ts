import {Skill} from '../../skill.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';
import {ResistancesAlterations} from '../../resistances-alterations.model';

export class PassiveAilmentsResistanceEffect extends SkillEffect {

  private resistances: ResistancesAlterations;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8) {
      this.parameterError = true;
    } else {
      this.resistances = new ResistancesAlterations(parameters[0], parameters[1], parameters[2], parameters[3],
        parameters[4], parameters[5], parameters[6], parameters[7]);
    }
  }

  protected get effectName(): string {
    return 'PassiveAilmentsResistanceEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    return this.wordEffectJoiningIdenticalValues(this.resistances.toNameValuePairArray());
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return `+${currentValue}% de rés. aux altérations`;
    }
    return `+${currentValue}% de rés. ${FfbeUtils.replaceLastOccurenceInString(accumulatedStats.join(', '), ', ', ' et ')}`;
  }

  getAilmentResistances(): ResistancesAlterations {
    return this.resistances;
  }
}
