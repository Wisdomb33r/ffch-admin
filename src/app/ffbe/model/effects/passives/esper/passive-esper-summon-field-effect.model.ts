import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';
import {FieldEffect} from '../../field-effect.model';
import {FieldEffectsService} from '../../../../services/field-effects.service';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {FFBE_ESPERS} from '../../../../ffbe.constants';

export class PassiveEsperSummonFieldEffect extends SkillEffect {

  private esperId: number;
  private fieldEffectId: number;
  private fieldEffect: FieldEffect;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      if (!Array.isArray(parameters[1]) || parameters[1].length !== 2
        || parameters[1][0] !== 0 || parameters[1][1] !== 1) {
        this.parameterWarning = true;
      }
      this.esperId = parameters[0];
      this.fieldEffectId = parameters[2];
      this.fieldEffect = FieldEffectsService.getInstance().searchForFieldEffectByGumiId(this.fieldEffectId);
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    let effets = this.fieldEffect.getEffects(skill);
    if (effets?.length === 0) {
      effets = [`Unknown effect`];
    }

    const esperId = this.esperId;
    const esper = FFBE_ESPERS.find(e => e.gumiId === esperId);
    const esperLink = esper ? SkillEffect.getEsperLink(esper) : 'UNKNOWN esper';
    const esperText = `lors de l'invocation de ${esperLink}`;

    return effets.map(effet => `${effet} ${esperText} (effet de terrain)`).join(HTML_LINE_RETURN);
  }

  protected get effectName(): string {
    return 'PassiveEsperSummonFieldEffect';
  }
}
