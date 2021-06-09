import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveCoverEffect extends SkillEffect {

  private allyRestriction: number;
  private dmgReductionMin: number;
  private dmgReductionMax: number;
  private procChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      if (parameters[1] !== 100 || (parameters[0] !== 0 && parameters[0] !== 1)) {
        this.parameterWarning = true;
      }

      this.allyRestriction = parameters[0];
      this.dmgReductionMin = parameters[2];
      this.dmgReductionMax = parameters[3];
      this.procChance = parameters[4];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const dmgType = this.effectId === 8 ? ' physiques' : (this.effectId === 59 ? ' magiques' : ' UNKNOWN');

    let mitigation = '';
    if (this.dmgReductionMin > 0 && this.dmgReductionMax > 0) {
      mitigation = ` avec mitigation de ${this.dmgReductionMin}%`;
      if (this.dmgReductionMin !== this.dmgReductionMax) {
        mitigation += `-${this.dmgReductionMax}%`;
      }
    }
    const allyRestrictionText = (this.allyRestriction === 1 ? ' féminin' : '');

    return `${this.procChance}% de chance de protéger un allié${allyRestrictionText} des attaques${dmgType}${mitigation}`;
  }

  protected get effectName(): string {
    return 'PassiveCoverEffect';
  }
}
