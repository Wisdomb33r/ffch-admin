import {EQUIPMENTS_TEST_DATA} from '../../../items/equipment/equipment.model.spec';
import {Equipment} from '../../../items/equipment/equipment.model';
import {EquipmentsServiceMock} from '../../../../services/equipments.service.spec';
import {EquipmentsService} from '../../../../services/equipments.service';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveEquipmentStatsIncreaseEffect', () => {

  it('should parse equipment stats increase for a single piece of equipment', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000400'];
    equipment.gumi_id = 301000400;

    const effect = JSON.parse('[0, 3, 74, [301000400, 20, 20, 10, 10, 30, 30, 50]]');
    const equipmentsServiceMock = new EquipmentsServiceMock() as EquipmentsService;
    EquipmentsService['INSTANCE'] = equipmentsServiceMock;
    spyOn(equipmentsServiceMock, 'searchForEquipmentByGumiId').and.returnValues(equipment);

    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(null);

    // THEN
    expect(s).toEqual('+30% PV/PM, +20% ATT/DÉF, +10% MAG/PSY si l\'unité porte <a href="ffexvius_objects.php?gumiid=301000400">Dague</a>');
  });

});
