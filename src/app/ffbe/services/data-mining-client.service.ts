import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

const dataMiningBaseURL = 'https://raw.githubusercontent.com/aEnigmatic/ffbe/master/';
const charactersFile = dataMiningBaseURL + 'units.json';
const lbFile = dataMiningBaseURL + 'limitbursts.json';
const skillsAbilityFile = dataMiningBaseURL + 'skills_ability.json';
const skillsMagicFile = dataMiningBaseURL + 'skills_magic.json';
const skillsPassiveFile = dataMiningBaseURL + 'skills_passive.json';
const enhancementsFile = dataMiningBaseURL + 'enhancements.json';
const latentSkillsFile = dataMiningBaseURL + 'unit_latent_skills.json';
const recipeFile = dataMiningBaseURL + 'recipes.json';
const consumableFile = dataMiningBaseURL + 'items.json';
const equipmentFile = dataMiningBaseURL + 'equipment.json';
const materiaFile = dataMiningBaseURL + 'materia.json';
const visionCardsFile = dataMiningBaseURL + 'vision_cards.json';
const fieldEffectsFile = dataMiningBaseURL + 'field_effects.json';
const dataMiningStringsBaseURL = 'https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/';
const skillsNamesFile = dataMiningStringsBaseURL + 'MST_ABILITY_NAME.json';
const skillsMagicNamesFile = dataMiningStringsBaseURL + 'MST_MAGIC_NAME.json';
const skillsDescriptionsFile = dataMiningStringsBaseURL + 'MST_ABILITY_SHORTDESCRIPTION.json';
const skillsMagicDescriptionsFile = dataMiningStringsBaseURL + 'MST_MAGIC_SHORTDESCRIPTION.json';
const lbNamesFile = dataMiningStringsBaseURL + 'MST_LIMITBURST_NAME.json';
const visionCardsNamesFile = dataMiningStringsBaseURL + 'MST_VISION_CARD_NAME.json';
const visionCardsDescriptionsFile = dataMiningStringsBaseURL + 'MST_VISION_CARD_EXPLAIN_SHORT.json';

@Injectable()
export class DataMiningClientService {

  constructor(private http: HttpClient) {
  }

  public getCharacters$(): Observable<Object> {
    return this.http.get(charactersFile);
  }

  public getLimitBursts$(): Observable<Object> {
    return this.http.get(lbFile);
  }

  public getLimitBurstsNames$(): Observable<Object> {
    return this.http.get(lbNamesFile);
  }

  public getSkillsAbility$(): Observable<Object> {
    return this.http.get(skillsAbilityFile).pipe(
      tap(abilities => {
        const propertyNames: string[] = Object.getOwnPropertyNames(abilities);
        propertyNames.forEach(propertyName => {
          abilities[propertyName]['type'] = 'ABILITY';
          abilities[propertyName]['active'] = true;
        });
      })
    );
  }

  public getSkillsMagic$(): Observable<Object> {
    return this.http.get(skillsMagicFile).pipe(
      tap(abilities => {
        const propertyNames: string[] = Object.getOwnPropertyNames(abilities);
        propertyNames.forEach(propertyName => {
          abilities[propertyName]['type'] = 'MAGIC';
          abilities[propertyName]['active'] = true;
        });
      })
    );
  }

  public getSkillsPassive$(): Observable<Object> {
    return this.http.get(skillsPassiveFile).pipe(
      tap(abilities => {
        const propertyNames: string[] = Object.getOwnPropertyNames(abilities);
        propertyNames.forEach(propertyName => {
          abilities[propertyName]['type'] = 'ABILITY';
          abilities[propertyName]['active'] = false;
        });
      })
    );
  }

  public getSkillsNames$(): Observable<Object> {
    return this.http.get(skillsNamesFile);
  }

  public getSkillsMagicNames$(): Observable<Object> {
    return this.http.get(skillsMagicNamesFile);
  }

  public getSkillsDescriptions$(): Observable<Object> {
    return this.http.get(skillsDescriptionsFile);
  }

  public getSkillsMagicDescriptions$(): Observable<Object> {
    return this.http.get(skillsMagicDescriptionsFile);
  }

  public getEnhancements$(): Observable<Object> {
    return this.http.get(enhancementsFile);
  }

  public getLatentSkills(): Observable<Object> {
    return this.http.get(latentSkillsFile);
  }

  public getItemRecipes$(): Observable<Object> {
    return this.http.get(recipeFile);
  }

  public getConsumables$(): Observable<Object> {
    return this.http.get(consumableFile);
  }

  public getEquipments$(): Observable<Object> {
    return this.http.get(equipmentFile);
  }

  public getMaterias$(): Observable<Object> {
    return this.http.get(materiaFile);
  }

  public getVisionCards$(): Observable<Object> {
    return this.http.get(visionCardsFile);
  }

  public getVisionCardsNames$(): Observable<Object> {
    return this.http.get(visionCardsNamesFile);
  }

  public getVisionCardsDescriptions$(): Observable<Object> {
    return this.http.get(visionCardsDescriptionsFile);
  }

  public getFieldEffects$(): Observable<Object> {
    return this.http.get(fieldEffectsFile);
  }
}
