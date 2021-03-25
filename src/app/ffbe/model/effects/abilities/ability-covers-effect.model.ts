import {Skill} from '../../skill.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityCoversEffect extends SkillEffect {

  private damageType: number;
  private numTurns: number;
  private coverChance: number;
  private mitigationMin: number;
  private mitigationMax: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 9) {
      this.parameterError = true;
    } else {
      this.mitigationMin = parameters[2];
      this.mitigationMax = parameters[3];
      this.coverChance = parameters[4];
      this.numTurns = parameters[6];
      this.damageType = parameters[8];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const targetText = this.wordTarget(TargetPrepositionEnum.None);
    const turnsText = ` pour ${this.numTurns} tour${this.numTurns > 1 ? 's' : ''}`;
    let mitigationText = `${this.mitigationMin}%`;
    if (this.mitigationMax > this.mitigationMin) {
      mitigationText += ` à ${this.mitigationMax}%`;
    }
    return `${this.coverChance}% de chance pour ${targetText} de protéger les alliés des dégâts ${this.damageTypeText} avec mitigation de ${mitigationText} des dégâts reçus${turnsText}`;
  }

  private get damageTypeText() {
    let damageType = 'UNKNOWN';

    if (this.damageType === 0) {
      damageType = 'physiques et magiques';
    } else if (this.damageType === 1) {
      damageType = 'physiques';
    } else if (this.damageType === 2) {
      damageType = 'magiques';
    }

    return damageType;
  }

  protected get effectName(): string {
    return 'AbilityCoversEffect';
  }
}
