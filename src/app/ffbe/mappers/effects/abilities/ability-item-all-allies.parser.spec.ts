import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {CONSUMABLES_TEST_DATA} from '../../../model/items/consumable/consumable.model.spec';
import {ConsumablesService} from '../../../services/consumables.service';
import {ConsumablesServiceMock} from '../../../services/consumables.service.spec';
import {Consumable} from '../../../model/items/consumable/consumable.model';

describe('AbilityItemAllAlliesEffectParser', () => {
  it('should parse item list usage on all allies', () => {
    // GIVEN
    const consumables = JSON.parse(CONSUMABLES_TEST_DATA);
    const consumable1: Consumable = consumables['101000100'];
    consumable1.gumi_id = 101000100;
    const consumable2: Consumable = consumables['101000200'];
    consumable2.gumi_id = 101000200;

    const effect = JSON.parse('[2, 2, 28, [101000100, 101000200]]');
    const consumablesServiceMock = new ConsumablesServiceMock() as ConsumablesService;
    ConsumablesService['INSTANCE'] = consumablesServiceMock;
    const mySpy = spyOn(consumablesServiceMock, 'searchForConsumableByGumiId').and.returnValues(consumable1, consumable2);
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(101000100);
    expect(mySpy).toHaveBeenCalledWith(101000200);
    expect(s).toEqual('Permet de lancer <a href="ffexvius_objects.php?gumiid=101000100">Potion</a> ou <a href="ffexvius_objects.php?gumiid=101000200">Potion +</a> sur tous les alliés');
  });
});

