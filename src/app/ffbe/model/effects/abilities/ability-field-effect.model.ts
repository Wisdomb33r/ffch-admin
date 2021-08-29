import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {FieldEffect} from '../field-effect.model';
import {FieldEffectsService} from '../../../services/field-effects.service';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';

export class AbilityFieldEffect extends SkillEffect {

  private fieldEffectId: number;
  private fieldEffect: FieldEffect;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.fieldEffectId = parameters[0];
      this.fieldEffect = FieldEffectsService.getInstance().searchForFieldEffectByGumiId(this.fieldEffectId);
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const effets = this.fieldEffect.getEffects(skill);
    if (effets?.length === 0) {
      return `Unknown effect (effet de terrain)` ;
    }
    return effets.map(effet => `${effet} (effet de terrain)`).join(HTML_LINE_RETURN);
  }

  protected get effectName(): string {
    return 'AbilityFieldEffect';
  }
}
