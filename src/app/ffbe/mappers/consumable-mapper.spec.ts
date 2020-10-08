import {Objet} from '../model/objet/objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {CONSUMABLES_TEST_DATA} from '../model/items/consumable/consumable.model.spec';
import {Consumable} from '../model/items/consumable/consumable.model';
import {ConsumableMapper} from './consumable-mapper';

describe('ConsumableMapper', () => {
  it('should transform consumable raw data into Objet', () => {
    // GIVEN
    const consumables = JSON.parse(CONSUMABLES_TEST_DATA);
    const consumable: Consumable = consumables['101000200'];
    consumable.gumi_id = 101000200;
    // WHEN
    const objet: Objet = ConsumableMapper.toObjet(consumable);
    // THEN
    expect(objet.id).toBeNull();
    expect(objet.gumi_id).toEqual(101000200);
    expect(objet.categorie).toEqual(FfbeUtils.findObjetCategorieByFfchId(61));
    expect(objet.stars).toEqual(null);
    expect(objet.icone).toEqual(null);
    expect(objet.nom).toEqual('Potion +');
    expect(objet.nom_en).toEqual('Hi-Potion');
    expect(objet.description).toEqual('Régénère moyennement les PV d\'un allié.');
    expect(objet.description_en).toEqual('Restore HP for one ally');
    expect(objet.effet).toBeFalsy();
    expect(objet.effet_en).toEqual('Restore 500 HP to target');
    expect(objet.extended_gumi_id).toEqual('20:101000200');
  });

  it('should fallback to long description if short is missing', () => {
    // GIVEN
    const consumables = JSON.parse(CONSUMABLES_TEST_DATA);
    const consumable: Consumable = consumables['101000200'];
    consumable.gumi_id = 101000200;
    consumable.strings.desc_short = [null, null, null, null, null, null];
    // WHEN
    const objet: Objet = ConsumableMapper.toObjet(consumable);
    // THEN
    expect(objet.description).toEqual('Un tonifiant qui régénère correctement la santé d\'un allié. Il est plus cher qu\'une potion normale en raison d\'ingrédients plus rares et d\'une préparation plus difficile mais on ne peut nier ses effets. Bien que les potions normales soient suffisantes pour les bobos ordinaires, les graves blessures subies par de nombreux soldats dans la guerre entre Grandshelt et Zoldaad justifient le besoin de ce puissant revigorant.');
  });
});
