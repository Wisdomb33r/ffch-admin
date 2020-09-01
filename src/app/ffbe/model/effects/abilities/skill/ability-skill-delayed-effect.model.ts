import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';
import {AbilityEffectParserFactory} from '../../../../mappers/effects/abilities/ability-effect-parser.factory';
import {FfbeUtils} from '../../../../utils/ffbe-utils';

export class AbilitySkillDelayedEffect extends SkillEffect {

  private activatedSkillId: number;
  private activatedSkill: Skill;
  private turnsDelay: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      this.activatedSkillId = parameters[0];
      this.turnsDelay = parameters[2];
    }
  }

  protected get effectName(): string {
    return 'AbilitySkillDelayedEffect';
  }

  protected wordEffectImpl(skill: Skill) {
    const delayedEffects: Array<{ delay: number, wordedEffect: string }> = this.wordEffectForDelayedSkill(skill);
    const target = this.wordTarget();
    let activatedSkillText = '';
    let currentDelay = 0;
    delayedEffects.forEach(delayedEffect => {
      if (currentDelay === delayedEffect.delay) {
        activatedSkillText += `${delayedEffect.wordedEffect}<br />`;
      } else {
        currentDelay = delayedEffect.delay;
        activatedSkillText += `<br />Activation <strong>${currentDelay} tour${currentDelay > 1 ? 's' : ''} plus tard</strong>:`;
        activatedSkillText += `<br />${delayedEffect.wordedEffect}<br />`;
      }
    });
    activatedSkillText = FfbeUtils.replaceLastOccurenceInString(activatedSkillText, '<br />', '');
    return activatedSkillText;
  }

  public wordEffectForDelayedSkill(skill: Skill): Array<{ delay: number, wordedEffect: string }> {
    this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.activatedSkillId);
    let delayedEffects: Array<{ delay: number, wordedEffect: string }> = [];
    this.activatedSkill.effects_raw?.forEach((effect: Array<any>) => {
      const skillEffect: SkillEffect = AbilitySkillEffectFactory.getSkillEffect(effect);
      if (skillEffect) {
        delayedEffects = delayedEffects.concat(skillEffect.wordEffectForDelayedSkill(this.activatedSkill));
      } else {
        delayedEffects.push({
          delay: 0,
          wordedEffect: AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill)
        });
      }
    });
    delayedEffects.forEach(delayedEffect => delayedEffect.delay += this.turnsDelay);
    return delayedEffects;
  }
}
