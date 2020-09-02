import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {SkillsService} from '../../../../services/skills.service';
import {SkillMapper} from '../../../../mappers/skill-mapper';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {EffectParser} from '../../../../mappers/effects/effect-parser';

export class AbilitySkillCooldownEffect extends SkillEffect {

  private activatedSkillId: number;
  private activatedSkill: Skill;
  private turnAvailability: number;
  private turnsCooldown: number;
  private dualWieldDoubleExecution: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3 || parameters.length > 4 || (parameters[1] !== 0 && parameters[1] !== 1)
      || !Array.isArray(parameters[2]) || parameters[2].length !== 2 || (parameters[3] && parameters[3] !== 0 && parameters[3] !== 1)) {
      this.parameterError = true;
    } else {
      this.activatedSkillId = parameters[0];
      this.activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(this.activatedSkillId);
      this.turnsCooldown = parameters[2][0] + 1;
      this.turnAvailability = this.turnsCooldown - parameters[2][1];
      this.dualWieldDoubleExecution = parameters[3];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const availabilityText = `Disponible tous les ${this.turnsCooldown} tours dès le tour ${this.turnAvailability}:${HTML_LINE_RETURN}`;
    if (!this.activatedSkill) {
      return `${availabilityText}UNKNOWN skill`;
    }
    let singleActivationText = '';
    if (this.dualWieldDoubleExecution === 0 && (skill.attack_type === 'Physical' || skill.attack_type === 'Hybrid')) {
      singleActivationText = `${HTML_LINE_RETURN}Ne s'active qu'<strong>une fois</strong> si l'unité porte deux armes`;
    }
    const activatedSkillEffect = SkillMapper.toCompetence(this.activatedSkill).effet_fr;
    EffectParser.fillSkillWithTransitiveActivatedSkillInformation(skill, this.activatedSkill);
    return `${availabilityText}${activatedSkillEffect}${singleActivationText}`;
  }

  protected get effectName(): string {
    return 'AbilityCooldownEffect';
  }

  public getDamagesPower(): number {
    return this.activatedSkill.calculateSkillPower();
  }
}
