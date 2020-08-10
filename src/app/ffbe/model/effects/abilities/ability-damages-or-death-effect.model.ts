import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesOrDeathEffect extends SkillEffect {

  private basePower: number;
  private power: number;
  private ignoreDef: number;
  private deathChance: number;
  private dmgChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      this.basePower = parameters[0];
      this.ignoreDef = Math.abs(parameters[3] ? parameters[3] : 0);
      this.deathChance = parameters[1];
      this.dmgChance = parameters[2];
      this.power = this.ignoreDef > 0 ? this.basePower * 100 / (100 - this.ignoreDef) : this.basePower;
    }
  }

  protected wordEffectImpl(skill: Skill) {
    if (skill.attack_type !== 'Physical') {
      return this.wordBadParameterText();
    }
    const elements = skill.wordElementInflict();
    const target = this.wordTarget();
    skill.physique = true;
    const dmgChanceText = this.dmgChance < 100 ? `${this.dmgChance}% de chance d'infliger ` : '';
    const dmgText = `de puissance ${this.basePower}%`;
    const ignoreDefText = this.ignoreDef > 0 ? ` (ignore ${this.ignoreDef}% DÉF, ${this.power}% total)` : '';
    return `Inflige Mort (${this.deathChance}%) ou ${dmgChanceText}des dégâts physiques ${elements} ${dmgText}${ignoreDefText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesOrDeathEffect';
  }

}
