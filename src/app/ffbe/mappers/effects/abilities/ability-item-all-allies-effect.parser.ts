import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {ConsumablesService} from '../../../services/consumables.service';
import {Consumable} from '../../../model/items/consumable/consumable.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class AbilityItemAllAlliesEffectParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet AbilityItemAllAlliesEffectParser inconnu: Mauvaise liste de paramètres';
    }

    const usableItemsIds: Array<number> = !Array.isArray(effect[3]) ? [effect[3]] : effect[3];
    const usableItems: Array<Consumable> = usableItemsIds
      .map((itemId: number) => ConsumablesService.getInstance().searchForConsumableByGumiId(itemId));
    let linksText = this.getConsumablesNamesWithGumiIdentifierLink(usableItems);
    linksText = FfbeUtils.replaceLastOccurenceInString(linksText, ', ', ' ou ');
    return `Permet de lancer ${linksText} sur tous les alliés`;
  }

}
