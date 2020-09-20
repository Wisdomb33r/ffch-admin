import {SkillEffect} from '../../skill-effect.model';
import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilityDamagePhysicalIncreasedBreakEffect extends SkillEffect {

  protected basePower: number;
  protected bonusPower: number;
  protected equipmentGumiId: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length !== 6 || parameters[4] !== 0 || parameters[5] !== 1
      || (parameters[2] !== 1 && parameters[2] !== 2)) {
      this.parameterError = true;
    } else {
      this.basePower = Math.round(parameters[3]);
      this.bonusPower = Math.round(parameters[1]);
      this.equipmentGumiId = parameters[0];
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

    //+ (this.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une ' : 'un ')
    //       + this.getEquipmentCategoryTypeWithLink(equipmentGumiId)

    const breakText = `avec un bonus BREAK de ${this.bonusPower}% si l'unité porte un katana`;
    return `${attackType} ${elements} de puissance ${this.basePower}% ${target} ${breakText}`;
    //     expect(s).toEqual('Dégâts physiques neutres de puissance 100% à un adversaire avec un bonus BREAK de 400% si l\'unité porte un <a href="ffexvius_objects.php?categid=28">katana</a>');

  }

}
