import {FFBE_ELEMENTS, FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';
import {HTML_LINE_RETURN, SkillEffectsMapper} from './effects/skill-effects.mapper';
import {EquipmentsService} from '../services/equipments.service';
import {Equipment} from '../model/items/equipment/equipment.model';
import {MateriasService} from '../services/materias.service';
import {Materia} from '../model/items/materia/materia.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {CharactersService} from '../services/characters.service';
import {Character} from '../model/character/character.model';
import {VisionCard} from '../model/items/vision-cards/vision-card.model';
import {VisionCardsService} from '../services/vision-cards.service';

export class SkillMapper {

  public static toCompetence(skill: Skill): Competence {
    SkillMapper.orderSkillEffectsRaw(skill);
    let parsedSkillEffects: string = SkillEffectsMapper.mapSkillEffects(skill);
    if (parsedSkillEffects.startsWith(HTML_LINE_RETURN)) {
      parsedSkillEffects = parsedSkillEffects.substring(6);
    }
    const parsedItemsRequirements: string = SkillMapper.mapRequirements(skill);
    if (parsedItemsRequirements.length) {
      parsedSkillEffects += HTML_LINE_RETURN + parsedItemsRequirements;
    }

    const parsedUnitRestrictions: string = SkillMapper.mapUnitRestrictions(skill);
    if (parsedUnitRestrictions.length) {
      parsedSkillEffects += HTML_LINE_RETURN + parsedUnitRestrictions;
    }

    const hitsFramesDamagesObject = SkillMapper.mapHitsFramesAndDamages(skill);

    return new Competence(
      skill.gumi_id,
      skill.gumiIdActivatedSkill,
      SkillMapper.determineCategorieCompetence(skill),
      skill.physique,
      skill.magique,
      skill.hybride,
      skill.fixe,
      skill.esper,
      SkillMapper.transformIcon(skill.icon),
      skill.names && skill.names[FFBE_FRENCH_TABLE_INDEX] ? skill.names[FFBE_FRENCH_TABLE_INDEX] : `WARN:${skill.name}`,
      skill.names && skill.names[FFBE_ENGLISH_TABLE_INDEX] ? skill.names[FFBE_ENGLISH_TABLE_INDEX] : `WARN:${skill.name}`,
      undefined,
      undefined,
      parsedSkillEffects && parsedSkillEffects.length ? parsedSkillEffects : 'Aucun effet',
      skill.effects.length > 0 ? skill.effects.join(HTML_LINE_RETURN) : null,
      parsedSkillEffects && parsedSkillEffects.length ? parsedSkillEffects : 'Aucun effet',
      skill.calculateSkillPower(),
      !skill.cost || skill.cost.MP === 0 ? null : skill.cost.MP,
      !skill.cost || skill.cost.LB === 0 ? null : skill.cost.LB,
      !skill.cost || skill.cost.EP === 0 ? null : skill.cost.EP,
      hitsFramesDamagesObject.hits,
      hitsFramesDamagesObject.frames,
      hitsFramesDamagesObject.damages,
      SkillMapper.mapElementInflict(skill),
      skill.hasParameterWarning()
    );
  }

  private static orderSkillEffectsRaw(skill: Skill) {
    skill.effects_raw?.sort((effect1, effect2) => SkillMapper.compareTwoSkillEffectsByIds(effect1[2], effect2[2]));
  }

  // effect 132 is for delayed skills but might appear in the data mining before another effect which is activated immediately
  // to avoid confusion, need to move the delayed skills at the end of the table
  // effect 1014 is for GLEX magnus skills, whose effect should be stated first
  private static compareTwoSkillEffectsByIds(skillEffectId1: number, skillEffectId2: number): number {
    let result = 0;
    if (skillEffectId1 === 132 && skillEffectId2 !== 132) {
      result = 1;
    } else if (skillEffectId1 !== 132 && skillEffectId2 === 132) {
      result = -1;
    } else if (skillEffectId1 === 1014 && skillEffectId2 !== 1014) {
      result = -1;
    } else if (skillEffectId1 !== 1014 && skillEffectId2 === 1014) {
      result = 1;
    }
    return result;
  }

  public static mapHitsFramesAndDamages(skill: Skill): { hits: number, frames: string, damages: string } {
    let attackCount: number = skill.attack_count && skill.attack_count.length > 0 && skill.attack_count[0] > 0 ?
      skill.attack_count[0] : null;
    let attackFrames: string = skill.attack_frames && skill.attack_frames.length > 0 ? skill.attack_frames[0].join(' ') : null;
    let attackDamages: string = skill.attack_damage && skill.attack_damage.length > 0 ? skill.attack_damage[0].join(' ') : null;
    let frames = [];
    let damages = [];

    let lastDamageEffectWithFramesIndex: number;
    const effectsWithFrames = [];
    let isEffectWithDamages = false;
    skill.effects_raw.forEach((effect, index) => {
      if (skill.isEffectWithDamage(effect)) {
        isEffectWithDamages = true;
        if (effect[2] !== 52 && effect[2] !== 134 && effect[2] !== 139) {
          lastDamageEffectWithFramesIndex = index;
          effectsWithFrames.push(effect);
        }
      }
    });

    if (lastDamageEffectWithFramesIndex > 0 && skill.attack_frames && skill.attack_frames.length > lastDamageEffectWithFramesIndex) {
      skill.effects_raw.forEach((effect, index) => {
        if (skill.isEffectWithDamage(effect) && effect[2] !== 52 && effect[2] !== 134 && effect[2] !== 139) {
          frames = frames.concat(skill.attack_frames[index]);
          damages = damages.concat(skill.attack_damage[index]);
        }
      });
    } else {
      effectsWithFrames.forEach((value, index) => {
        if (Array.isArray(skill.attack_frames) && skill.attack_frames.length > index) {
          frames = frames.concat(skill.attack_frames[index]);
          damages = damages.concat(skill.attack_damage[index]);
        }
      });
    }
    frames.sort((a, b) => a - b);
    if (frames.length === 0 && isEffectWithDamages) {
      frames.push(0);
      damages.push(100);
    }

    if (frames.length > 0) {
      attackCount = frames.length;
      attackFrames = frames.join(' ');
      if (effectsWithFrames.length > 1) {
        attackDamages = frames.map(frame => 0).join(' ');
      } else {
        attackDamages = damages.join(' ');
      }
    }

    return {hits: attackCount, frames: attackFrames, damages: attackDamages};
  }

  public static mapUndefinedEnhanced(competence: Competence) {
    if (competence && FfbeUtils.isNullOrUndefined(competence.enhanced)) {
      competence.enhanced = false;
    }
  }

  private static transformIcon(icon: string): number {
    if (icon) {
      const underscoreSplitted = icon.split('_');
      if (Array.isArray(underscoreSplitted) && underscoreSplitted.length >= 2) {
        const pointSplitted = underscoreSplitted[underscoreSplitted.length - 1].split('.');
        if (Array.isArray(pointSplitted) && pointSplitted.length === 2) {
          return +(pointSplitted[0]);
        }
      }
    }
    return null;
  }

  private static determineCategorieCompetence(skill: Skill) {
    if (skill.type === 'MAGIC') {
      if (skill.magic_type === 'White') {
        return 1;
      }
      if (skill.magic_type === 'Black') {
        return 2;
      }
      if (skill.magic_type === 'Green') {
        return 3;
      }
      if (skill.magic_type === 'Blue') {
        return 10;
      }
    }
    if (skill.type === 'ABILITY') {
      if (!skill.active) {
        return 4;
      }
      if (skill.containsEffectWithDamages()) {
        if (skill.attack_type === 'Physical') {
          return 6;
        }
        if (skill.attack_type === 'Magic') {
          return 7;
        }
        if (skill.attack_type === 'Hybrid') {
          return 8;
        }
        if (skill.attack_type === 'None') {
          return 9;
        }
      }
      return 5;
    }
    return undefined;
  }

  private static mapRequirements(skill: Skill): string {
    let requirementsText = '';
    if (skill.requirements && skill.requirements.length) {
      requirementsText += 'Activé si l\'unité porte ';
      requirementsText += skill.requirements
        .map((requirement: Array<string>) => {
          const reqType: string = requirement[0];
          const reqId: number = +requirement[1];

          if (reqType === 'EQUIP') {
            const equipment: Equipment = EquipmentsService.getInstance().searchForEquipmentByGumiId(reqId);
            if (equipment?.strings?.name && equipment.strings.name[FFBE_FRENCH_TABLE_INDEX]) {
              return `<a href="ffexvius_objects.php?gumiid=${equipment.gumi_id}">${equipment.strings.name[FFBE_FRENCH_TABLE_INDEX]}</a>`;
            }

            const materia: Materia = MateriasService.getInstance().searchForMateriaByGumiId(reqId);
            if (materia?.strings?.names && materia.strings.names[FFBE_FRENCH_TABLE_INDEX]) {
              return `<a href="ffexvius_objects.php?gumiid=${materia.gumi_id}">${materia.strings.names[FFBE_FRENCH_TABLE_INDEX]}</a>`;
            }

            const vc: VisionCard = VisionCardsService.getInstance().searchForVisionCardByGumiId(reqId);
            if (vc?.names && vc.names[FFBE_FRENCH_TABLE_INDEX]) {
              return `<a href="ffexvius_objects.php?gumiid=${vc.gumi_id}">${vc.names[FFBE_FRENCH_TABLE_INDEX]}</a>`;
            }

            return 'UNKNOWN equipment';
          }
          return 'UNKNOWN requirement';
        }).join(' ou ');
    }
    return requirementsText;
  }

  private static mapUnitRestrictions(skill: Skill): string {
    let restrictionsText = '';
    if (skill.unit_restriction?.length > 0) {
      skill.unit_restriction.forEach(unitId => {
        const unit: Character = CharactersService.getInstance().searchForCharacterByGumiId(unitId);
        if (unit) {
          if (restrictionsText) {
            restrictionsText += ', ';
          } else {
            restrictionsText += 'Exclusif à ';
          }
          restrictionsText += `<a href="ffexvius_units.php?gumiid=${unit.gumi_id}">${unit.names[FFBE_FRENCH_TABLE_INDEX]}</a>`;
        }
      });
    }
    return restrictionsText;
  }

  private static getElementIdFromEnglishName(elementEnglishString: string): number {
    return FFBE_ELEMENTS.find(e => e.name === elementEnglishString).id;
  }

  private static mapElementInflict(skill: Skill): string {
    if (skill.element_inflict && skill.element_inflict.length) {
      return skill.element_inflict.map((element: string) => this.getElementIdFromEnglishName(element)).join(',');
    }
    return '0';
  }
}
