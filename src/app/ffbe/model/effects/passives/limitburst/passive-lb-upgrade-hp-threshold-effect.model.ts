import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveLbUpgradeHpThresholdEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters)) {
      this.parameterError = true;
    } else {

    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return '';
  }

  protected get effectName(): string {
    return 'PassiveLbUpgradeHpThresholdEffect';
  }
}

export class PassiveLbUpgradeHpThresholdParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveLbUpgradeHpThresholdParser inconnu: Mauvaise liste de paramètres';
    }

    const turns = effect[3][4] > 0 ? 'pour ' + effect[3][4] + ' tours ' : '';

    return 'Améliore la limite de l\'unité ' + turns + 'quand les PV passent sous ' + effect[3][2] + '%';
  }
}
