import {FieldSkillEffectFactory} from '../field-skill-effect.factory';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

describe('FieldElementResistancesEffect', () => {

  it('should parse field element resistance for enemies', () => {
    // GIVEN
    const effect = JSON.parse('[0, 0, 2, [0,  0,  0,  0,  -25,  0,  0,  0]]');
    // WHEN
    const s = FieldSkillEffectFactory.getSkillEffect(TargetNumberEnum.Single, TargetTypeEnum.Enemy, 4, effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-25% de rés. Vent aux adversaires pour 4 tours');
  });

});
