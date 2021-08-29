import {FieldEffectMockDataHelper} from '../../field-effect.model.spec';
import {FieldEffect} from '../../field-effect.model';
import {FieldEffectsServiceMock} from '../../../../services/field-effects.service.spec';
import {FieldEffectsService} from '../../../../services/field-effects.service';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveEsperSummonFieldEffect', () => {
  it('should parse field effect when summoning esper', () => {
    // GIVEN
    const fieldEffect: FieldEffect = FieldEffectMockDataHelper.mockFieldEffect(200000026, 0, 3);

    const effect = JSON.parse('[0, 3, 97, [12, [0,  1], 200000026]]');
    const fieldEffectsServiceMock = new FieldEffectsServiceMock() as FieldEffectsService;
    FieldEffectsService['INSTANCE'] = fieldEffectsServiceMock;
    const mySpy = spyOn(fieldEffectsServiceMock, 'searchForFieldEffectByGumiId').and.returnValues(fieldEffect);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200000026);
    expect(s).toEqual('-25% de rés. Eau aux alliés et adversaires pour 10 tours lors de l\'invocation de <a href="ffexvius_espers.php?esperid=14">Léviathan</a> (effet de terrain)');
  });

});
