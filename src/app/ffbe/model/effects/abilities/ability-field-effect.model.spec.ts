import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';
import {FieldEffectMockDataHelper} from '../field-effect.model.spec';
import {FieldEffect} from '../field-effect.model';
import {FieldEffectsServiceMock} from '../../../services/field-effects.service.spec';
import {FieldEffectsService} from '../../../services/field-effects.service';

describe('AbilityFieldEffect', () => {
  it('should parse field effect', () => {
    // GIVEN
    const fieldEffect: FieldEffect = FieldEffectMockDataHelper.mockFieldEffect(200000027, 1, 1);

    const effect = JSON.parse('[1, 1, 160, [200000027]]');
    const fieldEffectsServiceMock = new FieldEffectsServiceMock() as FieldEffectsService;
    FieldEffectsService['INSTANCE'] = fieldEffectsServiceMock;
    const mySpy = spyOn(fieldEffectsServiceMock, 'searchForFieldEffectByGumiId').and.returnValues(fieldEffect);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200000027, 1, 1);
    expect(s).toEqual('-25% de rés. Vent aux adversaires pour 4 tours (effet de terrain)');
  });

});
