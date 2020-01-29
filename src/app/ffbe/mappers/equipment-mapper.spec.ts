import {Objet} from '../model/objet/objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {EQUIPMENTS_TEST_DATA} from '../model/equipment/equipment.model.spec';
import {EquipmentMapper} from './equipment-mapper';
import {Equipment} from '../model/equipment/equipment.model';

describe('EquipmentMapper', () => {
  it('should transform equipment raw data into Objet', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.id).toBeNull();
    expect(objet.gumi_id).toEqual(301000200);
    expect(objet.categorie).toEqual(FfbeUtils.findObjetCategorieByFfchId(16));
    expect(objet.stars).toEqual(1);
    expect(objet.icone).toEqual(null);
    expect(objet.nom).toEqual('Couteau en bronze');
    expect(objet.nom_en).toEqual('Bronze Knife');
    expect(objet.description).toEqual('Couteau fait de bronze.');
    expect(objet.description_en).toEqual('A dagger made of bronze.');
    expect(objet.effet).toBeFalsy();
    expect(objet.effet_en).toBeFalsy();
    expect(objet.extended_gumi_id).toEqual('21:301000200');
  });

  it('should fallback to long description if short is missing', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.strings.desc_short = [null, null, null, null, null, null];
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.description).toEqual('Un couteau en bronze possédant un seul côté tranchant.');
  });
});
