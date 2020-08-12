import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class AbilityDamagePhysicalComboEffect extends SkillEffect {

  private basePower: number;
  private minAttacks: number;
  private maxAttacks: number;
  private accuracy: number;
  private increment: number;
  private nbIncrements: number;
  private maxPower: number;
  private power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5 || parameters[0] !== 0 || parameters[1] !== 0) {
      this.parameterError = true;
    } else {
      this.basePower = Math.round(parameters[4]);
      this.maxPower = this.basePower;
      this.minAttacks = Math.round(parameters[2]);
      this.maxAttacks = Math.round(parameters[3]);
      this.power = Math.round((this.minAttacks + this.maxAttacks) / 2 * this.basePower);
      if (parameters.length >= 6 && parameters[5] > 0) {
        this.accuracy = parameters[5];
      }
      if (parameters.length >= 8) {
        this.nbIncrements = Math.round(100 / parameters[6] - 1);
        this.increment = parameters[7];
        this.maxPower = this.basePower + this.increment * this.nbIncrements;
      }
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    const executionNbText = this.minAttacks === this.maxAttacks ? this.minAttacks : `de ${this.minAttacks} à ${this.maxAttacks}`;
    const comboText = `Éxécution ${executionNbText} fois:`;
    const accuracyText = this.accuracy ? ` (+${this.accuracy}% précision)` : '';
    const incrementText = this.increment && this.nbIncrements ? `(+${this.increment}% par utilisation successive, ${this.nbIncrements}x, max ${this.maxPower}%) ` : '';
    return `${comboText} ${attackType} ${elements} de puissance ${this.basePower}% ${incrementText}${target}${accuracyText}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalComboEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
