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
    const mySpy = spyOn(equipmentsServiceMock, 'searchForEquipmentByGumiId').and.returnValues(equipment);

    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(null);

    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(301000400);
    expect(s).toEqual('+30% PV/PM, +20% ATT/DÉF, +10% MAG/PSY si l\'unité porte <a href="ffexvius_objects.php?gumiid=301000400">Dague</a>');
  });

  it('should parse equipment stats increase for several pieces of equipment', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment1: Equipment = equipments['301000400'];
    equipment1.gumi_id = 301000400;
    const equipment2: Equipment = equipments['409013500'];
    equipment2.gumi_id = 409013500;
    const equipment3: Equipment = equipments['1100000184'];
    equipment3.gumi_id = 1100000184;

    const effect = JSON.parse('[0, 3, 74, [[301000400,  409013500,  1100000184], 10, 20, 30, 40, 50, 60, 0]]');
    const equipmentsServiceMock = new EquipmentsServiceMock() as EquipmentsService;
    EquipmentsService['INSTANCE'] = equipmentsServiceMock;
    const mySpy = spyOn(equipmentsServiceMock, 'searchForEquipmentByGumiId').and.returnValues(equipment1, equipment2, equipment3);

    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(null);

    // THEN
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(301000400);
    expect(mySpy).toHaveBeenCalledWith(409013500);
    expect(mySpy).toHaveBeenCalledWith(1100000184);
    expect(s).toEqual('+60% PM, +50% PV, +40% PSY, +30% MAG, +20% DÉF, +10% ATT si l\'unité porte ' +
      '<a href="ffexvius_objects.php?gumiid=301000400">Dague</a>, ' +
      '<a href="ffexvius_objects.php?gumiid=409013500">Armure Shinra bêta</a> ou ' +
      '<a href="ffexvius_objects.php?gumiid=1100000184">Collier de fleurs colorées</a>');
  });

});
