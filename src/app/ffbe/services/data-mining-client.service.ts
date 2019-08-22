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
const recipeFile = dataMiningBaseURL + 'recipes.json';
const consumableFile = dataMiningBaseURL + 'items.json';
const equipmentFile = dataMiningBaseURL + 'equipment.json';
const materiaFile = dataMiningBaseURL + 'materia.json';
const dataMiningStringsBaseURL = 'https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/';
const skillsNamesFile = dataMiningStringsBaseURL + 'MST_ABILITY_NAME.json';
const skillsMagicNamesFile = dataMiningStringsBaseURL + 'MST_MAGIC_NAME.json';
const skillsDescriptionsFile = dataMiningStringsBaseURL + 'MST_ABILITY_SHORTDESCRIPTION.json';
const skillsMagicDescriptionsFile = dataMiningStringsBaseURL + 'MST_MAGIC_SHORTDESCRIPTION.json';

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
        propertyNames.forEach(propertyName => abilities[propertyName]['type'] = 'MAGIC');
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
}
