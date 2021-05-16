import {SkillModifierIncreaseEffect} from '../../../../mappers/effects/skill-modifier-increase-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';

export class AbilitySkillModifierIncreaseEffect extends SkillModifierIncreaseEffect {

  private numTurns: number;
  private stackId: number;
  private isGeneralPhysicalModIncrease = false;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      this.numTurns = parameters[4] >= 0 ? parameters[4] : 9999;
      this.stackId = parameters.length >= 7 ? parameters[6] : 0;
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (!Array.isArray(this.parameters[0]) && this.parameters[0] === 0) {
      this.isGeneralPhysicalModIncrease = true;
      const skillModifierIncrease = this.parameters[3];
      const displayedValue = (skillModifierIncrease > 0 ? skillModifierIncrease : 'UNKNOWN');

      return this.wordEffectForSkillModIncrease(displayedValue, '%', 'attaques physiques hors limites');
    }

    this.initializeSkillIncreasesValues(this.parameters);

    return super.wordEffectImpl(skill);
  }

  protected wordEffectForSkillModIncrease(displayedValue: string, percentText: string, skillsText: string) {
    const pluralForm = this.numTurns > 1 ? 's' : '';
    const duration = `pour ${this.numTurns} tour${pluralForm}`;
    const preposition = this.isGeneralPhysicalModIncrease ? 'aux' : 'à';
    return `+${displayedValue}${percentText} de puissance ${preposition} ${skillsText} ${this.wordTarget()} ${duration} (ID #${this.stackId})`;
  }

  protected get effectName(): string {
    return 'AbilitySkillModifierIncreaseEffect';
  }
}
