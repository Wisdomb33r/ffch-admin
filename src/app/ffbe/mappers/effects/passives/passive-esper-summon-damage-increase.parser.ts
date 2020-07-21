import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FFBE_ESPERS} from '../../../ffbe.constants';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class PassiveEsperSummonDamageIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveEsperSummonDamageIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const esperId = effect[3][1];
    const esper = FFBE_ESPERS.find(e => e.gumiId === esperId);

    let wordedEsper = '';

    if (Array.isArray(esperId)) {
      if (esperId.length === 19) {
        wordedEsper = 'd\'une chimère';
      } else {
        const espers = esperId.map(singleEsperId => FFBE_ESPERS.find(e => e.gumiId === singleEsperId)).filter(esper => !FfbeUtils.isNullOrUndefined(esper));
        wordedEsper = espers.map(esper => this.getEsperLink(esper)).join(', ');
        wordedEsper = `de ${FfbeUtils.replaceLastOccurenceInString(wordedEsper, ', ', ' et ')}`;
      }
    } else {
      const esperLink = esper ? this.getEsperLink(esper) : 'UNKNOWN esper';
      wordedEsper = esperId === 0 ? `d\'une chimère` : `de ${esperLink}`;
    }

    return `+${effect[3][0]}% de dégâts lors de l\'invocation ${wordedEsper}`;
  }
}
