import {Objet} from '../../model/objet/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../../ffbe.constants';
import {SkillMapper} from '../skill-mapper';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {Caracteristiques} from '../../model/caracteristiques.model';
import {ItemWithSkillsMapper} from './item-with-skills-mapper';
import {VisionCard} from '../../model/items/vision-cards/vision-card.model';
import {VisionCardStats} from '../../model/items/vision-cards/vision-card-stats.model';
import {ResistancesAlterations} from '../../model/resistances-alterations.model';
import {TueursMapper} from '../tueurs-mapper';

export class VisionCardMapper extends ItemWithSkillsMapper {

  public static toObjet(visionCard: VisionCard): Objet {
    const resistancesElementaires = ItemWithSkillsMapper.mapElementResistances(visionCard.dmSkills);
    const tueursPhysiques = ItemWithSkillsMapper.mapPhysicalKillers(visionCard.dmSkills);
    const tueursMagiques = ItemWithSkillsMapper.mapMagicalKillers(visionCard.dmSkills);

    const objet = new Objet(null,
      FfbeUtils.findObjetCategorieByFfchId(67),
      visionCard.names[FFBE_FRENCH_TABLE_INDEX],
      visionCard.names[FFBE_ENGLISH_TABLE_INDEX],
      visionCard.rarity,
      null,
      visionCard.gumi_id,
      visionCard.desc_short[FFBE_FRENCH_TABLE_INDEX],
      visionCard.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      null,
      VisionCardMapper.mapVisionCardStats(visionCard.stats),
      new Caracteristiques(),
      ItemWithSkillsMapper.mapEquipmentDoublehandIncreasesPercent(visionCard.dmSkills),
      ItemWithSkillsMapper.mapEquipmentTrueDoublehandIncreasesPercent(visionCard.dmSkills),
      ItemWithSkillsMapper.mapEquipmentDualwieldIncreasesPercent(visionCard.dmSkills),
      resistancesElementaires,
      new ResistancesAlterations(),
      TueursMapper.toDataBaseRepresentation(tueursPhysiques),
      TueursMapper.toDataBaseRepresentation(tueursMagiques),
      Array.isArray(visionCard.dmSkills) ? visionCard.dmSkills.map(skill => SkillMapper.toCompetence(skill)) : null
    );

    objet.resistancesElementaires = resistancesElementaires;
    objet.tueursPhysiques = tueursPhysiques;
    objet.tueursMagiques = tueursMagiques;
    return objet;
  }

  private static mapVisionCardStats(stats: VisionCardStats): Caracteristiques {
    return new Caracteristiques(stats.HP[1], stats.MP[1], stats.ATK[1], stats.DEF[1], stats.MAG[1], stats.SPR[1]);
  }
}
