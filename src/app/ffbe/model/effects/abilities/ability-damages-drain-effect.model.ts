import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesDrainEffect extends SkillEffect {

  private power: number;
  private drain: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3 || parameters[2] !== 100) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[1]);
      this.drain = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    let attackTypeText = 'Dégâts ';
    switch (skill.attack_type) {
      case 'Physical':
        skill.physique = true;
        attackTypeText += 'physiques';
        break;
      case 'Magic':
        skill.magique = true;
        attackTypeText += 'magiques';
        break;
      case 'Hybrid':
        skill.hybride = true;
        attackTypeText += 'hybrides';
        break;
      default:
        attackTypeText += 'UNKNOWN';
        break;
    }
    const target = this.wordTarget();
    skill.physique = true;
    const drainTypeText = this.effectId === 10 ? ' sur les PM' : '';
    const drainText = `avec absorption de ${this.drain}% des dégâts infligés`;
    return `${attackTypeText} ${elements}${drainTypeText} de puissance ${this.power}% ${drainText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesPhysicalEffect';
  }

}
