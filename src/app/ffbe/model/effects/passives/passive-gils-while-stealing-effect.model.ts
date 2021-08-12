import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveGilsWhileStealingEffect extends SkillEffect {

  private tauxMin: number;
  private tauxMax: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      this.tauxMin = parameters[0];
      this.tauxMax = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    let tauxText = ` ${this.tauxMin}% à ${this.tauxMax}%`;
    if (this.tauxMin === this.tauxMax) {
      tauxText = ` ${this.tauxMax}%`;
    }

    return `Permet de voler${tauxText} des gils en plus des objets`;  }

  protected get effectName(): string {
    return 'PassiveGilsWhileStealingEffect';
  }
}
