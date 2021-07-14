import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';

export class PassiveElementsAbsorbEffect extends SkillEffect {

  private increases: Array<{ name: string, value: number }>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8) {
      this.parameterError = true;
    } else {
      this.increases = SkillEffect.getElementNameValueTableFromNumberArray(parameters);
    }
  }

  public wordEffectImpl(skill: Skill): string {
    const elementsText = this.increases.filter(elem => elem.value === 1).map(elem => elem.name).join(' ou ');
    return `Absorbe les dégâts d'élément ${elementsText}`;
  }

  protected get effectName(): string {
    return 'PassiveElementsAbsorbEffect';
  }
}
