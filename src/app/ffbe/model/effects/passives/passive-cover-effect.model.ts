import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveCoverEffect extends SkillEffect {

  private allyRestriction: number;
  private dmgReductionMin: number;
  private dmgReductionMax: number;
  private procChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      if (parameters[1] !== 100) {
        this.parameterWarning = true;
      }

      this.allyRestriction = parameters[0];
      this.dmgReductionMin = parameters[2];
      this.dmgReductionMax = parameters[3];
      this.procChance = parameters[4];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const dmgType = this.effectId === 8 ? ' physiques' : (this.effectId === 59 ? ' magiques' : ' UNKNOWN');

    let mitigation = '';
    if (this.dmgReductionMin > 0 && this.dmgReductionMax > 0) {
      mitigation = ' avec mitigation de ' + this.dmgReductionMin + '%';
      if (this.dmgReductionMin !== this.dmgReductionMax) {
        mitigation += '-' + this.dmgReductionMax + '%';
      }
    }

    return this.procChance + '% de chance de protéger un allié '
      + (this.allyRestriction === 1 ? 'féminin ' : '')
      + 'des attaques' + dmgType + mitigation;
  }

  protected get effectName(): string {
    return 'PassiveCoverEffect';
  }
}

export class PassiveCoverParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5 || effect[3][1] !== 100) {
      return 'Effet PassiveCoverParser inconnu: Mauvaise liste de paramètres';
    }

    const allyRestriction = effect[3][0];
    const dmgReductionMin = effect[3][2];
    const dmgReductionMax = effect[3][3];
    const procChance = effect[3][4];
    const dmgType = effect[2] === 8 ? ' physiques' : (effect[2] === 59 ? ' magiques' : ' UNKNOWN');

    let mitigation = '';
    if (dmgReductionMin > 0 && dmgReductionMax > 0) {
      mitigation = ' avec mitigation de ' + dmgReductionMin + '%';
      if (dmgReductionMin !== dmgReductionMax) {
        mitigation += '-' + dmgReductionMax + '%';
      }
    }

    return procChance + '% de chance de protéger un allié '
      + (allyRestriction === 1 ? 'féminin ' : '')
      + 'des attaques' + dmgType + mitigation;
  }
}
