import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveLbUpgradeHpThresholdEffect extends SkillEffect {

  private threshold: number;
  private numTurns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      this.threshold = parameters[2];
      this.numTurns = parameters[4];
      if (this.numTurns === 0) {
        this.parameterWarning = true;
      }
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const pluralForm = this.numTurns > 1 ? 's' : '';
    const turns = this.numTurns > 0 ? ` pour ${this.numTurns} tour${pluralForm}` : '';
    return `Améliore la limite de l'unité${turns} quand les PV passent sous ${this.threshold}%`;
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
