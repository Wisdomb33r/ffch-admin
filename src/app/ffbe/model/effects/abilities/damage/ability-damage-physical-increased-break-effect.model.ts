import {SkillEffect} from '../../skill-effect.model';
import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {NameValuePair, NameValuePairArray} from '../../../name-value-pair-array.model';
import {FfbeUtils} from '../../../../utils/ffbe-utils';

export class AbilityDamagePhysicalIncreasedBreakEffect extends SkillEffect {

  protected basePower: number;
  protected bonusPowers: Array<number>;
  protected equipmentGumiIds: Array<number>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length !== 6 || parameters[4] !== 0 || parameters[5] !== 1) {
      this.parameterError = true;
    } else {
      if (parameters[2] !== 1 && parameters[2] !== 2) {
        this.parameterWarning = true;
      }
      this.basePower = Math.round(parameters[3]);
      this.bonusPowers = Array.isArray(parameters[1]) ? parameters[1].map(power => Math.round(power)) : [Math.round(parameters[1])];
      this.equipmentGumiIds = Array.isArray(parameters[0]) ? parameters[0] : [parameters[0]];
    }
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalIncreasedBreakEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    skill.physique = true;
    const target = this.wordTarget();

    const equipmentBonuses: NameValuePairArray = [];

    this.bonusPowers.forEach((bonus, index) => {
      const equipmentGumiId = this.equipmentGumiIds[index];
      const equipmentName = `${EffectParser.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une' : 'un'} ` +
        `${EffectParser.getEquipmentCategoryTypeWithLink(equipmentGumiId)}`;
      equipmentBonuses.push(new NameValuePair(equipmentName, bonus));
    });

    const breakText = this.wordEffectJoiningIdenticalValues(equipmentBonuses, ' et ');

    return `${attackType} ${elements} de puissance ${this.basePower}% ${target} ${breakText}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `avec un bonus BREAK de ${currentValue}% si l'unité porte ` +
      `${FfbeUtils.replaceLastOccurenceInString(accumulatedStats.join(', '), ', ', ' ou ')}`;
  }

  public getDamagesPower(): number {
    return this.basePower;
  }

}
