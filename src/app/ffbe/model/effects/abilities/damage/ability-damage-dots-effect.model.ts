import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class AbilityDamageDotsEffect extends SkillEffect {

  private power: number;
  private damageType: number;
  private turns: number;
  private stackId: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 7 || parameters[2] !== 0 || parameters[5] !== 1) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[1]);
      this.turns = parameters[4];
      this.stackId = parameters[6] ? parameters[6] : 0;
      this.damageType = parameters[0];
      if (this.damageType !== 1 && this.damageType !== 3 && this.damageType !== 4) {
        this.parameterError = true;
      }
    }
  }


  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    let attackType = 'UNKNOWN ';
    let scaling = '';
    if (this.damageType === 1) {
      skill.physique = true;
      attackType = skill.wordAttackAndDamageForPhysicalDamages();
    } else if (this.damageType === 3) {
      skill.magique = true;
      attackType = skill.wordAttackAndDamageForMagicalDamages();
    } else if (this.damageType === 4) {
      skill.magique = true;
      attackType = skill.wordAttackAndDamageForMagicalDamages();
      scaling = ' calculés sur la PSY';
    }
    const target = this.wordTarget();
    const turnsText = `chaque tour ${target} pour ${this.turns} tour${this.turns > 1 ? 's' : ''}`;
    const stackText = `(ID #${this.stackId})`;
    return `${attackType} ${elements}${scaling} de puissance ${this.power}% ${turnsText} ${stackText}`;
  }

  protected get effectName(): string {
    return 'AbilityDamageDotsEffect';
  }

}
