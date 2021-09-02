import {FieldSkillEffectFactory} from '../field-skill-effect.factory';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

describe('FieldElementResistancesEffect', () => {

  it('should parse field elemental physical damage increase for allies and enemies', () => {
    // GIVEN
    const effect = JSON.parse('[0, 0, 10, [0, 0, 0, 0, 0, [25,  25], 0, 0]]');
    // WHEN
    const s = FieldSkillEffectFactory.getSkillEffect(TargetNumberEnum.Self, TargetTypeEnum.Caster, 3, effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+25% aux dégâts physiques de Terre infligés par les alliés et adversaires pour 3 tours');
  });

  it('should parse field elemental magical damage increase for allies and enemies', () => {
    // GIVEN
    const effect = JSON.parse('[0, 0, 11, [0, [40,  40], 0, 0, 0, 0, 0, 0]]');
    // WHEN
    const s = FieldSkillEffectFactory.getSkillEffect(TargetNumberEnum.Self, TargetTypeEnum.Caster, 1, effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+40% aux dégâts magiques de Glace infligés par les alliés et adversaires pour 1 tour');
  });

});
