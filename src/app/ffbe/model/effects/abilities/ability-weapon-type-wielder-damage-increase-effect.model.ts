import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';
import {FFBE_CATEGORIES_OBJETS} from '../../../ffbe.constants';

export class AbilityWeaponTypeWielderDamageIncreaseEffect extends SkillEffect {

  private weaponType: number;
  private increase: number;
  private turns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6 || parameters[1] !== parameters[2]) {
      this.parameterError = true;
    } else {
      if (parameters[3] !== 1 || [0, 1].indexOf(parameters[5]) === -1) {
        this.parameterWarning = true;
      }
      this.weaponType = parameters[0];
      this.increase = parameters[1];
      this.turns = parameters[4];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const categorie = FFBE_CATEGORIES_OBJETS.find(cat => cat.gumiId === this.weaponType);
    const weaponTypeText = categorie ? categorie.name : 'UNKNOWN WEAPON TYPE';
    const target = this.wordTarget(TargetPrepositionEnum.None);
    const turnsText = `pour ${this.turns} tour${this.turns > 1 ? 's' : ''}`;
    return `+${this.increase}% de dégâts reçus des unités qui portent des ${weaponTypeText} par ${target} ${turnsText}`;
  }

  protected get effectName(): string {
    return 'AbilityWeaponTypeWielderDamageIncreaseEffect';
  }
}
