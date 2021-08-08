import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class AbilityElementDamageIncreaseEffect extends SkillEffect {

  private damageType: number;
  private increases: Array<number>;
  private turns: number;
  private dispelable: boolean;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5 || parameters[2] !== 1 || (parameters[0] !== 0 && parameters[0] !== 1)
      || !Array.isArray(parameters[1]) || parameters[1].length !== 8 || (parameters[4] !== 0 && parameters[4] !== 1)) {
      this.parameterError = true;
    } else {
      this.damageType = parameters[0];
      this.increases = parameters[1];
      this.turns = parameters[3];
      this.dispelable = parameters[4] !== 0;
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const target = `infligés par ${this.wordTarget(TargetPrepositionEnum.None)}`;
    const damageIncreaseText = this.wordEffectJoiningIdenticalValues(SkillEffect.getElementNameValueTableFromNumberArray(this.increases));
    const dispelableText = this.dispelable ? '' : ' (bonus non-dissipable)';
    return `${damageIncreaseText} ${target} ${this.wordForTurns(this.turns)}${dispelableText}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const damageType = this.damageType === 0 ? 'physiques' : 'magiques';
    return `+${currentValue}% aux dégâts ${damageType} de ${FfbeUtils.replaceLastOccurenceInString(accumulatedStats.join(', '), ', ', ' et ')}`;
  }

  protected get effectName(): string {
    return 'AbilityElementDamagesIncreaseEffect';
  }
}
